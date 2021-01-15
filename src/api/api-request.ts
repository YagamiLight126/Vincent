import BaseAPIRequest from "../utils/api-request";
import { handleRequestError } from "./interceptor";

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
