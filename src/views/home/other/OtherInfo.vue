<template>
  <!-- 判断otherinfo中是否存在数据， -->
  <div class="other-info" v-if="Object.keys(otherInfo).length !== 0">

    <!-- 个人信息区域 -->
    <div class="user-info">
      <!-- 头像 -->
      <el-avatar :size="80" :src="otherInfo.user.avatar"></el-avatar>
      <!-- 用户名 -->
      <p class="username">{{ otherInfo.user.petName }}</p>
      <!-- 分类、标签统计 -->
      <div class="cate-tag">
        <!-- 左侧分类 -->
        <div class="cate-total-count">
          <h3>{{ otherInfo.countCate }}</h3>
          <h6>分类</h6>
        </div>
        <!-- 右侧标签 -->
        <div>
          <h3>{{ otherInfo.countTag }}</h3>
          <h6>标签</h6>
        </div>
      </div>
    </div>

    <!-- 分类区域 -->
    <div class="cate-info">
      <!-- icon标题 -->
      <p class="title-icon">
        <i class="iconfont icon-leimupinleifenleileibie2"></i>
        分类
        <!-- 更多分类icon -->
        <a href="#"><i class="el-icon-arrow-right more-icon"></i></a>
      </p>
      <!-- 分类列表 -->
      <el-card
        v-for="(cate, index) in otherInfo.cateTop"
        :key="cate.id"
        shadow="always"
        class="cate-list"
      >
        <span class="cate-name">{{ cate.categoryName }}</span>
        <el-tag class="cate-count" :type="hotCateClass[index]" size="mini" effect="dark">
          {{ cate.articleCount }}
        </el-tag>
      </el-card>
    </div>

    <!-- 标签区域 -->
    <div class="tag-info">
      <!-- icon标题 -->
      <p class="title-icon">
        <i class="iconfont icon-biaoqian"></i>
        标签
        <!-- 更多标签icon -->
        <a href="#"><i class="el-icon-arrow-right more-icon"></i></a>
      </p>
      <!-- 标签列表 -->
      <a href="#" v-for="tag in otherInfo.tagTop" :key="tag.id">
        <el-tag class="tag-list" size="mini" type="danger" effect="plain">
          {{ tag.tagName }}
        </el-tag>
      </a>
    </div>

    <!-- 友情链接区域 -->
    <div>
      <!-- icon标题 -->
      <p class="title-icon">
        <i class="iconfont icon-youqinglianjie"></i>
        友情链接
      </p>
      <p>
        <el-link type="primary">去外面看看</el-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "OtherInfo",
  props: {
    otherInfo: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      /* 分类样式 */
      hotCateClass: ['danger', 'warning', 'primary'],
      /* 标签样式 */
      hotTagClass: ['danger', 'warning', 'primary', 'success']
    };
  },
};
</script>

<style scoped>
.user-info {
  padding: 20px 0;
  border-bottom: solid 1px #eaecef;
  text-align: center;
}

.el-avatar {
  margin-top: 15px;
}

.username {
  margin-top: 10px;
  font-size: 12px;
  font-weight: 600;
}

.cate-tag {
  margin-top: 20px;
  display: flex;
}

.cate-tag div {
  flex: 1;
}

.cate-total-count {
  border-right: solid 1px #333;
}

.cate-tag div h3 {
  color: #242424;
  font-weight: 550;
  font-size: 15px;
}

.cate-tag div h6 {
  margin-top: 10px;
  font-size: 12px;
  font-weight: 500;
  color: #24242491;
}

.cate-info {
  border-bottom: solid 1px #eaecef;
}

.title-icon {
  padding: 20px 0;
  color: #242424b8;
}

.el-card:hover {
  transform: scale(1.04);
}

.cate-list {
  margin-bottom: 12px;
  cursor: pointer;
}

.cate-list:hover .cate-name {
  color: skyblue;
}

.cate-name {
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  color: #242424;
}

.cate-count {
  float: right;
  font-weight: 600;
}

.more-icon {
  float: right;
}

.tag-list {
  margin: 4px 4px;
  font-weight: 600;
}

.tag-list:hover {
  transform: scale(1.04);
}
</style>