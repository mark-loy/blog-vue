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
          style="width: 70%"
        >
          <el-tab-pane name="0" label="基本信息">
            <!-- 表单字段 -->
            <!-- 标题 -->
            <el-form-item label="标题" prop="title">
              <el-input clearable v-model="articleForm.title"></el-input>
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
          <el-tab-pane name="1" label="展示图">
            <el-upload
              :action="imageURL"
              :headers="imageHeader"
              :on-success="handleSuccess"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane name="2" label="正文">
            <el-form-item label="文章内容" prop="context">
              <!-- 文章内容添加区域 -->
              <mavon-editor
                v-model="articleForm.context"
                @imgAdd="$imgAdd"
                @imgDel="$imgDel"
                ref="md"
                style="min-height: 500px; margin: 0 10px"
              ></mavon-editor>
            </el-form-item>

            <!-- 提交添加文章表单 -->
            <el-button
              @click="addArticle"
              size="mini"
              type="primary"
              style="margin-left: 10px"
            >
              提交
            </el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="imagePreviewDialog" width="50%">
      <el-image :src="imagePreView" style="width: 100%"></el-image>
    </el-dialog>
  </div>
</template>

<script>
import { adminRequest } from "plugins/network";

import { categoryMixin, tagMixin } from "common/mixin";

/* 导入富文本编辑器 */
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  components: {
    mavonEditor,
  },
  data() {
    return {
      /* 添加文章表单 */
      articleForm: {},
      /* 文章表单验证规则 */
      articleRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        categoryId: [
          { required: true, message: "请选择分类", trigger: "blur" },
        ],
        tags: [{ required: true, message: "请选择标签", trigger: "blur" }],
        context: [
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
      },
      /* 控制步骤条与标签页的同步切换 */
      currentActive: 0,
      /* mavon-editor编辑器设置 */
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
      },
      /* 图片上传地址 */
      imageURL: "http://192.168.1.4:8888/back/file/upload",
      /* 图片上传请求头 */
      imageHeader: {
        Authorization: window.sessionStorage.getItem("admin-token"),
      },
      /* 控制图片预览对话框显示、隐藏 */
      imagePreviewDialog: false,
      /* 图片预览路径 */
      imagePreView: "",
    };
  },
  mixins: [categoryMixin, tagMixin],
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
    /* 标签页切换时，回调事件 */
    tabs_click(activeName, oldActiveName) {
      // 判断基本信息是否填写完整
      if (oldActiveName === "0") {
        if (
          this.articleForm.title === undefined ||
          this.articleForm.categoryId === undefined ||
          this.articleForm.tags.length === 0
        ) {
          this.$message.error("请将基本信息填写完整");
          return false;
        }

        if (this.articleForm.title.trim() === "") {
          this.$message.error("请将基本信息填写完整");
          return false;
        }
      }
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果(转化成了HTML格式）
      this.articleForm.context = render;
    },
    /* 文件上传成功 */
    handleSuccess(response) {
      if (response.code !== 200) return this.$message.error("图片上传失败！");
      // 成功
      this.$message.success("图片上传成功！");
      // 设置表单展示图属性
      this.articleForm.showImg = response.data.url;
    },
    /* 上传文件预览 */
    handlePreview(file) {
      console.log(file);
      // 打开图片预览对话框
      this.imagePreviewDialog = true;
      // 设置url
      this.imagePreView = file.response.data.url;
    },
    /* 移除上传的文件 */
    handleRemove(file) {
      // 获取文件名
      const fileName = file.response.data.fileName;
      // 发送请求
      adminRequest({
        method: "delete",
        url: `/back/file/delete/${fileName}`,
      }).then((res) => {
        console.log(res);
        if (res.code !== 200) return this.$message.error("移除图片失败");
        // 成功
        this.$message.success("移除图片成功");
      });
    },
    /* mavon编辑器 图片上传 */
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      adminRequest({
        url: "/back/file/upload",
        method: "post",
        data: formdata,
        headers: { 
          'Content-Type': 'multipart/form-data;boundary=' + new Date().getTime(),
          "Authorization": window.sessionStorage.getItem("admin-token")
         },
      }).then((response) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs.md.$img2Url(pos, response.data.url);
      });
    },
    /* mavon编辑器 移除上传的图片 */
    $imgDel() {

    }
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