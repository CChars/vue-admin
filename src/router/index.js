import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//引入布局组件
import Layout from "../views/Layout/index.vue";
// import { Icon } from "element-ui";

const routes = [
  {
    path: "/",
    //重定向
    redirect: "login",
    hidden: true,
    // name: "home",
    // component: Home
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "login",
    hidden: true,
    meta: {
      name: "登录"
    },
    component: () => import("../views/login/index.vue")
  },
  /**
   * 控制台路由
   */
  {
    path: "/console",
    name: "console",
    redirect: "index",
    meta: {
      name: "控制台",
      icon: "el-icon-odometer"
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "index",
        meta: {
          name: "首页"
        },
        component: () => import("../views/console/index.vue")
      }
    ]
  },
  /**
   * 信息管理路由
   */
  {
    path: "/info",
    name: "info",
    // redirect: "infoindex",
    meta: {
      name: "信息管理",
      icon: "el-icon-document"
    },
    component: Layout,
    children: [
      {
        path: "/infoindex",
        name: "infoindex",
        meta: {
          name: "信息列表"
        },
        component: () => import("../views/Info/index.vue")
      },
      {
        path: "/infoCategory",
        name: "infoCategory",
        meta: {
          name: "信息分类"
        },
        component: () => import("../views/Info/infoCategory.vue")
      }
    ]
  },
  /**
   * 用户管理路由
   */
  {
    path: "/user",
    name: "user",
    // redirect: "userindex",
    meta: {
      name: "用户管理",
      icon: "el-icon-s-custom"
    },
    component: Layout,
    children: [
      {
        path: "/userindex",
        name: "userindex",
        meta: {
          name: "用户列表"
        },
        component: () => import("../views/User/index.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
