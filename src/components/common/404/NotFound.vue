<template>
  <div>
    <el-card class="box-card card-up">
      <!-- 头部区域 -->
      <div slot="header" class="clearfix">
        <!-- 标题 -->
        <span class="title">搜索结果</span>
        <!-- 统计文章篇数 -->
        <span class="total">共<span class="total-number">0</span>篇</span>
      </div>
      <!-- 内容区域 -->
      <p class="content">
        <img src="~assets/imgs/404.jpg" alt="">
      </p>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>

.content img{
  width: 100%;
}
</style>