<template>
  <!-- 留言展示组件 -->
  <div>
    <!-- 展示留言行 -->
    <el-row type="flex" justify="center">
      <!-- PC留言展示列 -->
      <el-col :xs="0" class="message-col">
        <div class="show-message-box">
          <!-- 总留言数 -->
          <h2 class="total-message">
            <span>{{ total }}</span> 条留言
          </h2>

          <!-- 留言信息 -->
          <div
            v-for="message in messages"
            :key="message.id"
            class="message-info clear-fix"
          >
            <!-- 一级留言 -->
            <MessageShowItem :message="message"> </MessageShowItem>

            <div
              v-for="childMessage in message.child_messages"
              :key="childMessage.id"
              class="child-message-info clear-fix"
            >
              <!-- 二级留言 -->
              <MessageShowItem :message="childMessage" > </MessageShowItem>
            </div>
          </div>
        </div>
      </el-col>

      <!-- 移动端留言展示 -->
      <el-col :xs="24" :sm="0" class="message-col">
        <div class="show-message-box">
          <!-- 总留言数 -->
          <h2 class="total-message">
            <span>{{ total }}</span> 条留言
          </h2>
          <!-- 留言信息 -->
          <div
            v-for="message in messages"
            :key="message.id"
            class="message-info clear-fix"
          >
            <!-- 一级留言 -->
            <MessageShowItem :message="message" :isShowPC="false"> </MessageShowItem>

            <div
              v-for="childMessage in message.child_messages"
              :key="childMessage.id"
              class="child-message-info clear-fix"
            >
              <!-- 二级留言 -->
              <MessageShowItem :message="childMessage" :isShowPC="false"> </MessageShowItem>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* 引入留言编辑组件 */
import MessageTextarea from "./MessageTextarea";
/* 引入单个留言展示组件 */
import MessageShowItem from "./MessageShowItem";

export default {
  components: {
    MessageTextarea,
    MessageShowItem,
  },
  props: {
    total: {
      type: Number,
    },
    messages: {
      type: Array,
    },
  },
  data() {
    return {
      /* 控制二级留言编辑区域的显示、隐藏 */
      isShowMessageEdit: false,
    };
  },
  methods: {
    /* 展示留言编辑 */
    showMessageTextarea() {
      this.isShowMessageEdit = !this.isShowMessageEdit;
    },
  },
};
</script>

<style scoped>
.message-col {
  width: 700px;
}

.total-message span {
  font-size: 17px;
  font-weight: 600;
}

.message-info {
  margin-top: 25px;
}

.child-message-info {
  margin-left: 52px;
}

</style>