import { getRequest } from "../../api/fourRequest.js";

const state = {
  route: []
};

const getters = {}; //有属性计算的时候使用

// 同步的 没有办法做回调处理
const mutations = {
  INIT_ROUTE(state, data) {
    state.route = data;
  },
  CLEAN_ROUTE(state) {
    state.route = [];
  }
};

//可以做回调处理 可以同步 也可以异步
const actions = {
  //获取用户路由树方法
  getMenus(content, requestData) {
    return new Promise((resolve, reject) => {
      getRequest(requestData)
        .then(Response => {
          //   let data = Response.data;
          resolve(Response);
        })
        .catch(error => {
          reject(error);
        });
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
