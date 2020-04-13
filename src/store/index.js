import Vue from "vue";
import Vuex from "vuex";
// import Cookie from "cookie_js";
Vue.use(Vuex);

import app from "./module/app.js";
import login from "./module/login.js";
import route from "./module/route.js";

export default new Vuex.Store({
  modules: {
    app,
    login,
    route
  }
});
