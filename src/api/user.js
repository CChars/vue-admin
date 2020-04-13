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
export function putSetWorkerRequest(projectId, workerId) {
  return service.request({
    method: "put",
    url:
      "/info/project/admin/setWorker/?projectId=" +
      projectId +
      "&workerId=" +
      workerId
  });
}

/**
 * get (获取全部的worker检测人员)
 */
export function getWorkerRequest() {
  return service.request({
    method: "get",
    url: "/info/project/admin/getAllWorker"
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
