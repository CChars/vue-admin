import { Login } from "../../api/login.js";
import {
  setToken,
  removeToken,
  setUsername,
  getUsername,
  removeUsername
} from "../../utils/app";
// import Vue from "vue";
// import Vuex from "vuex";
// import Cookie from "cookie_js";

// Vue.use(Vuex);

const state = {
  // isCollapse: false
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  to_ken: "",
  username: getUsername() || ""
};

const getters = {}; //有属性计算的时候使用

// 同步的 没有办法做回调处理
const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;

    //html5本地存储 存储比较简单的东西 小的交互
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));

    //浏览器存储（密码等）
    // localStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));

    //使用COOKIE 程序在请求头里面存东西，业务要求
    // Cookie.set("isCollapse", JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state, value) {
    state.to_ken = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  }
};
//可以做回调处理 可以同步 也可以异步
const actions = {
  //登录方法
  login(content, requestData) {
    return new Promise((resolve, reject) => {
      Login(requestData)
        .then(Response => {
          let data = Response.data.data;
          //在 vuex 中存储 token 和username
          //普通方式  也可以用结构方式
          content.commit("SET_TOKEN", data.token);
          content.commit("SET_USERNAME", data.username);
          setToken(data.token);
          setUsername(data.username);
          resolve(Response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  //退出方法  ({commit})为结构写法
  exit({ commit }) {
    return new Promise(resolve => {
      removeToken();
      removeUsername();
      commit("SET_TOKEN", "");
      commit("SET_USERNAME", "");
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
