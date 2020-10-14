<template>
  <div>
    <!-- 布局容器 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <!-- 导航栏 -->
        <navbar></navbar>
      </el-header>
      <!-- 内容区域 -->
      <el-main>
        <router-view/>
      </el-main>
      <!-- 底部区域 -->
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import navbar from "../navbar/NavBar";

export default {
  components: {
    navbar,
  },
};
</script>

<style scoped>
  .el-header {
    background-color: #696c6e;
    margin-bottom: 15px;
  }

</style>