import { stringify } from "qs";
import fetch from "isomorphic-fetch";
import { handleRequestError } from "./interceptor";

type allowedMethod = "GET" | "PUT" | "DELETE" | "POST";
type DefaultResult =
  | string
  | number
  | boolean
  | []
  | Record<string | number, unknown>;

export interface ResponseData<T = DefaultResult> {
  message: string | null;
  result: T;
  status: string;
  success?: boolean;
}
interface QueryOpts extends RequestInit {
  params?: Record<string, unknown>;
  headers?: HeadersInit;
  fetchOpts?: Record<string, unknown>;
  interceptor?: Interceptor;
  needJSON?: boolean;
}

interface Interceptor {
  request?: (opts: QueryOpts) => QueryOpts;
  response?: (result: ResponseData, opts?: QueryOpts) => ResponseData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responseError?: (result?: Record<string, unknown>, opts?: QueryOpts) => any;
  responseAfter?: (result: ResponseData, opts: QueryOpts) => ResponseData;
}

interface CProps {
  domain?: string;
  pathPrefix?: string;
  headers?: Record<string, unknown>;
  fetchOpts?: Record<string, unknown>;
  interceptor?: Interceptor;
}

class BaseAPIRequest {
  public domain: string;
  public pathPrefix: string;
  public headers: HeadersInit;
  public fetchOpts: Record<string, unknown>;
  public interceptor: Interceptor;
  /**
   *
   * @param domain 域名，如： https://baidu.com
   * @param pathPrefix API 路径前缀，如 /api/v2
   * @param headers http request header
   * @param fetchOpts fetch 的除 Headers 之外的参数
   * @param interceptor 请求拦截器，可以用于请求之前或之后的数据处理，包含以下参数：
   *   - request 请求之前执行，返回 fetchOpts
   *   - response 请求结果返回之后执行，返回处理过 data 后的 promise。注：如果在具体请求里也设置了 response，
   *     那么会替换这里的 response
   *   - responseAfter response 执行后执行。注：不会替换 response 方法，但是如果在具体请求里设置了 responseAfter，
   *     那么会替换这里的 responseAfter
   */

  public constructor({
    domain = window.location.origin,
    pathPrefix = "/",
    headers = {},
    fetchOpts = {},
    interceptor = {},
  }: CProps) {
    this.domain = domain;
    this.pathPrefix = pathPrefix;
    this.headers = {
      "Content-Type": "application/json; charset=utf-8",
      ...headers,
    };
    this.fetchOpts = fetchOpts;
    this.interceptor = interceptor;
  }

  public get<T>(endpoint: string, opts = {}): Promise<ResponseData<T>> {
    return this.request("GET", endpoint, opts);
  }

  public post<T>(endpoint: string, opts = {}): Promise<ResponseData<T>> {
    return this.request("POST", endpoint, opts);
  }

  public put<T>(endpoint: string, opts = {}): Promise<ResponseData<T>> {
    return this.request("PUT", endpoint, opts);
  }

  public delete<T>(endpoint: string, opts = {}): Promise<ResponseData<T>> {
    return this.request("DELETE", endpoint, opts);
  }

  /**
   *
   * @param method http method
   * @param endpoint API 功能路径，如：/api/v2/customers/1 里的 customers/1
   * @param params url 上的参数
   * @param body fetch body 参数
   * @param headers http request headers
   * @param fetchOpts 除 headers 之外的 fetch 参数
   * @param interceptor  用法参考 constructor
   */
  private async request(
    method: allowedMethod,
    endpoint: string,
    {
      params,
      body,
      headers = {},
      fetchOpts = {},
      interceptor = {},
      needJSON = true,
    }: QueryOpts
  ) {
    const reqInterceptor = interceptor.request || this.interceptor.request;
    const respInterceptor = interceptor.response || this.interceptor.response;
    const respAfterInterceptor =
      interceptor.responseAfter || this.interceptor.responseAfter;
    const respErrorInterceptor =
      interceptor.responseError || this.interceptor.responseError;

    let opts: QueryOpts = {
      headers: { ...this.headers, ...headers },
      fetchOpts: { ...this.fetchOpts, ...fetchOpts },
    };

    if (params) {
      opts.params = params;
    }

    if (method !== "GET" && body) {
      opts.body = body;
    }

    // 请求前的参数拦截
    if (reqInterceptor) {
      opts = reqInterceptor(opts);
    }

    const url: string = this.fullUrl(endpoint, opts.params);
    const fetchInit: RequestInit = {
      method,
      headers: opts.headers,
      ...opts.fetchOpts,
    };
    if (opts.body) {
      fetchInit.body =
        typeof opts.body !== "string" && needJSON
          ? JSON.stringify(opts.body)
          : opts.body;
    }

    return fetch(url, fetchInit).then((response) => {
      const reqOpts = { url, ...fetchInit };

      if (!response.ok) {
        let result = {
          success: false,
          err: response.status,
          message: response.statusText,
        };
        if (respErrorInterceptor) {
          result = respErrorInterceptor(result, reqOpts);
        }
        return result;
      }
      return response.json().then((json) => {
        let result = json;

        if (respInterceptor) {
          result = respInterceptor(result, reqOpts);
        }

        if (respAfterInterceptor) {
          result = respAfterInterceptor(result, reqOpts);
        }

        return result;
      });
    });
  }

  private fullUrl(endpoint: string, params?: Record<string, unknown>): string {
    let pathname: string;
    let url: string;
    let queryString = "";

    if (params) {
      const innerParams = { ...params };
      pathname =
        endpoint.indexOf(":") > -1
          ? this.fillPath(endpoint, innerParams)
          : endpoint;
      if (Object.keys(innerParams).length) {
        queryString = stringify(innerParams, { arrayFormat: "brackets" });
      }
    } else {
      pathname = endpoint;
    }

    if (pathname[0] === "/") {
      url = `${this.domain}${pathname}`;
    } else {
      url = `${this.domain}${this.pathPrefix}/${pathname}`;
    }

    if (queryString) {
      url += `?${queryString}`;
    }

    return url;
  }

  private fillPath(pathname: string, params: Record<string, unknown>) {
    return pathname
      .split("/")
      .map((str) => {
        if (str[0] === ":") {
          const str1 = str.substr(1);
          const fill = params[str1];
          delete params[str1];
          return fill;
        }

        return str;
      })
      .join("/");
  }
}

const pathPrefix = "/api";

export default class ApiRequest extends BaseAPIRequest {
  public constructor() {
    super({
      pathPrefix,
      fetchOpts: {
        credentials: "include",
      },
      interceptor: {
        response(data) {
          if (data.status === "success") {
            handleRequestError(data);
          }

          return {
            success: data.status === "success",
            ...data,
          };
        },
      },
    });
  }
}
