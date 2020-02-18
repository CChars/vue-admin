<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:herf="iconName"></use>
  </svg>
</template>
<script>
import { ref, computed } from "@vue/composition-api";
export default {
  name: "svgIcon",
  // props: ["iconClass", "className"],
  props: {
    iconClass: {
      type: String,
      default: ""
    },
    className: {
      type: String,
      default: ""
    }
  },

  setup(props) {
    const msg = ref("hdhifdsfdf");
    /**
     * computed: {}, 监听属性变化，并计算属性
     */
    const iconName = computed(() => {
      return "#icon-" + props.iconClass;
    });
    const svgClass = computed(() => {
      if (props.className) {
        return "svg-icon " + props.className;
      } else {
        return "svg-icon";
      }
    });
    return {
      msg,
      iconName,
      svgClass
    };
  }
};
</script>
<style lang="scss" scoped>
// .svg-icon {
//   width: 1em;
//   height: 1em;
// }
</style>
