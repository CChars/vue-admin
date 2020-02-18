import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./icons";
import "./router/promit.js";
//自定义全局组件
Vue.use(ElementUI);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

//路由守卫
// router.beforeEach((to, from, next) => {
//   // console.log(to); // 要进入的页面
//   // console.log(from); // 离开之前的页面
//   // console.log(next); //
//   next(); // to
//   //token
// });

//runtime模式 （运行时）
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
