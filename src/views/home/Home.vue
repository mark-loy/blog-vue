<template>
  <!-- 首页区域 -->
  <div class="home">
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

    <el-row :gutter="18" type="flex" justify="center">
      <!-- 列表列 -->
      <el-col :xs="24" :sm="14" :md="12" :lg="10">

        <!-- 列表区域 -->
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
            hide-on-single-page 
          >
          </el-pagination>
        </div>
        <!-- 未找到文章博客时 -->
        <div v-if="total === 0">
          <notFound></notFound>
        </div>
      </el-col>

      <!-- PC个人信息列 -->
      <div v-if="Object.keys(otherInfoData).length !== 0">
        <el-col :xs="0" :sm="4">
          <el-card class="info-card-width animate__animated animate__bounceInRight" shadow="hover">
            <otherCpn :otherInfo="otherInfoData"></otherCpn>
          </el-card>
        </el-col>
      </div>
    </el-row>

    <!-- 移动端个人信息行 -->
    <div v-if="Object.keys(otherInfoData).length !== 0">
      <el-row class="mobile-user">
        <el-col :xs="24" :sm="0">
          <el-card class="info-card-width animate__animated animate__bounceInRight" shadow="hover">
            <otherCpn :otherInfo="otherInfoData"></otherCpn>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import articleList from "components/content/article/ArticleList";
import otherCpn from "./other/OtherInfo";
import notFound from "components/common/404/NotFound";

import { articleMixin } from "common/mixin";
import { request } from "plugins/network";
export default {
  components: {
    articleList,
    otherCpn,
    notFound,
  },
  mixins: [articleMixin],
  data() {
    return {
      /* 其他信息数据源 */
      otherInfoData: {},
      /* title */
      title: "",
    };
  },
  created() {
    //请求其他信息数据源
    this.getOtherInfoData();
  },
  methods: {
    /* 获取other数据源 */
    getOtherInfoData() {
      //发送请求
      request({
        method: "get",
        url: "/home/otherInfo",
        params: {
          cateCount: 3,
          tagCount: 10,
        },
      }).then((res) => {
        if (res.code !== 200) return this.$message.error(res.message);
        this.otherInfoData = res.data;
      });
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
.info-card-width {
  min-width: 280px;
}

.mobile-user {
  margin-top: 20px;
}
</style>>
