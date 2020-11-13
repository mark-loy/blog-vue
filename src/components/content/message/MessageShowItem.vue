<template>
  <!-- 留言单个展示组件 -->
  <div v-if="Object.keys(message).length !== 0">
    <!-- 左侧留言人头像 -->
    <el-avatar
      class="visitor-avatar"
      shape="square"
      size="large"
      :src="message.visitor.avatar_url"
    ></el-avatar>

    <!-- 右侧用户名、留言内容等信息 -->
    <div :class="isShowPC ? 'message-body' : 'app-message-body'">
      <!-- 用户名等 -->
      <div class="visitor-box">
        <span class="visitor-name"> {{ message.visitor.visitor_name }} </span>
        <span class="visitor-other"
          >来源：{{ source(message.visitor.source) }}</span
        >
      </div>

      <!-- 发表时间等 -->
      <div class="message-other-box">
        <span class="message-time">
          {{ message.message.gmt_create | dateFormat("yyyy-MM-dd hh:ss") }}
        </span>
        <el-button
          @click="showMessageTextarea"
          class="messgage-answer"
          size="mini"
          >回复</el-button
        >
      </div>
      <!-- 留言编辑 -->
      <div class="messageTextarea" v-show="isMessageTextarea">
        <MessageTextarea
          :row="4"
          :height="150"
          :type="2"
          :parentId="messageId"
          :messageName="message.visitor.visitor_name"
          @displayMessage="showMessageTextarea"
        >
        </MessageTextarea>
      </div>

    </div>
    
      <!-- 留言内容信息 -->
      <div class="message-content">
        <mavon-editor
          v-model="message.message.content"
          :subfield="false"
          defaultOpen="preview"
          :toolbarsFlag="false"
          :editable="false"
          :scrollStyle="true"
          codeStyle="gruvbox-dark"
        ></mavon-editor>
      </div>
  </div>
</template>

<script>
import MessageTextarea from "./MessageTextarea";

export default {
  components: {
    MessageTextarea,
  },
  props: {
    /* 留言数据源 */
    message: {
      type: Object,
    },
    /* 控制PC、移动端显示 */
    isShowPC: {
      type: Boolean,
      default: true,
    },
    /* 留言父级id */
    messageId: {
      type: Number,
    },
    /* 父级留言人名称 */
    messageName: {
      type: String,
    },
  },
  data() {
    return {
      isMessageTextarea: false,
    };
  },
  computed: {
    source() {
      return function (source) {
        return source === 1 ? "Github" : "QQ";
      };
    },
  },
  methods: {
    showMessageTextarea() {
      this.isMessageTextarea = !this.isMessageTextarea;
    },
  },
};
</script>

<style scoped>
.visitor-avatar {
  float: left;
  margin-right: 13px;
}

.message-body {
  float: left;
  width: 88%;
  display: block;
}

/* 移动端显示 */
.app-message-body {
  float: left;
  width: 82%;
  display: block;
}

.visitor-box {
  display: block;
  margin-bottom: 13px;
}

.visitor-box span {
  margin-right: 15px;
}

.visitor-name {
  color: #3eaf7c;
  font-size: 13px;
  font-weight: 600;
}

.visitor-other {
  color: #242424;
  background: rgba(27, 31, 35, 0.05);
  font-size: 11px;
  padding: 3px 7px;
  border-radius: 5px;
}

.message-time {
  color: #b3b3b3;
  font-size: 9px;
}

.messgage-answer {
  float: right;
  padding: 3px 6px;
}

.messageTextarea {
  margin-top: 15px;
}

.message-content {
  margin-bottom: 10px;
  margin-top: 20px;
  margin-left: 50px;
  border-radius: 5px;
}



</style>