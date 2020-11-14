<template>
  <!-- 首页文章展示区域 -->
  <div class="article" v-if="Object.keys(info).length !== 0">
    <div @click="toArticleDetail(info.article.id)" :class="animate">
      <el-card shadow="hover">
        <!-- 标题 -->
        <h2>
          {{ info.article.title }}
        </h2>
        <!-- 其他信息 -->
        <p class="other-info">
          <!-- 头像 用户名 -->
          <span>
            <i class="iconfont icon-yonghu1"></i>
            {{ info.user.petName }}
          </span>
          <!-- 发表时间 -->
          <span>
            <i class="iconfont icon-shizhong"></i>
            {{ info.article.gmt_create | dateFormat("yyyy-MM-dd") }}
          </span>
          <!-- 浏览数 -->
          <span>
            <i class="iconfont icon-liulan"></i>
            {{ info.article.view_count }}
          </span>
          <!-- 点赞数 -->
          <span>
            <i class="iconfont icon-dianzan1"></i>
            {{ info.article.like_count }}
          </span>
        </p>

        <div class="tag-box">
          <!-- 分类 -->
          <el-tag class="cate-item" size="mini" @click.stop="toCategory(info.category.id)">
            <i class="iconfont icon-leimupinleifenleileibie2"></i>
            {{ info.category.cate_name }}
          </el-tag>
          <!-- 标签信息 -->
          <el-tag
            v-for="tag in info.tag"
            :key="tag.id"
            size="mini"
            class="tag-item"
            type="success"
            @click.stop="toTag(tag.id)"
          >
            <i class="iconfont icon-biaoqian1"></i>
            {{ tag.tag_name }}
          </el-tag>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: {},
    },
    data() {
      return {
        animate: "",
      };
    },
  },
  created() {
    /* 判断路由，根据路由显示动画效果 */
    console.log();
    if (this.$route.path === "/home") {
      this.animate = "animate__animated animate__bounceInLeft";
    } else {
      this.animate = "animate__animated animate__bounceInUp";
    }
  },
  methods: {
    /* 跳转到文章详情页面 */
    toArticleDetail(id) {
      this.$router.push("/article/" + id);
    },
    /* 路由到分类组件 */
    toCategory(cateId) {
      this.$router.push("/category");
      setTimeout(() => {
        this.$bus.$emit("tabNavBar", cateId);
      }, 100);
    },
    /* 路由跳转到标签页面 */
    toTag(tagId) {
      // 路由跳转
      this.$router.push("/tag");
      // 通过事件总线，发射事件
      setTimeout(() => {
        this.$bus.$emit("tabNavBar", tagId);
      }, 100);
    },
  },
};
</script>

<style scoped>
.article {
  cursor: pointer;
  padding: 0 0 15px;
}

h2 {
  display: inline;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  color: #242424;
}

h2:hover {
  color: #3eaf7c;
}

.decription {
  margin: 15px 0;
}

.other-info {
  margin: 15px 0;
  color: #7f7f77;
}

.other-info span {
  font-size: 14px;
  margin-right: 6px;
}

.other-info span i {
  margin-right: 2px;
}

.el-tag {
  float: left;
}

i {
  font-size: 14px;
}

.tag-box {
  float: left;
  margin-bottom: 5px;
}

.tag-box .el-tag {
  font-size: 13px;
}

.cate-item {
  margin-right: 8px;
}

.tag-item {
  margin: 0 6px 10px;
}
</style>