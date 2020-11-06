<template>
  <!-- 编辑留言组件 -->
  <div>
    <!-- 编写留言行 -->
    <el-row :gutter="20" type="flex" justify="center">
      <el-col class="message-col">
        <!-- 留言区域 -->
        <div class="message-div" :style="{ 'min-height': height + 'px' }">
          <!-- 输入文本区域 -->
          <el-input
            maxlength="120"
            show-word-limit
            type="textarea"
            v-model="content"
            :placeholder="textPlaceholder"
            :clearable="true"
            :rows="row"
            resize="none"
          >
          </el-input>

          <!-- 其他选项区域 -->
          <div class="select-btn">
            <ul>
              <li>
                <el-popover
                  v-model="isShowPicker"
                  placement="bottom"
                  width="330"
                  trigger="manual"
                >
                  <VEmojiPicker :pack="pack" @select="selectEmoji" />
                  <i
                    title="表情"
                    slot="reference"
                    @click="showdownclick"
                    :class="[
                      'iconfont icon-huaihuaibiaoqing',
                      isShowdown ? 'click-color' : '',
                    ]"
                  ></i>
                </el-popover>
              </li>
            </ul>
            <p class="submit-btn">
              <el-button @click="submitMessage(type, parentId)" size="mini"
                >提交</el-button
              >
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* 导入表情组件 */
import { VEmojiPicker, emojisDefault } from "v-emoji-picker";

/* 导入富文本编辑器 */
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

import { request } from "plugins/network";

export default {
  components: {
    VEmojiPicker,
    mavonEditor,
  },
  props: {
    /* 整合留言区域的高度 */
    height: {
      type: Number,
      default: 200,
    },
    /* textarea高度 */
    row: {
      type: Number,
      default: 6,
    },
    /* 设置当前留言的级别, 1.一级留言；2.二级留言 */
    type: {
      type: Number,
      default: 1,
    },
    /* 设置父级留言id */
    parentId: {
      type: Number,
      default: 0,
    },
    /* 父级留言人名称 */
    messageName: {
      type: String,
    },
  },
  data() {
    return {
      /* 编辑的内容 */
      content: "",
      /* 控制表情按钮的点击颜色切换 */
      isShowdown: false,
      /* 控制选择表情后，隐藏界面 */
      isShowPicker: false,
      /* 默认表情json数据 */
      pack: emojisDefault,
    };
  },
  computed: {
    textPlaceholder() {
      return this.messageName === undefined
        ? "留言吧..."
        : "@" + this.messageName;
    },
  },
  methods: {
    /* 提交留言 */
    submitMessage(type, parentId) {
      const message = this.content;
      // 判断留言内容是否为空
      if (message.trim() === "") {
        return this.$message.error("留言不能为空！");
      }
      const visitor_token = window.sessionStorage.getItem("visitor-token");
      // 判断是否登录
      if (visitor_token === null || visitor_token === "") {
        return this.$message.error("登录后留言！");
      }
      const visitorId = window.sessionStorage.getItem("visitor-id");
      // 拼接留言内容
      const contentPer =
        this.messageName === undefined
          ? ""
          : '<span style="font-weight: 700; color: #3eaf7c">@' +
            this.messageName +
            "</span> ";

      // 发送数据请求，添加留言
      request({
        method: "post",
        url: "/save/message",
        data: {
          parentId: parentId, // 留言父级id
          type: type, // 一级留言
          visitorId: visitorId, //留言访客id
          content: contentPer + this.content, // 留言内容
        },
      }).then((res) => {
        console.log(res);
        if (res.code !== 200) return this.$message.eroor("留言失败");
        this.$message.success("留言成功");
        // 清空文本域
        this.content = "";
        // 判断是否为子留言
        if (type === 2) {
          // 发送隐藏留言编辑区域事件
          this.$emit("displayMessage");
        }
        // 刷新留言数据
        this.$bus.$emit("refreshMessage");
      });
    },
    /* 切换表情按钮颜色 */
    showdownclick() {
      this.isShowdown = !this.isShowdown;
      this.isShowPicker = true;
    },
    selectEmoji(emoji) {
      this.content = this.content + emoji.data;
      /* 隐藏表情界面 */
      this.isShowPicker = false;
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 16px;
}

.message-col {
  max-width: 715px;
}

.message-div {
  border: 1px solid #eaecef;
  border-radius: 5px;
  background-color: rgba(27, 31, 35, 0.05);
}

.select-btn {
  margin-top: 14px;
}
.select-btn li {
  float: left;
  margin: 0 6px;
  list-style: none;
}

.select-btn li i {
  color: #242424;
  font-size: 20px;
  cursor: pointer;
}

.submit-btn {
  float: right;
  margin-right: 6px;
}

.el-button--mini {
  padding: 5px 10px;
}
</style>