import axios from "axios";
import { Message } from "element-ui";

//创建axios  赋给变量service
// 地址http://www.web-jshtml.cn/productApi
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devapi";

const service = axios.create({
  baseURL: BASEURL,
  timeout: 10000
});

// console.log(process.env.NODE_ENV);
// console.log(process.env.VUE_APP_ABC);
// 添加请求拦截器
/**
 * 请求接口之前做的事
 */
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    //后台需要前端这边传递相关参数
    //如 tokey
    //config.headers["tokey"] = "1233333"
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
/**
 * 请求接口之后，对返回的数据进行拦截
 */
service.interceptors.response.use(
  function(response) {
    console.log(response);
    // 对响应数据做点什么
    let data = response.data;

    if (data.resCode !== 0) {
      Message.error(data.message);
      return Promise.reject(data);
    } else {
      return response;
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// service.request({
//   method: "post",
//   url: "/user/12345",
//   data: {
//     firstName: "Fred",
//     lastName: "Flintstone"
//   }
// });

export default service;

//使用export default时，文件 import 不用 { }
//但是不能使用多个  export default
