<template>
  <div id="layout" :class="[menuStatus ? 'close' : 'open']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>
<script>
import LayoutHeader from "./Components/Header.vue";
import LayoutMain from "./Components/Main.vue";
import LayoutNav from "./Components/Nav.vue";
import { computed } from "@vue/composition-api";

export default {
  name: "layout",
  components: { LayoutHeader, LayoutMain, LayoutNav },
  setup(props, { root }) {
    const menuStatus = computed(() => root.$store.state.app.isCollapse);
    return {
      menuStatus
    };
  }
};
</script>
<style lang="scss" scoped>
// #layout {
//   background-color: blue;
// }
</style>
