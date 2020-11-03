<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="15" :md="14" :lg="13" :xl="12">
        <!-- 头部区域 -->
        <div class="content-bd">
          <!-- 标题 -->
          <h1 class="article-title">{{ articleData.title }}</h1>
          <!-- 其他信息 -->
          <ul class="ul-info">
            <!-- 用户信息(可链接) -->
            <li><i class="iconfont icon-yonghu"></i> {{ user.pet_name }}</li>
            <!-- 创建时间 -->
            <li>
              <i class="iconfont icon-shijian-xian"></i>
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
        <div class="article-content" ref="artContent">
          <mavon-editor
            v-model="articleData.context"
            :subfield="false"
            defaultOpen="preview"
            :toolbarsFlag="false"
            :editable="false"
            :scrollStyle="true"
            codeStyle="gruvbox-dark"
          ></mavon-editor>
        </div>

        <!-- 点赞区域 -->
        <div class="article-dianzan">
          <!-- 点赞按钮 -->
          <el-button v-if="isGivelike" @click="giveLike(1)">
            <i class="iconfont icon-dianzan" style="font-size: 20px"></i>
          </el-button>
          <!-- 取消点赞按钮 -->
          <el-button v-else @click="giveLike(0)" type="primary">
            <i class="iconfont icon-dianzan" style="font-size: 20px"></i>
          </el-button>
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

    <!-- 移动端目录 -->
    <el-row class="app-menu">
      <el-col :span="2">
        <el-popover placement="left" width="180" trigger="click">
          <ul class="js-toc"></ul>
          <el-button type="primary" size="mini" slot="reference"
            >目录</el-button
          >
        </el-popover>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { request } from "plugins/network";

/* 导入富文本编辑器 */
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

/* 目录生成css */
import tocbot from "tocbot";

export default {
  components: {
    mavonEditor,
  },
  data() {
    return {
      articleData: {},
      user: {},
      cate: {},
      tags: [],
      /* 控制点赞按钮的显示、隐藏 */
      isGivelike: true,
    };
  },
  created() {
    // 获取文章详情数据源
    this.getArticleDetail(this.$route.params.id);
    // 获取文章是否点赞
    this.getIsLike(this.$route.params.id);
  },
  mounted() {
    setTimeout(() => {
      this.addMao();
      tocbot.init({
        tocSelector: ".js-toc", //要把目录添加元素位置，支持选择器
        contentSelector: ".js-toc-content", //获取html的元素
        headingSelector: "h1, h2, h3", //要显示的id的目录
        hasInnerContainers: true,
      });
    }, 300);
  },
  methods: {
    /* 获取文章详情数据源 */
    getArticleDetail(id) {
      request({
        method: "get",
        url: "/home/article/" + id,
      }).then((res) => {
        // 错误提示信息
        if (res.code !== 200) return this.$message.error(res.msg);
        // 设置数据源
        this.articleData = res.data.article;
        this.user = res.data.user;
        this.cate = res.data.cate;
        this.tags = res.data.tags;
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
        const articleId = this.$route.params.id
        request({
          method: "put",
          url: "/home/like/article",
          data: {
            type: type,
            visitorId: visitor_id,
            articleId: articleId,
          },
        }).then(res => {
          if (res.code !== 200) return this.$message.error(res.message)
          // 重新获取文章是否已点赞
          this.getIsLike(articleId)
          // 刷新页面数据
          this.getArticleDetail(articleId)
        });
      } else {
        this.$message.error("登录后点赞");
      }
    },
    /* 给自动生成目录的h标签，添加id */
    addMao() {
      // 获取内容中的所有子节点
      let parentNodes = this.$refs.artContent.children[0].children[1]
        .children[1].children[0];
      if (parentNodes.className !== null) {
        parentNodes.className = parentNodes.className + " js-toc-content";
      }
      const nodes = parentNodes.children;
      if (nodes.length) {
        // 定义匹配H类标签的正则
        const reg = /^H[1-6]{1}$/;
        for (let i = 0; i < nodes.length; i++) {
          let node = nodes[i];
          // 匹配节点名是否是h1 ~ h6
          if (reg.exec(node.tagName)) {
            node.id = node.firstElementChild.id;
            node.firstElementChild.removeAttribute("id");
          }
        }
      }
    },
  },
};
</script>

<style scoped>
/* 引入自动生成目录的css */
@import "~assets/css/tocbot.css";

.content-bd {
  padding: 10px 10px;
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
  list-style: none;
}
.show-img {
  margin-top: 30px;
  text-align: center;
}
.show-img img {
  width: 100%;
}

.article-content {
  margin: 20px 5px;
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

.app-menu {
  position: fixed;
  right: 10px;
  bottom: 150px;
  z-index: 2000;
}

.app-menu .el-button {
  padding: 6px 5px !important;
}

.article-dianzan {
  display: block;
  width: 100%;
  text-align: center;
}
</style>