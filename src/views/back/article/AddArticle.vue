<template>
  <!-- 添加文章 -->
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/back' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 文章卡片区域 -->
    <el-card>
      <!-- 步骤条 -->
      <el-steps
        :space="200"
        :active="currentActive - 0"
        align-center
        finish-status="success"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="展示图"></el-step>
        <el-step title="正文"></el-step>
      </el-steps>

      <!-- 表单 -->
      <el-form
        :model="articleForm"
        :rules="articleRules"
        ref="articleRef"
        label-width="100px"
        label-position="top"
      >
        <!-- 标签页 -->
        <el-tabs
          v-model="currentActive"
          :before-leave="tabs_click"
          tab-position="left"
          style="width: 60%"
        >
          <el-tab-pane name="0" label="基本信息">
            <!-- 表单字段 -->
            <!-- 标题 -->
            <el-form-item label="标题" prop="title">
              <el-input clearable v-model="articleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input
                show-word-limit
                clearable
                v-model="articleForm.description"
              ></el-input>
            </el-form-item>
            <!-- 分类 -->
            <el-form-item label="分类" prop="categoryId">
              <el-select
                clearable
                v-model="articleForm.categoryId"
                placeholder="请选择"
              >
                <el-option
                  v-for="category in categoryData"
                  :key="category.id"
                  :label="category.cate_name"
                  :value="category.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 标签 -->
            <el-form-item label="标签" prop="tags">
              <el-select
                v-model="articleForm.tags"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="tag in tagsData"
                  :key="tag.id"
                  :label="tag.tag_name"
                  :value="tag.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="1" label="展示图"> </el-tab-pane>
          <el-tab-pane name="2" label="正文">
            <el-form-item label="文章内容" prop="context">
              <!-- 文章内容添加区域 -->
              <quill-editor
                v-model="articleForm.context"
                ref="myQuillEditor"
                :options="editorOption"
              >
              </quill-editor>
            </el-form-item>

            <!-- 提交添加文章表单 -->
            <el-button @click="addArticle" size="mini" type="primary">
              提交
            </el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { adminRequest } from "plugins/network";

export default {
  data() {
    return {
      /* 添加文章表单 */
      articleForm: {},
      /* 文章表单验证规则 */
      articleRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" },
        ],
        categoryId: [{ required: true, message: "请选择分类", trigger: "blur" }],
        tags: [{ required: true, message: "请选择标签", trigger: "blur" }],
        context: [{ required: true, message: "请输入文章内容", trigger: "blur" }],
      },
      /* 控制步骤条与标签页的同步切换 */
      currentActive: 0,
      /* 分类数据源 */
      categoryData: [],
      /* 标签数据源 */
      tagsData: [],
      /* editor的参数设置 */
      editorOption: {
        placeholder: "文章内容",
      },
    };
  },
  created() {
    this.getCategoryData();
    this.getTagData();
  },
  methods: {
    /* 提交文章 */
    addArticle() {
      // 验证表单数据
      this.$refs.articleRef.validate((valid) => {
        if (valid) {
          // 验证成功
          /* 处理文章表单字段 */
          let articleForm = this._.cloneDeep(this.articleForm);
          // 处理标签字段
          articleForm.tags = articleForm.tags.join(",");
          // 添加文章发表者，即登录系统的adminId
          articleForm.userId = this.$store.state.adminUser.id;
          /* 发送数据请求 */
          adminRequest({
            method: "post",
            url: "/back//article",
            data: articleForm,
          }).then((res) => {
            if (res.code !== 200) return this.$message.error(res.message);
            this.$message.success("发表文章成功");
            // 路由到文章列表页面
            this.$router.replace("/back/article");
          });
        } else {
          this.$message.error("请将表单填写完整");
          return false;
        }
      });
    },
    /* 获取分类数据 */
    getCategoryData() {
      adminRequest({
        method: "get",
        url: "/back/category",
      }).then((res) => {
        this.categoryData = res.data.category;
      });
    },
    /* 获取标签数据 */
    getTagData() {
      adminRequest({
        method: "get",
        url: "/back/tags",
      }).then((res) => {
        console.log(res);
        this.tagsData = res.data.tags;
      });
    },
    /* 标签页切换时，回调事件 */
    tabs_click(activeName, oldActiveName) {
      // 判断基本信息是否填写完整
      if (oldActiveName === "0") {
        if (
          this.articleForm.title === undefined ||
          this.articleForm.description === undefined ||
          this.articleForm.categoryId === undefined ||
          this.articleForm.tags.length === 0
        ) {
          this.$message.error("请将基本信息填写完整");
          return false;
        }

        if (
          this.articleForm.title.trim() === "" ||
          this.articleForm.description.trim() === ""
        ) {
          this.$message.error("请将基本信息填写完整");
          return false;
        }
      }
    },
  },
};
</script>

<style scoped>
.el-card {
  padding: 10px 0 20px;
}

.el-steps {
  margin: 20px 0;
}

.quill-editor {
  margin-bottom: 90px;
  height: 450px;
}
</style>