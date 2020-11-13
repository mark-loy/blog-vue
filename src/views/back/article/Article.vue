<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/back' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 添加文章按钮 -->
      <el-button @click="toAddArticle" type="success" size="mini"
        >添加文章</el-button
      >
      <!-- 文章表格 -->
      <el-table :data="articleData" stripe style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="article.title" label="标题"></el-table-column>
        <el-table-column width="100" label="分类">
          <template slot-scope="scope">
            <el-tag size="mini">
              <i class="iconfont icon-leimupinleifenleileibie2"></i>
              {{ scope.row.category.cate_name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="标签">
          <template slot-scope="scope">
            <el-tag
              class="blog-tag"
              type="warning"
              size="mini"
              v-for="tag in scope.row.tag"
              :key="tag.id"
            >
              <i class="iconfont icon-biaoqian"></i>
              {{ tag.tag_name }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="article.view_count"
          label="浏览数"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="article.like_count"
          label="点赞数"
          width="80"
        ></el-table-column>
        <el-table-column label="发表时间">
          <template slot-scope="scope">
            {{ scope.row.article.gmt_create | dateFormat("yyyy-MM-dd hh:ss") }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click="updateDialog(scope.row)"
              size="mini"
              type="primary"
            >
              编辑
            </el-button>
            <el-button
              @click="deleteArticle(scope.row.article)"
              size="mini"
              type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="articleSizeChange"
        @current-change="articleCurrentChange"
        :current-page="query.currentPage"
        :page-sizes="[5, 10, 30, 50]"
        :page-size="query.offset"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加文章对话框 -->
    <el-dialog
      title="修改文章"
      :visible.sync="updateArticleVisible"
      width="50%"
    >
      <!-- 表单区域 -->
      <el-form
        :model="articleForm"
        :rules="articleRules"
        ref="articleRef"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            @input="change"
            clearable
            v-model="articleForm.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select
            @input="change"
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
        <el-form-item label="标签" prop="tag">
          <el-select
            @input="change"
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
        <el-form-item label="展示图" prop="title">
          <el-image :src="articleForm.showImg" style="height: 400px"></el-image>
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
        </el-form-item>
        <el-form-item label="正文" prop="title">
          <!-- 文章内容添加区域 -->
          <mavon-editor
            v-model="articleForm.context"
            style="min-height: 500px"
          ></mavon-editor>
        </el-form-item>
      </el-form>

      <!-- 底部确认区 -->
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="updateArticleVisible = false"
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="setArticleData"
          >提 交</el-button
        >
      </span>
    </el-dialog>

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

import { imageUrl } from "../../../envParams";

export default {
  components: {
    mavonEditor,
  },
  data() {
    return {
      /* 文章列表数据源 */
      articleData: [],
      /* 文章列表查询条件 */
      query: {
        currentPage: 1,
        offset: 5,
        search: "",
      },
      /* 文章列表总数 */
      total: 0,
      /* 控制添加文章对话框是否显示 */
      updateArticleVisible: false,
      /* 修改文章表单 */
      articleForm: {},
      /* 修改文章表单验证 */
      articleRules: {},
      /* editor属性设置 */
      editorOption: {
        placeholder: "文章内容",
      },
      /* 图片上传地址 */
      imageURL: imageUrl,
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
  created() {
    // 调用文章列表数据
    this.getArticleData();
  },
  methods: {
    /* 获取文章列表数据 */
    getArticleData() {
      adminRequest({
        method: "get",
        url: "/back/article",
        params: {
          currentPage: this.query.currentPage,
          offset: this.query.offset,
          search: this.query.search,
        },
      }).then((res) => {
        // 提示错误信息
        if (res.code !== 200) return this.$message.error(res.message);
        // 获取成功
        this.articleData = res.data.articles;
        // 设置总记录数
        this.total = res.data.total;
      });
    },
    /* 保存修改的文章数据 */
    setArticleData() {
      this.$refs.articleRef.validate((valid) => {
        if (valid) {
          // 验证成功
          /* 处理文章表单字段 */
          let articleForm = this._.cloneDeep(this.articleForm);
          // 处理标签字段
          articleForm.tags = articleForm.tags.join(",");
          /* 发送数据请求 */
          adminRequest({
            method: "put",
            url: "/back/article",
            data: articleForm,
          }).then((res) => {
            if (res.code !== 200) return this.$message.error(res.message);
            this.$message.success("更新文章成功");
            // 刷新页面数据
            this.getArticleData();
            // 关闭对话框
            this.updateArticleVisible = false;
          });
        } else {
          this.$message.error("请将表单填写完整");
          return false;
        }
      });
    },
    /* 删除文章 */
    deleteArticle(article) {
      // 打开删除文章确认框
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击确认按钮，发送数据请求
          adminRequest({
            method: "delete",
            url: `/back/article/${article.id}`,
          }).then((res) => {
            if (res.code !== 200) return this.$message.error(res.message);
            this.$message.success("删除成功");
            // 刷新页面数据
            this.getArticleData();
          });
        })
        .catch(() => {});
    },
    /* 保存修改文章的数据 */
    updateArticle() {},
    /* 路由到添加文章表单 */
    toAddArticle() {
      this.$router.push("/back/article/add");
    },
    /* 打开修改文章对话框 */
    updateDialog(articleData) {
      console.log(articleData);
      // 设置当前编辑对象的原有值
      this.articleForm.id = articleData.article.id;
      this.articleForm.title = articleData.article.title;
      this.articleForm.description = articleData.article.description;
      this.articleForm.categoryId = articleData.category.id;
      this.articleForm.tags = [];
      articleData.tag.forEach((element) => {
        this.articleForm.tags.push(element.id);
      });
      this.articleForm.context = articleData.article.context;
      this.articleForm.showImg = articleData.article.showImg;
      console.log(this.articleForm.showImg);
      // 获取分类数据
      this.getCategoryData();
      // 获取标签数据
      this.getTagData();
      // 打开对话框
      this.updateArticleVisible = true;
    },
    /* 对于设置默认值的表单组件，需要强制刷新 */
    change() {
      this.$forceUpdate();
    },
    /* 分页组件当页显示数改变 */
    articleSizeChange(val) {
      this.query.offset = val;
      // 刷新页面数据
      this.getArticleData();
    },
    /* 分页组件当前页改变 */
    articleCurrentChange(val) {
      this.query.currentPage = val;
      // 刷新页面数据
      this.getArticleData();
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
        if (res.code !== 200) return this.$message.error("移除图片失败");
        // 成功
        this.$message.success("移除图片成功");
      });
    },
  },
};
</script>

<style scoped>
.iconfont {
  font-size: 14px;
}

.blog-tag {
  margin: 3px 6px;
}
</style>