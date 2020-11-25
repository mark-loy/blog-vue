<template>
  <div class="animate__animated animate__zoomIn">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="18" :lg="16" :xl="12">
        <div>
          <articleItem
            :articleData="articleData"
            :isGivelike="isGivelike"
            @giveLike="giveLike"
          >
            <articlePreview
              slot="preview"
              :context="context"
              ref="artContent"
            ></articlePreview>
          </articleItem>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import articleItem from "./ArticleItem";
import articlePreview from "./ArticlePreview";

import { request } from "plugins/network";

export default {
  components: {
    articleItem,
    articlePreview,
  },
  data() {
    return {
      articleData: {},
      context: "",
      /* 控制点赞按钮的显示、隐藏 */
      isGivelike: true,
      /* 通知id */
      informId: 0,
    };
  },
  created() {
    // 获取通知id
    const informId = this.$route.params.informId;
    if (informId !== undefined) {
      this.informId = informId;
    }
    // 获取文章详情数据源
    this.getArticleDetail(this.$route.params.id);
    // 获取文章是否点赞
    this.getIsLike(this.$route.params.id);
  },
  methods: {
    /* 获取文章详情数据源 */
    getArticleDetail(id) {
      request({
        method: "get",
        url: "/home/article/" + id,
        params: {
          informId: this.informId,
        },
      }).then((res) => {
        console.log(res);
        // 错误提示信息
        if (res.code !== 200) return this.$message.error(res.msg);
        // 设置数据源
        this.articleData = res.data;
        this.context = res.data.article.context;
      });
    },
    /* 获取文章是否点赞 */
    getIsLike(articleId) {
      // 获取访客id
      const visitor_id = window.sessionStorage.getItem("visitor-id");
      // 判断访客是否存在
      if (visitor_id !== null && visitor_id !== "") {
        // 访客存在则发送请求
        request({
          method: "get",
          url: "/home/like/article",
          params: {
            visitorId: visitor_id,
            articleId: articleId,
          },
        }).then((res) => {
          if (res.code !== 200) return this.$message.error(res.message);
          this.isGivelike = res.data.isLike === 1 ? false : true;
        });
      }
    },
    /* 访客点赞or取消点赞 */
    giveLike(type) {
      // 获取访客id
      const visitor_id = window.sessionStorage.getItem("visitor-id");
      // 判断访客是否存在
      if (visitor_id !== null && visitor_id !== "") {
        // 文章id
        const articleId = this.$route.params.id;
        request({
          method: "put",
          url: "/home/like/article",
          data: {
            type: type,
            visitorId: visitor_id,
            articleId: articleId,
          },
        }).then((res) => {
          if (res.code !== 200) return this.$message.error(res.message);
          if (type === 1) {
            this.$message.success("点赞成功");
          } else {
            this.$message.success("取消点赞");
          }
          // 重新获取文章是否已点赞
          this.getIsLike(articleId);
          // 刷新页面数据
          this.getArticleDetail(articleId);
        });
      } else {
        this.$message.error("登录后点赞");
      }
    },

  },
};
</script>

<style scoped>



</style>