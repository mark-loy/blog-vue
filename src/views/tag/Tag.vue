<template>
  <div class="tag">
    <!-- 引用文章导航组件 -->
    <article-nav-bar
      @findArticleById="findArticleByTagId"
      :data="tagData"
      title="标签"
      type="tag"
    ></article-nav-bar>

    <!-- 分类数据列表行 -->
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="14" :md="12" :lg="12">
        <el-card>
          <!-- 文章列表区域 -->
          <articleCpn
            v-for="article in articleList"
            :key="article.id"
            :info="article"
          ></articleCpn>

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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import articleCpn from "components/content/article/Article";
import articleNavBar from "components/content/article/ArticleNavBar";

import { request } from "plugins/network";

import { mixin } from "common/mixin";

export default {
  components: {
    articleNavBar,
    articleCpn,
  },
  mixins: [mixin],
  data() {
    return {
      /* 标签菜单数据源 */
      tagData: [],
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
        if (res.code !== 200) return this.$message.error(res.msg);
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
  },
};
</script>

<style scoped>
</style>