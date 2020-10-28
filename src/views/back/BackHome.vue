<template>
  <div>
    <!-- 后台布局容器 -->
    <el-container>
      <!-- 头部 -->
      <el-header >
        <el-row type="flex" justify="space-around" align="middle">
          <el-col >
            <h2 class="title">博客后台管理</h2>
          </el-col>
          <el-col>
            <el-button @click="backLogout" size="mini" type="primary" class="logout">退出</el-button>
          </el-col>
        </el-row>
      </el-header>
      <!-- 主体 -->
      <el-container class="bd-container">
        <!-- 侧边栏 -->
        <el-aside :width="asideWidth + 'px'">
          <aside-cpn @asideCollapse="changeAsideWidth"></aside-cpn>
        </el-aside>
        <!-- 主要内容显示区 -->
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import asideCpn from './aside/Aside'

export default {
  components: {
    asideCpn
  },
  data() {
    return {
      asideWidth: 200
    }
  },
  methods: {
    /* 后台管理用户退出 */
    backLogout() {
      // 清空admin-token
      window.sessionStorage.setItem("admin-token", "")
      // 跳转到登录界面
      this.$router.replace("/admin/login")
    },
    /* 改变侧边栏宽度 */
    changeAsideWidth(isChange) {
      isChange ? this.asideWidth = 64 : this.asideWidth = 200
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #555;
}

.el-header .el-row {
  height: 64px;
}

.title {
  margin-left: 30px;
}

.logout {
  float: right;
  margin-right: 30px;
}

.bd-container {
  height: calc(100vh - 61px);
}

.el-aside {
  background-color: #555;
}

</style>