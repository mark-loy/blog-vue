<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="14" :md="13" :lg="11" :xl="10">
        <!-- 头部区域 -->
        <div>
          <!-- 标题 -->
          <h1 class="article-title">{{ articleData.title }}</h1>
          <!-- 其他信息 -->
          <ul class="ul-info">
            <!-- 用户信息(可链接) -->
            <li><i class="iconfont icon-yonghu"></i> {{ user.pet_name }}</li>
            <!-- 创建时间 -->
            <li>
              <i class="iconfont icon-shijian"></i>
              {{ articleData.gmtCreate | dateFormat("yyyy-MM-dd") }}
            </li>
            <!-- 浏览数量 -->
            <li>
              <i class="iconfont icon-browse"></i> {{ articleData.viewCount }}
            </li>
            <!-- 点赞数 -->
            <li>
              <i class="iconfont icon-dianzan"></i>
              {{ articleData.likeCount }}
            </li>
            <!-- 分类信息（可链接） -->
            <li>
              <el-tag size="mini">
                <i class="iconfont icon-leimupinleifenleileibie2"></i>
                {{ cate.cate_name }}
              </el-tag>
            </li>
          </ul>
          <!-- 标签信息（可链接） -->
          <ul class="tags-info">
            <li v-for="tag in tags" :key="tag.id">
              <el-tag size="mini">
                <i class="iconfont icon-biaoqian"></i>
                {{ tag.tag_name }}
              </el-tag>
            </li>
          </ul>
        </div>
        <!-- 展示图 -->
        <p class="show-img">
          <img :src="articleData.showImg" alt="" />
        </p>
        <!-- 内容区域 -->
        <div class="article-content">
          {{ articleData.context }}
        </div>

        <!-- 最后更新时间 -->
        <div class="last-update">
          <span class="descrip">Last Updated：</span>
          <span class="last-time"
            >{{ articleData.gmtModified | dateFormat("yyyy-MM-dd hh:mm:ss") }}
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { request } from "plugins/network";

export default {
  data() {
    return {
      articleData: {},
      user: {},
      cate: {},
      tags: [],
    };
  },
  created() {
    // 获取文章详情数据源
    this.getArticleDetail(this.$route.params.id);
  },
  methods: {
    /* 获取文章详情数据源 */
    getArticleDetail(id) {
      request({
        method: "get",
        url: "/home/article/" + id,
      }).then((res) => {
        console.log(res);
        // 错误提示信息
        if (res.code !== 200) return this.$message.error(res.msg);
        // 设置数据源
        this.articleData = res.data.article;
        this.user = res.data.user;
        this.cate = res.data.cate;
        this.tags = res.data.tags;
      });
    },
  },
};
</script>

<style scoped>
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
}

.ul-info li i {
  font-size: 13px;
}

.tags-info {
  width: 100%;
  height: 40px;
  line-height: 40px;
}

.tags-info li {
  margin-right: 15px;
  float: left;
}
.show-img {
  margin-top: 30px;
  text-align: center;
}
.show-img img {
  width: 100%;
}

.article-content {
  margin: 30px 5px;
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
</style>