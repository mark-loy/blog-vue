<template>
  <!-- 菜单列表区域 -->

  <div clss="menu-list">
    <ul :class="isFloat ? 'cus-menu' : 'cus-drawer-menu'">
      <!-- 菜单项 -->
      <li @click="activeSeleted('1', '/home')" :class="showClass('1')">
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
      </li>
      <li @click="activeSeleted('2', '/category')" :class="showClass('2')">
        <i class="iconfont icon-leimupinleifenleileibie2"></i>
        <span>分类</span>
      </li>
      <li @click="activeSeleted('3', '/tag')" :class="showClass('3')">
        <i class="iconfont icon-biaoqian"></i>
        <span>标签</span>
      </li>
      <li @click="activeSeleted('4', '/time')" :class="showClass('4')">
        <i class="iconfont icon-guidangxiangmu"></i>
        <span>归档</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MenuList",
  props: {
    /* 控制菜单列行和列的显示 */
    isFloat: {
      type: Boolean,
    },
  },
  data() {
    return {
      activeIndex: "1",
    };
  },
  mounted() {
    /* 监听路由切换 */
    this.$bus.$on("tabMenu", (name) => {
      if (name === "home") {
        this.activeIndex = "1";
      } else if (name === "cate") {
        this.activeIndex = "2";
      } else if (name === "tag") {
        this.activeIndex = "3";
      } else if (name === "time") {
        this.activeIndex = "4";
      }
    });
  },
  methods: {
    /* 选择当前按钮 */
    activeSeleted(index, path) {
      // 设置当前菜单下标
      this.activeIndex = index;
      // 通知父组件，关闭抽屉
      this.$emit("closedDrawer", this.activeIndex);
      // 路由跳转
      this.$router.push(path);
    },
    /* 判断pc与手机端分别需要显示的样式 */
    showClass(index) {
      return this.activeIndex === index
        ? this.isFloat
          ? "active-background"
          : "active-text"
        : "";
    },
  },
};
</script>

<style scoped>
span {
  margin-left: 3px;
}

.cus-menu li {
  float: left;
  padding: 8px 12px;
  margin: 0 10px;
  border-radius: 5px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 700;
}

.cus-menu li:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.15);
}

.active-background {
  background-color: rgba(255, 255, 255, 0.15);
}

.cus-icon {
  float: right;
  color: #fff;
  font-size: 17px;
}

.active-text {
  color: skyblue !important;
}

.cus-drawer-menu li {
  padding: 15px 12px;
  margin: 0 10px;
  border-radius: 5px;
  color: rgba(26, 25, 25, 0.6);
  text-align: center;
  border-bottom: solid 1px rgba(100, 100, 100, 0.1);
}

.cus-drawer-menu li span {
  font-size: 17px;
  font-weight: 700;
}
</style>