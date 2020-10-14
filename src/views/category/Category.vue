<template>
  <div class="category">
    <!-- 分类头部行 -->
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="14" :md="12" :lg="12">
        <el-card class="box-card">
          <!-- 头部区域 -->
          <div slot="header" class="clearfix">
            <!-- 分类标题 -->
            <span class="title">分类</span>
            <!-- 统计文章篇数 -->
            <span class="total"
              >共<span class="total-number">{{ total }}</span
              >类</span
            >
          </div>

        </el-card>
      </el-col>
    </el-row>

    <!-- 分类数据列表行 -->
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="14" :md="12" :lg="12"> </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>