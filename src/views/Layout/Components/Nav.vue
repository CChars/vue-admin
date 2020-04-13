<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="../../../assets/logo.jpg" /></h1>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <!-- 一级菜单 -->
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>

          <!-- 二级菜单 -->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
            >{{ subItem.name }}</el-menu-item
          >
          <!-- <el-menu-item index="1-2">选项2</el-menu-item> -->
        </el-submenu>
      </template>
    </el-menu>
    <!-- <svg-icon iconClass="console" className="console" /> -->
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    /**
     * data数据
     */
    // const routers = reactive(root.$router.options.routes);
    const routers = computed(() => root.$store.state.route.route);
    // const isCollapse = ref(true);
    // console.log(2222222222222222);
    // console.log(routers);
    /**
     * computed: {},监听
     */
    const isCollapse = computed(() => {
      return root.$store.state.app.isCollapse;
    });
    /**
     * 函数
     */
    // console.log(root.$store.state.isCollapse);
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    // console.log(root.$router.options.routes);

    return {
      routers,
      handleOpen,
      handleClose,
      isCollapse
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: $navMenuMin;
  }
  .logo {
    img {
      width: 70%;
      margin: auto;
      margin-top: 30px;
      margin-bottom: 30px;
    }
  }
}
#nav-wrap {
  border-radius: 4px;
  position: fixed;
  // width: $navMenu;
  @include webkit(transition, all 0.3s ease 0s);
  // -webkit-transition: all 0.3s ease 0s;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #344a5f;
  // background-color: #ffffff;
}
.el-menu-vertical-demo {
  @include webkit(transition, all 0.3s ease 0s);
}
.logo {
  img {
    width: 92px;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 30px;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
</style>
