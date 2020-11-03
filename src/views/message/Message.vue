<template>
  <!-- 留言 -->
  <div class="message">
    <!-- 引用留言编辑组件 -->
    <MessageTextarea></MessageTextarea>
    <!-- 引用留言展示组件 -->
    <MessageShow :messages="messages" :total="total"> </MessageShow>
    <!-- 加载更多 -->
    <p v-if="total >= query.offset" class="loading-more">
      <el-button @click="messageLoding" :disabled="isLoadingMore" size="mini"
        >加载更多...</el-button
      >
    </p>
  </div>
</template>

<script>
import MessageTextarea from "components/content/message/MessageTextarea";
import MessageShow from "components/content/message/MessageShow";

import { request } from "plugins/network";

export default {
  components: {
    MessageTextarea,
    MessageShow,
  },
  data() {
    return {
      /* 留言数据源 */
      messages: [],
      /* 留言总数 */
      total: 0,
      /* 留言分页条件 */
      query: {
        currentPage: 1, // 当前页
        offset: 10, // 一级留言数
      },
      /* 控制加载更多按钮禁用 */
      isLoadingMore: false,
    };
  },
  created() {
    // 获取留言展示信息
    this.getMessage(2);
  },
  mounted() {
    this.$bus.$on("refreshMessage", () => {
      this.getMessage(2);
    });
  },
  methods: {
    /* 获取留言数据源 */
    getMessage(type) {
      request({
        method: "get",
        url: "/find/message",
        params: {
          currentPage: this.query.currentPage,
          offset: this.query.offset,
        },
      }).then((res) => {
        // 请求失败，提示信息
        if (res.code !== 200) return this.$message.error("获取留言信息失败");
        // 判断数据加载的方式
        // 1.加载更多
        // 2.提交后对数据进行刷新
        if (type === 1) {
          // 设置数据源
          const messages = res.data.messages;
          // 判断请求的数据源是否为空
          if (messages.length === 0) {
            this.isLoadingMore = true;
            return this.$message.warning("没有更多数据啦");
          }
          messages.forEach((element) => {
            this.messages.push(element);
          });
        } else {
          this.messages = res.data.messages
        }

        this.total = res.data.total;
      });
    },
    /* 加载更多留言 */
    messageLoding() {
      this.query.currentPage += this.query.currentPage;
      // 刷新数据
      this.getMessage(1);
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 16px;
}

.message {
  margin-top: 20px;
}

.loading-more {
  text-align: center;
  margin-top: 30px;
}
</style>