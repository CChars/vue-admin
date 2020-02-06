import service from "@/utils/request.js";
/**
 * 获取验证码接口
 */
export function GetSms(data) {
  return service.request({
    method: "post",
    url: "/getSms/",
    data
    // data: data //左边data为后台接受的 变量名（key），右边data是参数（value） 两者同名可一些一个
  });
}
/**
 * 获取用户角色
 */
/**
 * 登录接口
 */
export function Login(data) {
  return service.request({
    method: "post",
    url: "/login/",
    data
  });
}
/**
 * 注册
 */
export function Register(data) {
  return service.request({
    method: "post",
    url: "/register/",
    data
  });
}
