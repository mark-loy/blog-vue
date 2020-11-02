<template>
  <div class="box">
    <!-- 后台登录页显示 -->
    <div v-if="isShowBackLogin">
      <admin-login></admin-login>
    </div>

    <!-- 后台管理页显示 -->
    <div v-if="isShowBackAdmin">
      <router-view />
    </div>

    <!-- 前端布局容器 -->
    <div v-if="!isShowBackLogin && !isShowBackAdmin">
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
    </div>

    <!-- 回到顶部 -->
    <el-backtop :bottom="100" :right="10">
      <div class="backtop">
        <i class="iconfont icon-icon-test" style="font-size: 38px"></i>
      </div>
    </el-backtop>
  </div>
</template>

<script>
// 前台展示页面导航、footer组件
import navbar from "../navbar/NavBar";
import footerCpn from "../footer/Footer";


// 后台组件
import adminLogin from "views/back/login/BackLogin";
export default {
  components: {
    navbar,
    footerCpn,
    adminLogin,
  },
  data() {
    return {
      /* 控制后台登录页是否显示 */
      isShowBackLogin: false,
      /* 控制后台管理页是否显示 */
      isShowBackAdmin: false,
    };
  },
  beforeCreate() {
    /* 监听路由切换 */
    this.$bus.$on("tabRouter", (name) => {
      if (name === "adminLogin") {
        this.isShowBackLogin = true;
        this.isShowBackAdmin = false;
      }
      if (name !== undefined && name !== null) {
        if (name.indexOf("back") !== -1) {
          this.isShowBackAdmin = true;
          this.isShowBackLogin = false;
        }
      }
    });
  },
};
</script>

<style scoped>
.el-header {
  /* 固定导航栏 */
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2000;

  background-color: #696c6e;
  margin-bottom: 15px;
}

.el-main {
  padding: 10px 0;
  min-height: 900px;
  margin-top: 64px;
}

.el-footer {
  margin-top: 20px;
  background-color: #696c6e;
}

.el-backtop {
  z-index: 2000;
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