<template>
  <div v-if="Object.keys(articleData).length !== 0">
    <!-- 头部区域 -->
    <div class="content-bd">
      <!-- 标题 -->
      <h1 class="article-title">{{ articleData.article.title }}</h1>
      <!-- 其他信息 -->
      <ul class="ul-info">
        <!-- 用户信息(可链接) -->
        <li>
          <i class="iconfont icon-yonghu1"></i> {{ articleData.user.pet_name }}
        </li>
        <!-- 创建时间 -->
        <li>
          <i class="iconfont icon-shizhong"></i>
          {{ articleData.article.gmtCreate | dateFormat("yyyy-MM-dd") }}
        </li>
        <!-- 浏览数量 -->
        <li>
          <i class="iconfont icon-liulan"></i>
          {{ articleData.article.viewCount }}
        </li>
        <!-- 分类信息（可链接） -->
        <li>
          <el-tag size="mini">
            <i class="iconfont icon-leimupinleifenleileibie2"></i>
            {{ articleData.cate.cate_name }}
          </el-tag>
        </li>
      </ul>
    </div>

    <!-- 展示图 -->
    <div class="show-img">
      <el-image
        :src="articleData.article.showImg"
        :preview-src-list="imgPreviewList"
        fit="contain"
      ></el-image>
    </div>

    <!-- 文章内容插槽 -->
    <slot name="preview"></slot>

    <!-- 标签信息（可链接） -->
    <ul class="tags-info">
      <li v-for="tag in articleData.tags" :key="tag.id">
        <el-tag size="mini" type="success">
          <i class="iconfont icon-biaoqian1"></i>
          {{ tag.tag_name }}
        </el-tag>
      </li>
    </ul>

    <!-- 点赞区域 -->
    <div class="article-dianzan">
      <!-- 点赞按钮 -->
      <el-button v-if="isGivelike" @click="giveLike(1)">
        <i class="iconfont icon-dianzan" style="font-size: 20px"></i>
        {{ articleData.article.likeCount }}
      </el-button>
      <!-- 取消点赞按钮 -->
      <el-button v-else @click="giveLike(0)" type="primary">
        <i class="iconfont icon-dianzan" style="font-size: 20px"></i>
        {{ articleData.article.likeCount }}
      </el-button>
    </div>

    <!-- 最后更新时间 -->
    <div class="last-update">
      <span class="descrip">Last Updated：</span>
      <span class="last-time"
        >{{
          articleData.article.gmtModified | dateFormat("yyyy-MM-dd hh:mm:ss")
        }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articleData: {
      type: Object,
    },
    isGivelike: {
      type: Boolean,
    },
  },
  computed: {
    imgPreviewList() {
      let imgList = []
      imgList.push(this.articleData.article.showImg)
      return imgList
    }
  },
  methods: {
    /* 访客点赞类型 */
    giveLike(type) {
      // 发送事件通知父组件，
      this.$emit("giveLike", type);
    },
  },
};
</script>

<style scoped>


.content-bd {
  padding: 10px 0;
}

.article-title {
  font-size: 24px;
  font-weight: 500;
  color: #242424;
}

.ul-info {
  width: 100%;
  height: 30px;
  line-height: 20px;
}

.ul-info li {
  float: left;
  padding: 4px 0;
  margin-right: 14px;
  color: #7f7f7f;
  list-style: none;
  font-size: 15px;
}

.ul-info li i {
  font-size: 13px;
}

.tags-info {
  width: 100%;
  height: 40px;
  line-height: 30px;
  border-bottom: solid 1px rgba(100, 100, 100, 0.3);
}

.tags-info li {
  margin-right: 15px;
  float: left;
  list-style: none;
}

.tags-info li .el-tag {
  font-size: 15px;
}
.show-img {
  margin-top: 10px;
  text-align: center;
}
.show-img img {
  width: 100%;
}

.last-update {
  margin-top: 20px;
  float: right;
}

.last-update .descrip {
  color: #3eaf7c;
  font-size: 13px;
}

.last-update .last-time {
  color: #aaa;
  font-size: 12px;
}

.article-dianzan {
  margin-top: 14px;
  display: block;
  width: 100%;
  text-align: center;
}
</style>