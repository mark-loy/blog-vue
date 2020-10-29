<template>
  <div>
    <!-- 控制侧边栏折叠 -->
    <div @click="collapseAside" :class="['collapse']" >|||</div>

    <el-menu
      
      background-color="#696c6e"
      text-color="#fff"
      active-text-color="#409eff"
      unique-opened
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="iconfont icon-user-group"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item>
          <i class="iconfont icon-leimupinleifenleileibie2"></i
          >访客管理</el-menu-item
        >
        <el-menu-item>
          <i class="iconfont icon-leimupinleifenleileibie2"></i
          >个人管理</el-menu-item
        >
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont icon-ai-article"></i>
          <span>文章管理</span>
        </template>
        <el-menu-item @click="toArticle">
          <i class="iconfont icon-leimupinleifenleileibie2"></i
          >文章列表</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /* 控制侧边栏是否折叠 */
      isCollapse: false
    };
  },
  methods: {
    /* 路由到文章列表 */
    toArticle() {
      this.$router.push("/back/article");
    },
    /* 侧边栏的折叠与展开 */
    collapseAside() {
      /* 设置是否折叠 */
      this.isCollapse = !this.isCollapse
      // 通知父组件，改变其width
      this.$emit('asideCollapse', this.isCollapse )
    }
  },
};
</script>

<style scoped>
i {
  margin-right: 8px;
}

.collapse {
  text-align: center;
  font-size: 15px;
  background-color: #999;
  color: #fff;
  cursor: pointer;
}



</style>