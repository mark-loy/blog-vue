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
          <otherCpn :otherInfo="otherInfoData"></otherCpn>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import articleCpn from "components/content/article/Article";
import otherCpn from "./other/OtherInfo";

import { request } from "plugins/network";

import { mixin } from "common/mixin";

export default {
  components: {
    articleCpn,
    otherCpn,
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
