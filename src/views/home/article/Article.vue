<template>
  <!-- 首页文章展示区域 -->
  <div class="article" v-if="Object.keys(article).length !== 0">
    <el-card shadow="hover">
      <!-- 标题 -->
      <h2 @click="toArticleDetail(article.id)">{{article.title}}</h2>
      <!-- 描述信息 -->
      <p class="decription m-text">{{article.description}}</p>
      <!-- 其他信息 -->
      <p class="other-info">
        <!-- 头像 用户名 -->
        <span>
          <i class="iconfont icon-yonghu"></i>
          {{article.userDTO.petName}}
        </span>
        <!-- 发表时间 -->
        <span>
          <i class="iconfont icon-shijian"></i>
          {{article.gmtCreate | dateFormat}}
        </span>
        <!-- 浏览数 -->
        <span>
          <i class="iconfont icon-browse"></i>
          {{article.viewCount}}
        </span>
        <!-- 分类 -->
        <el-tag size="mini">{{article.category.categoryName}}</el-tag>
      </p>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: {}
    },
  },
  methods: {
    /* 跳转到文章详情页面 */
    toArticleDetail(id) {
      console.log(id);
    }
  }
};
</script>

<style scoped>
.article {

  padding: 12px 10px;
}

h2 {
  display: inline;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  color: #333333;
}

h2:hover {
  color: skyblue;
}

.decription {
  margin: 15px 0;
}

.other-info {
  color: #7f7f77;
}

.other-info span {
  font-size: 12px;
  margin-right: 6px;
}

.other-info span i {
  margin-right: 2px;
}

.el-tag {
  float: right;
}

i {
  font-size: 14px;
}
</style>