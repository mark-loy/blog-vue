<template>
  <div v-if="Object.keys(data).length !== 0">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="14" :md="12" :lg="12">
        <el-card class="box-card card-up">
          <!-- 头部区域 -->
          <div slot="header" class="clearfix">
            <!-- 标题 -->
            <span class="title">{{ title }}</span>
            <!-- 统计文章篇数 -->
            <span class="total"
              >共<span class="total-number">{{ data.length }}</span
              >{{ type === "cate" ? "类" : "种" }}</span
            >
          </div>
          <!-- 展示区域 -->
          <!-- 全部菜单项 -->
          <el-card shadow="always" :class="['cate-all', isActive(0)]">
            <span @click="tabNavBar(0)" class="cate-all-name">全部</span>
          </el-card>
          <!-- 具体菜单项列表 -->
          <div
            v-for="(item, index) in data"
            :key="item.id"
            @click="tabNavBar(item.id)"
            class="card-box"
          >
            <el-card shadow="always" :class="['cate-list', isActive(item.id)]">
              <span class="cate-name">{{
                type === "cate" ? item.cate_name : item.tag_name
              }}</span>
              <el-tag
                class="cate-count"
                :type="hotClass[index]"
                size="mini"
                effect="dark"
              >
                {{ item.article_count }}
              </el-tag>
            </el-card>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    type: {
      type: String
    },
    data: {
      type: Array
    },
  },
  data() {
    return {
      /* 导航样式 */
      hotClass: ["danger", "warning", "primary"],
      /* 当前选择的导航菜单项 */
      activeIndex: 0,
    };
  },
  mounted() {
    /* 监听分类菜单切换 */
    this.$bus.$on("tabNavBar", (id) => {
      this.tabNavBar(id);
    });
  },
  beforeDestroy() {
    // 在当前组件销毁之前，移除当次监听
    this.$bus.$off("tabNavBar");
  },
  methods: {
    /* 是否激活菜单项 */
    isActive(id) {
      return this.activeIndex === id ? "active-class" : "";
    },
    /* 切换导航栏 */
    tabNavBar(id) {
      // 设置当前选择的导航菜单项id
      this.activeIndex = id;
      // 通知父组件，设置查询数据，切换文章列表
      if (id === 0) {
        return this.$emit("findArticleById", "");
      }
      this.$emit("findArticleById", id);
    },
  },
};
</script>

<style scoped>
.card-box {
  display: inline-block;
}

.cate-all {
  display: inline-block;
  margin-left: 20px;
  margin-bottom: 10px;
  cursor: pointer;
}

.cate-all:hover .cate-all-name {
  color: skyblue;
}

.cate-all:hover {
  transform: scale(1.04);
}

.cate-all-name {
  font-size: 14px;
  font-weight: 600;
  color: #242424;
}

.cate-list {
  display: inline-block;
  margin-left: 14px;
  margin-bottom: 10px;
  cursor: pointer;
}

.cate-list:hover {
  transform: scale(1.04);
}

.cate-count {
  float: right;
  margin-left: 20px;
}

.cate-list:hover .cate-name {
  color: skyblue;
}

.cate-name {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: #242424;
}

.active-class {
  background-color: antiquewhite;
}
</style>