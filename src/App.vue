<template>
  <div id="app">
    <container/>
  </div>
</template>

<script>
import container from "./components/common/layout/Container";

export default {
  name: "app",
  components: {
    container,
  },
};
</script>

<style>
/* 引入全局css文件 */
@import "assets/css/global.css";
/* 引入字体文件 */
@import "assets/font/iconfont.css";


</style>
