<template>
  <div id="header-wrap">
    <div class="el-icon-menu pull-left header-icon" @click="navMenuState"></div>
    <div class="pull-right header-icon">
      <div class="user-info pull-left">{{ username }}</div>
      <div
        class="el-icon-switch-button header-icon pull-left"
        @click="exit"
      ></div>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/composition-api";
export default {
  name: "layoutHeader",
  setup(props, { root }) {
    const navMenuState = () => {
      root.$store.commit("app/SET_COLLAPSE");
    };

    const username = computed(() => root.$store.state.app.username);
    //退出
    const exit = () => {
      root.$store.dispatch("app/exit").then(() => {
        //退出成功后返回登录页面
        //页面跳转
        root.$store.commit("route/CLEAN_ROUTE");
        root.$router.push({ name: "login" });
        root.$message({
          showClose: true,
          message: "退出成功",
          type: "success"
        });
        console.log(root.$store.state.route.route);
      });
    };
    return {
      navMenuState,
      username,
      exit
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
#header-wrap {
  border-radius: 4px;
  position: fixed;
  width: 100wh;
  top: 0;
  left: $navMenu;
  right: 0;
  height: $layoutHeader;
  @include webkit(transition, all 0.3s ease 0s);
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  // -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  line-height: 75px;
}
.header-icon {
  padding: 0 20px;
}
.el-icon-menu {
  font-size: 25px;
  cursor: pointer;
}
.el-icon-switch-button {
  font-size: 20px;
  cursor: pointer;
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
}
</style>
