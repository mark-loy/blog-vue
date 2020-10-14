<template>
  <!-- 导航栏区域 -->
  <div class="navbar">
    <el-row type="flex" justify="space-around" align="middle">
      <!-- logo列 -->
      <el-col :xs="3" :sm="4" :md="4" :lg="4" :xl="4">
        <h2 class="logo">BLOG</h2>
      </el-col>

      <!-- 菜单列 -->
      <el-col :xs="0" :sm="12" :md="12" :lg="12" :xl="12">
        <menu-list ref="menu" :parentActiveIndex="activeIndex" :isFloat="true"></menu-list>
      </el-col>

      <!-- 搜索列 -->
      <el-col :xs="12" :sm="4" :md="4" :lg="4" :xl="4">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="query"
        >
        </el-input>
      </el-col>

      <!-- 折叠列 -->
      <el-col :xs="4" :sm="0" :md="0" :lg="0" :xl="0">
        <span @click="showDrawer">
          <i class="iconfont icon-zhedie cus-icon"></i>
        </span>
      </el-col>
    </el-row>

    <!-- 抽屉区域：移动端菜单栏列表显示 -->
    <el-drawer :visible.sync="drawer" :with-header="false">
      <menu-list ref="menuDrawer"
        :parentActiveIndex="activeIndex"
        :isFloat="false"
        @closedDrawer="closedDrawer"
      ></menu-list>
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
      activeIndex: '1'
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
      this.activeIndex = index
    },
  },
  watch: {
    activeIndex(value) {
      console.log(value);
      this.$refs.menuDrawer.showClass(value)
      this.$refs.menu.showClass(value)
    }
  }
};
</script>

<style scoped>
.navbar,
.el-row {
  height: 100%;
}

.logo {
  float: right;
  margin-right: 10px;
  font-size: 20px;
  color: skyblue;
}

.cus-icon {
  float: right;
  color: #fff;
  font-size: 17px;
}
</style>
