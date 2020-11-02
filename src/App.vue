<template>
  <div id="app">
    <container />
  </div>
</template>

<script>
import container from "./components/common/layout/Container";

export default {
  name: "app",
  components: {
    container,
  },
  mounted() {
    // 监听窗口的重新加载
    window.addEventListener("unload", this.saveState);
  },
  methods: {
    /* 将store中的数据保存到sessionstorage中 */
    saveState() {
      sessionStorage.setItem("state", JSON.stringify(this.$store.state));
    },
  },
};
</script>

<style>
/* 引入全局css文件 */
@import "assets/css/global.css";
/* 引入字体文件 */
@import "assets/font/iconfont.css";

</style>
