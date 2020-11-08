<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/back' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>通知列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-alert v-if="informData.length === 0" title="暂无通知" type="info" center show-icon> </el-alert>
      <ul v-else class="inform-ul">
        <li v-for="inform in informData" :key="inform.id">
          <span class="time">
            {{ inform.gmt_create | dateFormat("yyyy-MM-dd hh:ss") }}
          </span>
          <span class="visitor"> {{ inform.visitor.visitor_name }} </span>
          <span v-if="inform.type === 1">
            发表了留言
            <span
              class="inform-content"
              @click="toMessage(inform.id)"
              type="success"
              >{{ getInformContent(inform.message.content) }}</span
            >
          </span>
          <span v-else>
            点赞了文章
            <span
              class="inform-content"
              @click="toArticle(inform.article.id, inform.id)"
              type="success"
              >{{ inform.article.title }}</span
            >
          </span>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import { informMixin } from "common/mixin";

export default {
  mixins: [informMixin],
  data() {
    return {
      informData: [],
    };
  },
  methods: {
    /* 路由到留言组件 */
    toMessage(informId) {
      this.$router.push({ name: "message", params: { informId: informId } });
    },
    /* 路由到文章组件 */
    toArticle(articleId, informId) {
      this.$router.push({
        name: "article",
        params: { id: articleId, informId: informId },
      });
    },
    /*  */
    getInformContent(content) {
      return content.split(
        '<span style="font-weight: 700; color: #3eaf7c">@mark-loy</span>'
      )[1];
    },
  },
};
</script>

<style scoped>
.el-card {
  min-height: 600px;
}

.inform-ul li {
  margin: 14px 0;
}
.inform-ul li span {
  font-size: 16px;
}
.no-inform {
  font-size: 18px;
}
.time {
  margin-right: 8px;
  font-size: 13px !important;
}
.visitor {
  color: #3eaf7c;
  font-weight: 600;
}
.inform-content {
  cursor: pointer;
  font-weight: 600;
  color: #3eaf7c;
}
</style>