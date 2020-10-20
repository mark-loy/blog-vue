<template>
  <div class="category">
    <!-- 引用文章导航组件 -->
    <div v-if="Object.keys(articleList).length !== 0">
      <article-nav-bar
        ref="articleNav"
        @findArticleById="findArticleByCateId"
        :data="cateData"
        title="分类"
        type="cate"
      ></article-nav-bar>
    </div>

    <!-- 分类数据列表行 -->

    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="14" :md="12" :lg="12">
        <!-- 查询到文章博客时 -->
        <el-card v-if="Object.keys(articleList).length !== 0">
          <!-- 文章列表区域 -->
          <div>
            <articleList
              v-for="article in articleList"
              :key="article.id"
              :info="article"
            ></articleList>
          </div>

          <!-- 分页区域 -->
          <div>
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
          </div>
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

import { mixin } from "common/mixin";

import { request } from "plugins/network";

export default {
  components: {
    articleList,
    articleNavBar,
    notFound,
  },
  mixins: [mixin],
  data() {
    return {
      /* 分类展示数据源 */
      cateData: [],
    };
  },
  created() {
    // 获取数据源
    this.getAllCate();
  },
  beforeCreate() {
    /* 监听分类菜单切换，加载文章数据 */
    this.$bus.$on("tabNavBar", (id) => {
      this.findArticleByCateId(id);
    });
  },
  beforeDestroy() {
    // 在当前组件销毁之前，移除当次监听
    this.$bus.$off("tabNavBar");
  },
  methods: {
    /* 获取所有分类数据源 */
    getAllCate() {
      request({
        method: "get",
        url: "/category/all",
      }).then((res) => {
        if (res.code !== 200) return this.$message.error(res.message);
        this.cateData = res.data.category;
      });
    },
    /* 根据分类id查询文章 */
    findArticleByCateId(cateId) {
      // 设置查询的分类id
      this.query.cate_id = cateId;
      // 刷新列表数据
      this.getArticleListData();
    },
  },
};
</script>

<style scoped>
.cate-all {
  display: inline-block;
  margin-left: 20px;
  margin-bottom: 10px;
  cursor: pointer;
}

.cate-all:hover .cate-all-name {
  color: skyblue;
}

.cate-all:hover {
  transform: scale(1.04);
}

.cate-all-name {
  font-size: 14px;
  font-weight: 600;
  color: #242424;
}

.cate-list {
  display: inline-block;
  margin-left: 14px;
  margin-bottom: 10px;
  cursor: pointer;
}

.cate-list:hover {
  transform: scale(1.04);
}

.cate-count {
  float: right;
  margin-left: 20px;
}

.cate-list:hover .cate-name {
  color: skyblue;
}

.cate-name {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: #242424;
}

.active-class {
  background-color: antiquewhite;
}
</style>