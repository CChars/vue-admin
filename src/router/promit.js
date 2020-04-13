import router from "./index";
import { initMenu } from "../utils/menus.js";
import store from "../store";
// import store from "../store/index.js";
// import { getToken, removeToken, removeUsername } from "../utils/app";

// const whiteRouter = ["/login"]; //白名单
//路由守卫
router.beforeEach((to, from, next) => {
  // if (getToken()) {
  //   if (to.path === "/login") {
  //     removeToken();
  //     removeUsername();
  //     store.commit("app/SET_TOKEN", "");
  //     store.commit("app/SET_USERNAME", "");
  //     next();
  //   } else {
  //     next();
  //   }
  //   console.log("存在");
  // } else {
  //   if (whiteRouter.indexOf(to.path) !== -1) {
  //     next();
  //   } else {
  //     next("/login");
  //   }
  //   console.log("不存在");
  // }
  // console.log(to.path); // 要进入的页面
  // console.log(from); // 离开之前的页面
  // console.log(next); //
  // next(); // to
  //token
  if (to.path === "/login") {
    next();
  } else {
    if (window.sessionStorage.getItem("user")) {
      initMenu(router, store);
      next();
    } else {
      next("/login");
    }
  }
});
