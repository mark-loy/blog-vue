<template>
  <!-- 首页区域 -->
  <div class="home">
    <el-row :gutter="18" type="flex" justify="center">
      <!-- 列表列 -->
      <el-col :xs="24" :sm="14" :md="12" :lg="10">
        <!-- 当查询到文章数据列表时 -->
        <el-card
          class="box-card list-card-width"
          v-if="Object.keys(articleList).length !== 0"
        >
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

      <!-- PC个人信息列 -->
      <div v-if="Object.keys(otherInfoData).length !== 0">
        <el-col :xs="0" :sm="4">
          <el-card class="info-card-width" shadow="hover">
            <otherCpn :otherInfo="otherInfoData"></otherCpn>
          </el-card>
        </el-col>
      </div>
    </el-row>

    <!-- 移动端个人信息行 -->
    <div v-if="Object.keys(otherInfoData).length !== 0">
      <el-row class="mobile-user">
        <el-col :xs="24" :sm="0">
          <el-card class="info-card-width" shadow="hover">
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

import { request } from "plugins/network";

import { mixin } from "common/mixin";

export default {
  components: {
    articleList,
    otherCpn,
    notFound,
  },
  mixins: [mixin],
  data() {
    return {
      /* 其他信息数据源 */
      otherInfoData: {},
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
