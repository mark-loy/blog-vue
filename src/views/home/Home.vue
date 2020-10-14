<template>
  <!-- 首页区域 -->
  <div class="home">
    <el-row :gutter="18" type="flex" justify="center">
      <!-- 列表列 -->
      <el-col :xs="24" :sm="14" :md="12" :lg="10">
        <el-card class="box-card list-card-width">
          <!-- 头部区域 -->
          <div slot="header" class="clearfix">
            <!-- 标题 -->
            <span class="title">博客</span>
            <!-- 统计文章篇数 -->
            <span class="total"
              >共<span class="total-number">{{ total }}</span
              >篇</span
            >
          </div>

          <!-- 列表区域 -->
          <articleCpn
            v-for="article in articleList"
            :key="article.id"
            :article="article"
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

      <!-- PC个人信息列 -->
      <el-col :xs="0" :sm="4">
        <el-card class="info-card-width" shadow="hover">
          <otherCpn :otherInfo="otherInfoData"></otherCpn>
        </el-card>
      </el-col>
    </el-row>

    <!-- 移动端个人信息行 -->
    <el-row class="mobile-user">
      <el-col :xs="24" :sm="0">
        <el-card class="info-card-width" shadow="hover">
          
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import articleCpn from "./article/Article";
import otherCpn from "./other/OtherInfo";

import { request } from "plugins/network";

export default {
  components: {
    articleCpn,
    otherCpn,
  },
  data() {
    return {
      /* 文章列表数据源 */
      articleList: [],
      /* 文章发表总数 */
      total: 0,
      /* 分页条件 */
      query: {
        currentPage: 1,
        offset: 10,
      },
      /* 其他信息数据源 */
      otherInfoData: {}
    };
  },
  created() {
    //请求文章列表数据源
    this.getArticleListData();
    //请求其他信息数据源
    this.getOtherInfoData();
  },
  methods: {
    /* 获取文章列表数据源 */
    getArticleListData() {
      //发送数据请求
      request({
        method: "get",
        url: "/home/article",
        params: {
          currentPage: this.query.currentPage,
          offset: this.query.offset,
        },
      }).then((res) => {
        console.log(res);
        // 提示错误信息
        if (res.code !== 200) {
          return this.$message.error("请求博客列表数据失败");
        }
        // 设置列表数据
        this.articleList = res.data.articleList;
        // 设置文章总篇数
        this.total = res.data.total;
      });
    },
    /* 获取other数据源 */
    getOtherInfoData() {
      // 发送请求
      request({
        method: "get",
        url: "/home/otherInfo",
      }).then((res) => {
        console.log(res);
        this.otherInfoData = res.data
      });
    },
    /* 当页显示数改变 */
    handleSizeChange(value) {
      // 设置查询参数
      this.query.offset = value;
      // 刷新列表数据
      this.getArticleListData();
    },
    /* 当前页发生改变 */
    handleCurrentChange(value) {
      // 设置查询参数
      this.query.currentPage = value;
      // 刷新列表数据
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
