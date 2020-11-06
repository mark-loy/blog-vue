<template>
  <!-- 导航栏区域 -->
  <div class="navbar">
    <el-row
      class="navbar-row"
      :gutter="18"
      type="flex"
      justify="space-around"
      align="middle"
    >
      <!-- logo列 -->
      <el-col :xs="1" :sm="2" :md="3" :lg="4" :xl="6">
        <a href="http://localhost:8080/" class="logo">Blog</a>
      </el-col>

      <el-col :span="17">
        <el-row type="flex" align="middle">
          <!-- 菜单列 -->
          <el-col class="menu-list" :xs="0">
            <menu-list :isFloat="true"></menu-list>
          </el-col>

          <!-- PC搜索列 -->
          <el-col :xs="0" class="button-input">
            <el-input
              placeholder="请输入内容"
              v-model="query"
              :clearable="true"
              size="small"
            >
              <el-button
                @click="searchArticle"
                slot="append"
                icon="el-icon-search"
              ></el-button>
            </el-input>
          </el-col>

          <!-- 移动登录按钮 -->
          <el-col :xs="2" :sm="0">
            <el-button
              v-if="isShowLoginBtn"
              type="primary"
              @click="showLoginDialog"
              size="mini"
              >登录</el-button
            >
            <el-button v-else type="primary" @click="visitor_logout" size="mini"
              >注销</el-button
            >
          </el-col>

          <!-- 折叠列 -->
          <el-col :xs="3" :sm="0">
            <span @click="showDrawer">
              <i class="iconfont icon-zhedie cus-icon"></i>
            </span>
          </el-col>
        </el-row>
      </el-col>

      <!-- PC登录按钮 -->
      <el-col :xs="0" class="pc-login-btn">
        <el-button
          v-if="isShowLoginBtn"
          type="primary"
          @click="showLoginDialog"
          size="mini"
          >登录</el-button
        >
        <el-button v-else type="primary" @click="visitor_logout" size="mini"
          >注销</el-button
        >
      </el-col>
    </el-row>

    <!-- 抽屉区域：移动端菜单栏列表显示 -->
    <el-drawer :visible.sync="drawer" :with-header="false">
      <menu-list :isFloat="false" @closedDrawer="closedDrawer"></menu-list>
    </el-drawer>

    <!-- 点击登录按钮，弹出对话框-->
    <el-dialog
      title="登录方式"
      :visible.sync="loginDialogVisible"
      width="360px"
    >
      <ul class="login-dialog">
        <li>
          <el-link
            :underline="false"
            href="https://github.com/login/oauth/authorize?client_id=941034207570ce50a8c4&redirect_uri=http://localhost:8080/login&scope=user&state=fbc9b373-1375-11eb-a817-005056c00001"
          >
            <i class="iconfont icon-github2"></i>
          </el-link>
        </li>
        <li>
          <el-link
            :underline="false"
            href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101908663&redirect_uri=http://192.168.1.4:8080/login&state=fbc9b373-1375-11eb-a817-005056c00001"
          >
            <i class="iconfont icon-qq1"></i>
          </el-link>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import MenuList from "./MenuList";

export default {
  name: "NavBar",
  components: {
    MenuList,
  },
  data() {
    return {
      /* input查询绑定值 */
      query: "",
      /* 控制抽屉显示、隐藏 */
      drawer: false,
      /* 控制登录对话框显示、隐藏 */
      loginDialogVisible: false,
      /* 控制登录按钮的显示、隐藏 */
      isShowLoginBtn: true,
    };
  },
  beforeCreate() {
    this.$bus.$on("tabLoginBtn", () => {
      // 隐藏登录按钮
      this.isShowLoginBtn = false;
    });
  },
  mounted() {
    this.isShowLoginBtn = window.sessionStorage.getItem("visitor-token")
      ? false
      : true;
  },
  methods: {
    /* 显示抽屉 */
    showDrawer() {
      this.drawer = true;
    },
    /* 关闭抽屉 */
    closedDrawer(index) {
      this.drawer = false;
      this.activeIndex = index;
    },
    /* 根据title搜索文章 */
    searchArticle() {
      // 通过事件总线，发射根据title查询文章事件
      this.$bus.$emit("searchArticle", this.query);
    },
    /* 显示登录对话框 */
    showLoginDialog() {
      this.loginDialogVisible = true;
    },
    /* 注销访客登录 */
    visitor_logout() {
      // 清空token
      window.sessionStorage.setItem("visitor-token", "");
      window.sessionStorage.setItem("visitor-id", "");
      // 刷新window
      location.reload();
    },
  },
};
</script>

<style scoped>
.navbar,
.el-row {
  height: 100%;
}

.navbar-row {
  min-width: 900px;
}

.logo {
  float: right;
  margin-right: 10px;
  font-size: 20px;
  color: skyblue;
  font-weight: 600;
  text-decoration: none;
}

.menu-list {
  max-width: 580px;
  min-width: 500px;
}

.button-input {
  max-width: 200px;
  min-width: 170px;
}

.cus-icon {
  float: right;
  color: #fff;
  font-size: 17px;
}

.login-dialog {
  display: flex;
}

.login-dialog li {
  flex: 1;
  text-align: center;
  list-style: none;
}

.login-dialog li i {
  font-size: 45px;
}

.login-dialog li i:hover {
  color: skyblue;
  cursor: pointer;
}

.pc-login-btn {
  min-width: 100px;
  max-width: 120px;
}
</style>
