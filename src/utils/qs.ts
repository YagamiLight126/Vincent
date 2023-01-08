function getParameterByName(name: string, byHash = false) {
  const nameA = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + nameA + "=([^&#]*)");
  const results = regex.exec(location[byHash ? "hash" : "search"]);
  return results === null ? "" : decodeURIComponent(results[1]);
}

/**
 * @desc 将查询参数转化成字典
 */
function queryStringToMap() {
  const queryStringMap = new Map();
  window.location.search.replace(/[?&]+([^=&]+)=([^&#]*)/gi, (m, key, value) => {
    queryStringMap.set(key, value);
    return m;
  });

  return queryStringMap;
}

/**
 * @description 将Map转换为查询字符串
 */
function getSearchString(queryMap: Map<unknown, unknown>) {
  let searchString = "";
  queryMap.forEach((value, key) => {
    searchString = searchString ? `${searchString}&${key}=${value}` : `${key}=${value}`;
  });
  return searchString;
}

export { getParameterByName, queryStringToMap, getSearchString };
