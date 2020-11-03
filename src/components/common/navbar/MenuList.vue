<template>
  <!-- 菜单列表区域 -->
  <div clss="menu-list">
    <ul :class="isFloat ? 'cus-menu' : 'cus-drawer-menu'">
      <!-- 菜单项 -->
      <li @click="activeSeleted('1', '/home')" :class="showClass('1')">
        <i class="iconfont icon-faxian-copy"></i>
        <span>首页</span>
      </li>
      <li @click="activeSeleted('2', '/category')" :class="showClass('2')">
        <i class="iconfont icon-fenlei"></i>
        <span>分类</span>
      </li>
      <li @click="activeSeleted('3', '/tag')" :class="showClass('3')">
        <i class="iconfont icon-biaoqian"></i>
        <span>标签</span>
      </li>
      <li @click="activeSeleted('4', '/time')" :class="showClass('4')">
        <i class="iconfont icon-shijian-xian"></i>
        <span>时间线</span>
      </li>
      <li @click="activeSeleted('5', '/message')" :class="showClass('5')">
        <i class="iconfont icon-liuyan"></i>
        <span>留言</span>
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
  beforeCreate() {
    /* 监听路由切换 */
    this.$bus.$on("tabRouter", (name) => {
      if (name === "home") {
        this.activeIndex = "1";
        window.sessionStorage.setItem("currentRouter", "/" + name)
      } else if (name === "category") {
        this.activeIndex = "2";
        window.sessionStorage.setItem("currentRouter", "/" + name)
      } else if (name === "tag") {
        this.activeIndex = "3";
        window.sessionStorage.setItem("currentRouter", "/" + name)
      } else if (name === "time") {
        this.activeIndex = "4";
        window.sessionStorage.setItem("currentRouter", "/" + name)
      } else if (name === "message") {
        this.activeIndex = "5";
        window.sessionStorage.setItem("currentRouter", "/" + name)
      } else if (name === 'article') {
        this.activeIndex = "0";
        window.sessionStorage.setItem("currentRouter", "/" + name + "/" + this.$route.params.id)
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
.menu-list {
  width: 600px;
}

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
  list-style: none;
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