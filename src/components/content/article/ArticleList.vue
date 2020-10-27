<template>
  <!-- 首页文章展示区域 -->
  <div class="article" v-if="Object.keys(info).length !== 0">
    <el-card shadow="hover">
      <!-- 标题 -->
      <h2 @click="toArticleDetail(info.article.id)">
        {{ info.article.title }}
      </h2>
      <!-- 描述信息 -->
      <p class="decription m-text">{{ info.article.description }}</p>
      <!-- 其他信息 -->
      <p class="other-info">
        <!-- 头像 用户名 -->
        <span>
          <i class="iconfont icon-yonghu"></i>
          {{ info.user.petName }}
        </span>
        <!-- 发表时间 -->
        <span>
          <i class="iconfont icon-shijian-xian"></i>
          {{ info.article.gmt_create | dateFormat("yyyy-MM-dd") }}
        </span>
        <!-- 浏览数 -->
        <span>
          <i class="iconfont icon-browse"></i>
          {{ info.article.view_count }}
        </span>
        <!-- 分类 -->
        <el-tag size="mini">
          <i class="iconfont icon-fenlei"></i>
          {{ info.category.cate_name }}
        </el-tag>
      </p>
      <!-- 标签信息 -->
      <div class="tag-box">
        <el-tag v-for="tag in info.tag" :key="tag.id" size="mini" class="tag-item">
          <i class="iconfont icon-biaoqian"></i>
          {{ tag.tag_name }}
        </el-tag>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: {},
    },
  },
  methods: {
    /* 跳转到文章详情页面 */
    toArticleDetail(id) {
      this.$router.push('/article/' + id)
    },
  },
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
  margin-bottom: 15px;
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

.tag-box {
  float: left;
  margin-bottom: 15px;

}

.tag-item {
  margin-right: 15px;
}
</style>