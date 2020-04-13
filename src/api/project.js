import service from "../utils/request.js";
// import qs from "querystring";
/**
 * 用户获取project接口
 */
export function GetProject() {
  return service.request({
    method: "get",
    url: "/info/project/getProjectByUserId"
    // data: data //左边data为后台接受的 变量名（key），右边data是参数（value） 两者同名可一些一个
  });
}

/**
 * 管理员获取project接口
 */
export function GetAllProject() {
  return service.request({
    method: "get",
    url: "/info/project/admin/getAllProject"
    // data: data //左边data为后台接受的 变量名（key），右边data是参数（value） 两者同名可一些一个
  });
}
/**
 * 获取build接口
 */
export function GetBuild(data) {
  return service.request({
    method: "get",
    url: "/info/project/build/?projectId=" + data
    // url: "/info/project/build/",
    // data: qs.stringify(data)
    // data: data //左边data为后台接受的 变量名（key），右边data是参数（value） 两者同名可一些一个
  });
}

/**
 * 新增project接口
 */
export function PostProject(data) {
  return service.request({
    method: "post",
    url: "/info/project/",
    data
    // data: data //左边data为后台接受的 变量名（key），右边data是参数（value） 两者同名可一些一个
  });
}
/**
 * 新增build接口
 */
export function PostBuild(data) {
  return service.request({
    method: "post",
    url: "",
    data
    // data: data //左边data为后台接受的 变量名（key），右边data是参数（value） 两者同名可一些一个
  });
}
