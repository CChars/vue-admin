import Vue from "vue";
//自定义全局组件
import svgIcon from "./svgIcon.vue";
Vue.component("svg-icon", svgIcon);

/**
 * require.context读取指定目录的所有文件   ，第一个 参数 读取的目录，第二个 是否遍历子级目录，第三个是定义遍历文件规则
 *
 */
const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => {
  // console.log("requireContext:" + requireContext.keys());
  return requireContext.keys().map(requireContext);
};
requireAll(req);
