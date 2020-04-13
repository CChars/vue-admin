import service from "../utils/request.js";

/**
 * post
 */
export function postRequest(data, url) {
  return service.request({
    method: "post",
    url: url,
    data
  });
}

/**
 * put
 */
export function putRequest(data) {
  return service.request({
    method: "put",
    url: "",
    data
  });
}

/**
 * get
 */
export function getRequest(url) {
  return service.request({
    method: "get",
    url: url
  });
}
/**
 * delete
 */
export function deleteRequest(data) {
  return service.request({
    method: "delete",
    url: "/register/",
    data
  });
}
