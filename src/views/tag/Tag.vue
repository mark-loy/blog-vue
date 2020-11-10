<template>
  <div class="tag">
    <!-- 移动端搜索行 -->
    <el-row class="search-row" type="flex" justify="center" align="middle">
      <!-- 移动搜索列 -->
      <el-col :xs="24" :sm="0">
        <el-input
          placeholder="请输入内容"
          v-model="title"
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
    </el-row>

    <!-- 引用导航组件 -->
    <div v-if="Object.keys(articleList).length !== 0">
      <article-nav-bar
        @findArticleById="findArticleByTagId"
        :data="tagData"
        title="标签"
        type="tag"
      >
      </article-nav-bar>
    </div>

    <!-- 分类数据列表行 -->
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="14" :md="12" :lg="12">
        <el-card v-if="Object.keys(articleList).length !== 0">
          <!-- 文章列表区域 -->
          <articleList
            v-for="article in articleList"
            :key="article.id"
            :info="article"
          ></articleList>

          <!-- 分页区域 -->
          <el-pagination
            background
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="query.currentPage"
            :page-size="query.offset"
            :total="total"
          >
          </el-pagination>
        </el-card>
        <!-- 未找到文章博客时 -->
        <div v-if="total === 0">
          <notFound></notFound>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import articleList from "components/content/article/ArticleList";
import articleNavBar from "components/content/article/ArticleNavBar";
import notFound from "components/common/404/NotFound";

import { request } from "plugins/network";

import { articleMixin } from "common/mixin";

export default {
  components: {
    articleNavBar,
    articleList,
    notFound,
  },
  mixins: [articleMixin],
  data() {
    return {
      /* 标签菜单数据源 */
      tagData: [],
      /* title */
      title: "",
    };
  },
  created() {
    this.getAllTagData();
  },
  mounted() {
    /* 监听标签菜单切换,加载文章数据 */
    this.$bus.$on("tabNavBar", (id) => {
      this.getArticleListData(id);
    });
  },
  beforeDestroy() {
    // 在当前组件销毁之前，移除当次监听
    this.$bus.$off("tabNavBar");
  },
  methods: {
    /* 获取所有标签信息数据源 */
    getAllTagData() {
      request({
        method: "get",
        url: "/tag/all",
      }).then((res) => {
        // 提示错误信息
        if (res.code !== 200) return this.$message.error(res.message);
        // 设置数据源
        this.tagData = res.data.tags;
      });
    },
    /* 根据分类id查询文章 */
    findArticleByTagId(tagId) {
      // 设置查询的分类id
      this.query.tag_id = tagId;
      // 刷新列表数据
      this.getArticleListData();
    },
    /* 根据title搜索文章 */
    searchArticle() {
      // 设置查询的title
      this.query.search = this.title;
      // 刷新文章列表
      this.getArticleListData();
    },
  },
};
</script>

<style scoped>
</style>