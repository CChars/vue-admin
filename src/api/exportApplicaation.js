import service from "../utils/request.js";

/**
 * post 申请打印请求
 */
export function postApplyRequest(data) {
  return service.request({
    method: "post",
    url: "/info/project/apply",
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
 * get 得到打印申请的具体信息
 */
export function getApplyRequest(projectId) {
  return service.request({
    method: "get",
    url: "/info/project/getApplyInfo/?projectId=" + projectId
  });
}

/**
 * get 得到所有打印申请的具体信息
 */
export function getAllApplyRequest() {
  return service.request({
    method: "get",
    url: "/info/project/getAllApplyInfo"
  });
}
/**
 * put 更新打印请求
 */
export function updateApplyRequest(printAuthorizationId) {
  return service.request({
    method: "put",
    url: "/info/apply/review/?printAuthorizationId=" + printAuthorizationId
  });
}
/**
 * put 拒绝打印请求
 */
export function refuseApplyRequest(printAuthorizationId) {
  return service.request({
    method: "put",
    url: "/info/apply/refuse/?printAuthorizationId=" + printAuthorizationId
  });
}
