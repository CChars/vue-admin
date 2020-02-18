<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content"><router-view /></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
.open {
  .main-content {
    padding-left: $navMenu + 30;
  }
}
.close {
  .main-content {
    padding-left: $navMenuMin + 30;
  }
}
#main-wrap {
  border-radius: 4px;
  // position: fixed;
  // // width: 100wh;
  // top: 75px;
  // left: $navMenu;
  // right: 0;
  height: 100vh;
  // // padding: 75px 0 0 250px;
  // bottom: 0;
  // // border: 30px solid #f7f7f7;
  // border: 30px solid #1daf35;
  // border-bottom: none;
  // -webkit-box-sizing: border;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30;
  padding-left: $navMenu + 30;
  padding-right: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  @include webkit(transition, all 0.3s ease 0s);
}
.content {
  width: 100%;
  height: 100%;
  padding-top: 30px;
  padding-left: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
}
</style>
