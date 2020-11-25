<template>
  <!-- 内容区域 -->
  <div v-if="context.length !== 0">
    <div class="article-content">
      <mavon-editor
        ref="artContent"
        v-model="context"
        :subfield="false"
        defaultOpen="preview"
        :toolbarsFlag="false"
        :editable="false"
        :scrollStyle="true"
        codeStyle="gruvbox-dark"
      ></mavon-editor>
    </div>

    <!-- 文章目录 -->
    <el-row class="app-menu">
      <el-col :xs="0">
        <ol class="js-toc"></ol>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* 目录生成css */
import tocbot from "tocbot";

export default {
  props: {
    context: {
      type: String,
    },
  },
  mounted() {
    setTimeout(() => {
      this.addMao();
      tocbot.init({
        tocSelector: ".js-toc", //要把目录添加元素位置，支持选择器
        contentSelector: ".js-toc-content", //获取html的元素
        headingSelector: "h1, h2, h3", //要显示的id的目录
        scrollSmooth: true,
        scrollSmoothOffset: -80, // 锚点定位顶部的偏移量
        headingsOffset: 120, // 目录滚动偏移量，实现文章与目录滚动同步
        hasInnerContainers: true,
      });
    }, 500);
  },
  methods: {
    /* 给自动生成目录的h标签，添加id */
    addMao() {
      // 获取内容中的所有子节点
      let parentNodes = this.$refs.artContent.$el.children[1].children[1]
        .children[0];
      if (parentNodes.className !== null) {
        parentNodes.className = parentNodes.className + " js-toc-content";
      }
      const nodes = parentNodes.children;
      if (nodes.length) {
        // 定义匹配H类标签的正则
        const reg = /^H[1-6]{1}$/;
        for (let i = 0; i < nodes.length; i++) {
          let node = nodes[i];
          // 匹配节点名是否是h1 ~ h6
          if (reg.exec(node.tagName)) {
            node.id = node.firstElementChild.id;
            node.firstElementChild.removeAttribute("id");
          }
        }
      }
    },
  },
};
</script>

<style scoped>
/* 引入自动生成目录的css */
@import "~assets/css/tocbot.css";

.article-content {
  margin: 20px 0;
}

.app-menu {
  width: 200px;
  position: fixed;
  right: 10px;
  top: 150px;
  z-index: 2000;
}
</style>