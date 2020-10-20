<template>
  <div class="box">
    <!-- 布局容器 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <!-- 导航栏 -->
        <navbar></navbar>
      </el-header>
      <!-- 内容区域 -->
      <el-main>
        <router-view />
      </el-main>
      <!-- 底部区域 -->
      <el-footer height="300">
        <!-- footer -->
        <footerCpn></footerCpn>
      </el-footer>
    </el-container>
    <!-- 回到顶部 -->
    <el-backtop :bottom="100" :right="50">
      <div class="backtop">
        <i class="iconfont icon-icon-test" style="font-size: 38px"></i>
      </div>
    </el-backtop>
  </div>
</template>

<script>
import navbar from "../navbar/NavBar";
import footerCpn from "../footer/Footer";

export default {
  components: {
    navbar,
    footerCpn,
  },
};
</script>

<style scoped>
.el-header {
  /* 固定导航栏 */
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;

  background-color: #696c6e;
  margin-bottom: 15px;
}

.el-main {
  min-height: 800px;
  margin-top: 64px;
}

.el-footer {
  margin-top: 20px;
  background-color: #696c6e;
}

.backtop {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
}
</style>