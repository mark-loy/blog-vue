<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/back' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>标签管理</el-breadcrumb-item>
      <el-breadcrumb-item>标签列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 标签卡片区域 -->
    <el-card>
      <el-button @click="showAddTagDialog" type="success" size="mini"
        >添加标签</el-button
      >

      <!-- 标签table -->
      <el-table :data="tagsData" stripe style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="tag_name" label="标签名"> </el-table-column>
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
              @click="showUpdateTagDialog(scope.row)"
              size="mini"
              type="primary"
              >编辑</el-button
            >
            <el-button @click="deleteTag(scope.row)" size="mini" type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加分类对话框 -->
    <el-dialog title="添加标签" :visible.sync="addTagDialog" width="50%">
      <el-form
        :model="addTagForm"
        :rules="addTagRules"
        ref="addTagRef"
        label-width="100px"
      >
        <el-form-item label="标签名称" prop="tagName">
          <el-input v-model="addTagForm.tagName"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="closeAddTagDialog">取 消</el-button>
        <el-button type="primary" @click="commitAddTag">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改分类对话框 -->
    <el-dialog title="修改分类" :visible.sync="updateTagDialog" width="50%">
      <el-form
        :model="updateTagForm"
        :rules="updateTagRules"
        ref="updateTagRef"
        label-width="100px"
      >
        <el-form-item label="标签名称" prop="tagName">
          <el-input v-model="updateTagForm.tagName"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="closeUpdateTagDialog">取 消</el-button>
        <el-button type="primary" @click="commitUpdateTag">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { adminRequest } from "plugins/network";

import { tagMixin } from "common/mixin";

export default {
  mixins: [tagMixin],
  data() {
    return {
      /* 控制添加标签显示、隐藏 */
      addTagDialog: false,
      /* 添加标签表单 */
      addTagForm: {
        tagName: "",
      },
      /* 添加表单的验证规则 */
      addTagRules: {
        tagName: [
          { required: true, message: "请输入标签名称", trigger: "blur" },
          { max: 16, message: "最多16个字符", trigger: "blur" },
        ],
      },
      /* 控制修改添加对话框显示、隐藏 */
      updateTagDialog: false,
      /* 修改标签表单 */
      updateTagForm: {
        tagName: "",
      },
      /* 修改标签表单验证规则 */
      updateTagRules: {
        tagName: [
          { required: true, message: "请输入标签名称", trigger: "blur" },
          { max: 16, message: "最多16个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    /* 提交添加标签表单 */
    commitAddTag() {
      // 验证表单信息
      this.$refs.addTagRef.validate((valid) => {
        if (valid) {
          // 验证通过，发送数据请求
          adminRequest({
            method: "post",
            url: "/back/tags",
            data: this.addTagForm,
          }).then((res) => {
            if (res.code !== 200) return this.$message.error(res.message);
            // 提示
            this.$message.success("添加标签成功");
            // 刷新页面数据
            this.getTagData();
            // 重置表单
            this.closeAddTagDialog();
          });
        }
      });
    },
    /* 提交修改标签表单 */
    commitUpdateTag() {
      // 验证表单
      this.$refs.updateTagRef.validate((valid) => {
        // 验证通过，发送请求
        if (valid) {
          adminRequest({
            method: "put",
            url: "/back/tags",
            data: this.updateTagForm,
          }).then((res) => {
            if (res.code !== 200) return this.$message.error(res.message);
            // 提示
            this.$message.success("修改标签成功");
            // 刷新页面数据
            this.getTagData();
            // 重置表单
            this.closeUpdateTagDialog();
          });
        }
      });
    },
    /* 删除分类 */
    deleteTag(tag) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送请求
          adminRequest({
            method: "delete",
            url: `/back/tags/${tag.id}`,
          }).then((res) => {
            if (res.code != 200) return this.$message.error(res.message);
            this.$message.success("删除标签成功");
            // 刷新页面数据
            this.getTagData();
          });
        })
        .catch(() => {});
    },
    /* 展示添加标签对话框 */
    showAddTagDialog() {
      this.addTagDialog = true;
    },
    /* 关闭添加标签对话框 */
    closeAddTagDialog() {
      // 重置表单
      this.$refs.addTagRef.resetFields();
      // 关闭对话框
      this.addTagDialog = false;
    },
    /* 展示修改标签对话框 */
    showUpdateTagDialog(tag) {
      // 设置属性
      this.updateTagForm.id = tag.id;
      this.updateTagForm.tagName = tag.tag_name;
      // 打开对话框
      this.updateTagDialog = true;
    },
    /* 关闭修改标签对话框 */
    closeUpdateTagDialog() {
      // 关闭对话框
      this.updateTagDialog = false;
    },
  },
};
</script>

<style scoped>
</style>