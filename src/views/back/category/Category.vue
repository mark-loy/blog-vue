<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/back' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 分类卡片区域 -->
    <el-card>
      <el-button @click="showAddCategoryDialog" type="success" size="mini"
        >添加分类</el-button
      >

      <!-- 分类table -->
      <el-table :data="categoryData" stripe style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="cate_name" label="分类名"> </el-table-column>
        <el-table-column prop="article_count" label="文章数量">
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.gmt_create | dateFormat("yyyy-MM-dd hh:ss") }}
          </template>
        </el-table-column>
        <el-table-column label="修改时间">
          <template slot-scope="scope">
            {{ scope.row.gmt_modified | dateFormat("yyyy-MM-dd hh:ss") }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click="showUpdateDialog(scope.row)"
              size="mini"
              type="primary"
              >编辑</el-button
            >
            <el-button
              @click="deleteCategory(scope.row)"
              size="mini"
              type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="addCategoryDialog" width="50%">
      <el-form
        :model="addCategoryForm"
        :rules="addCategoryRules"
        ref="addCategoryRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cateName">
          <el-input v-model="addCategoryForm.cateName"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="closeAddCategoryDialog">取 消</el-button>
        <el-button type="primary" @click="commitAddCategory">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改分类对话框 -->
    <el-dialog
      title="修改分类"
      :visible.sync="updateCategoryDialog"
      width="50%"
    >
      <el-form
        :model="updateCategoryForm"
        :rules="updateCategoryRules"
        ref="updateCategoryRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cateName">
          <el-input v-model="updateCategoryForm.cateName"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="closeUpdateCategoryDialog">取 消</el-button>
        <el-button type="primary" @click="commitUpdateCategory"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { adminRequest } from "plugins/network";

import { categoryMixin } from "common/mixin";

export default {
  mixins: [categoryMixin],
  data() {
    return {
      /* 控制添加分类对话框的显示、隐藏 */
      addCategoryDialog: false,
      /* 添加分类表单 */
      addCategoryForm: {
        cateName: "",
      },
      /* 添加分类表单验证规则 */
      addCategoryRules: {
        cateName: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { max: 16, message: '最多16个字符', trigger: 'blur' }
        ],
      },
      /* 控制修改分类对话框显示、隐藏 */
      updateCategoryDialog: false,
      /* 修改分类表单 */
      updateCategoryForm: {
        cateName: "",
      },
      /* 修改分类表单验证规则 */
      updateCategoryRules: {
        cateName: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { max: 16, message: '最多16个字符', trigger: 'blur' }
        ],
      },
    };
  },
  methods: {
    /* 提交添加分类表单 */
    commitAddCategory() {
      // 验证表单信息
      this.$refs.addCategoryRef.validate((valid) => {
        if (valid) {
          // 验证通过，发送数据请求
          adminRequest({
            method: "post",
            url: "/back/category",
            data: this.addCategoryForm,
          }).then((res) => {
            if (res.code !== 200) return this.$message.error(res.message);
            // 提示
            this.$message.success("添加分类成功");
            // 刷新页面数据
            this.getCategoryData();
            // 重置表单
            this.closeAddCategoryDialog();
          });
        }
      });
    },
    /* 提交修改分类表单 */
    commitUpdateCategory() {
      // 验证表单
      this.$refs.updateCategoryRef.validate((valid) => {
        // 验证通过，发送请求
        if (valid) {
          adminRequest({
            method: "put",
            url: "/back/category",
            data: this.updateCategoryForm,
          }).then((res) => {
            if (res.code !== 200) return this.$message.error(res.message);
            // 提示
            this.$message.success("修改分类成功");
            // 刷新页面数据
            this.getCategoryData();
            // 重置表单
            this.closeUpdateCategoryDialog();
          });
        }
      });
    },
    /* 删除分类 */
    deleteCategory(category) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送请求
          adminRequest({
            method: "delete",
            url: `/back/category/${category.id}`,
          }).then((res) => {
            if (res.code != 200) return this.$message.error(res.message)
            this.$message.success("删除分类成功")
            // 刷新页面数据
            this.getCategoryData();
          });
        })
        .catch(() => {});
    },
    /* 展示添加分类对话框 */
    showAddCategoryDialog() {
      //打开添加分类对话框
      this.addCategoryDialog = true;
    },
    /* 关闭添加分类对话框 */
    closeAddCategoryDialog() {
      // 重置表单
      this.$refs.addCategoryRef.resetFields();
      // 关闭对话框
      this.addCategoryDialog = false;
    },
    /* 打开修改分类对话框 */
    showUpdateDialog(category) {
      // 设置修改表单属性值
      this.updateCategoryForm.cateName = category.cate_name;
      this.updateCategoryForm.id = category.id;
      // 打开对话框
      this.updateCategoryDialog = true;
    },
    /* 关闭修改分类对话框 */
    closeUpdateCategoryDialog() {
      // 关闭对话框
      this.updateCategoryDialog = false;
    },
  },
};
</script>

<style scoped>
</style>