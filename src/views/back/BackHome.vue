<template>
  <div>
    <!-- 后台布局容器 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <el-row type="flex" justify="space-around" align="middle">
          <el-col>
            <h2 class="title">博客后台管理</h2>
          </el-col>
          <el-col>
            <el-button
              @click="backLogout"
              size="mini"
              type="primary"
              class="logout"
              >退出</el-button
            >
            <div @click="toInform"  class="inform">
              <el-badge :value="informData.length" >
                <i class="iconfont icon-icon_notice"></i>
              </el-badge>
            </div>
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
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import asideCpn from "./aside/Aside";

import {adminRequest} from 'plugins/network'

import {informMixin} from 'common/mixin'
export default {
  components: {
    asideCpn,
  },
  mixins: [informMixin],
  data() {
    return {
      /* 侧边栏宽度 */
      asideWidth: 200,
    };
  },
  methods: {
    /* 后台管理用户退出 */
    backLogout() {
      // 清空admin-token
      window.sessionStorage.setItem("admin-token", "");
      // 跳转到登录界面
      this.$router.replace("/admin/login");
    },
    /* 改变侧边栏宽度 */
    changeAsideWidth(isChange) {
      isChange ? (this.asideWidth = 64) : (this.asideWidth = 200);
    },
    /* 路由到通知组件 */
    toInform() {
      this.$router.push("/back/inform");
    },
  },
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

.inform {
  float: right;
  margin-right: 36px;
  margin-top: 4px;
  cursor: pointer;
}

.inform i {
  font-size: 22px;
  color: #fff;
}
</style>