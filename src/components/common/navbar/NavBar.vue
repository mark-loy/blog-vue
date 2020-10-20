<template>
  <!-- 导航栏区域 -->
  <div class="navbar">
    <el-row class="navbar-row" :gutter="18" type="flex" justify="space-around" align="middle">
      <!-- logo列 -->
      <el-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6">
        <h2 class="logo">Blog</h2>
      </el-col>

      <el-col  :span="20">
        <el-row type="flex" align="middle">
          <!-- 菜单列 -->
          <el-col class="menu-list" :xs="0" :span="11">
            <menu-list :isFloat="true"></menu-list>
          </el-col>

          <!-- 搜索列 -->
          <el-col class="button-input">
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

          <!-- 折叠列 -->
          <el-col :xs="2" :sm="0">
            <span @click="showDrawer">
              <i class="iconfont icon-zhedie cus-icon"></i>
            </span>
          </el-col>

        </el-row>
      </el-col>
    </el-row>

    <!-- 抽屉区域：移动端菜单栏列表显示 -->
    <el-drawer :visible.sync="drawer" :with-header="false">
      <menu-list :isFloat="false" @closedDrawer="closedDrawer"></menu-list>
    </el-drawer>
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
    };
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
      console.log("query=====" + this.query);
      this.$bus.$emit("searchArticle", this.query);
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
}

.menu-list {
  width: 600px;
}

.button-input {
  max-width: 200px;
}

.cus-icon {
  float: right;
  color: #fff;
  font-size: 17px;
}
</style>
