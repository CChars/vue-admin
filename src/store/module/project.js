const state = {
  project: "",
  allProject: ""
};

const getters = {}; //有属性计算的时候使用

// 同步的 没有办法做回调处理
const mutations = {
  SET_PROJECT(state, data) {
    state.project = data;
  },
  CLEAN_PROJECT(state) {
    state.project = "";
  },
  SET_ALL_PROJECT(state, data) {
    state.allProject = data;
  },
  CLEAN_ALL_PROJECT(state) {
    state.allProject = "";
  }
};

//可以做回调处理 可以同步 也可以异步
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
