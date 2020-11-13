<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/back' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-table :data="adminData" stripe style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <el-avatar :size="50" :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="petName" label="昵称"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              @change="updateAdminState(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="注册时间">
          <template slot-scope="scope">
            {{ scope.row.gmtCreate | dateFormat("yyyy-MM-dd hh:ss") }}
          </template>
        </el-table-column>
        <el-table-column label="最新登录时间">
          <template slot-scope="scope">
            {{ scope.row.gmtModified | dateFormat("yyyy-MM-dd hh:ss") }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="showUpdateDialog(scope.row)"
              type="primary"
              size="mini"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 修改管理员信息对话框 -->
    <el-dialog title="修改信息" :visible.sync="updateAdminDialog" width="50%">
      <el-form
        label-width="80px"
        :model="updateAdminForm"
        :rules="updateAdminRules"
        ref="updateAdminRef"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="updateAdminForm.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="petName">
          <el-input v-model="updateAdminForm.petName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updateAdminForm.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            :action="imageURL"
            :headers="imageHeader"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
            <el-avatar :size="60" :src="updateAdminForm.avatar"></el-avatar>
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updateAdminDialog = false">取 消</el-button>
        <el-button type="primary" @click="commitUpdateAdmin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { adminRequest } from "plugins/network";

import { imageUrl } from '../../../envParams'

export default {
  data() {
    return {
      /* 管理员列表数据 */
      adminData: [],
      /* 控制修改对话框 */
      updateAdminDialog: false,
      /* 修改管理员信息表单 */
      updateAdminForm: {
        id: "",
        username: "",
        petName: "",
        email: "",
        avatar: "",
      },
      /* 修改管理员信息表单验证规则 */
      updateAdminRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        petName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      },
      /* 图片上传地址 */
      imageURL: imageUrl,
      /* 图片上传请求头 */
      imageHeader: {
        Authorization: window.sessionStorage.getItem("admin-token"),
      },
    };
  },
  created() {
    this.getAdminData();
  },
  methods: {
    /* 获取管理员列表数据源 */
    getAdminData() {
      adminRequest({
        method: "get",
        url: "/back/admin",
      }).then((res) => {
        if (res.code !== 200) return this.$message.error(res.message);
        // 成功，设置数据源
        this.adminData = res.data.admins;
      });
    },
    /* 提交修改管理员表单数据 */
    commitUpdateAdmin() {
      // 验证表单
      this.$refs.updateAdminRef.validate((valid) => {
        if (valid) {
          // 验证通过
          adminRequest({
            method: "put",
            url: "/back/admin",
            data: this.updateAdminForm,
          }).then((res) => {
            console.log(res);
            if (res.code !== 200) return this.$message.error(res.message);
            // 成功
            this.$message.success("更新成功");
            // 更新列表数据
            this.getAdminData();
            // 关闭对话框
            this.updateAdminDialog = false;
          });
        }
      });
    },
    /* 修改管理员状态 */
    updateAdminState(admin) {
      adminRequest({
        method: "put",
        url: `/back/admin/${admin.id}`,
        params: {
          state: admin.state,
        },
      }).then((res) => {
        if (res.code !== 200) return this.$message.error(res.message);
        // 提示成功
        this.$message.success("修改状态成功");
      });
    },
    /* 展示修改管理员信息对话框 */
    showUpdateDialog(admin) {
      // 设置表单字段
      this.updateAdminForm.id = admin.id;
      this.updateAdminForm.username = admin.username;
      this.updateAdminForm.petName = admin.petName;
      this.updateAdminForm.email = admin.email;
      this.updateAdminForm.avatar = admin.avatar;
      // 打开对话框
      this.updateAdminDialog = true;
    },
    /* 头像上传成功 */
    handleSuccess(response) {
      if (response.code !== 200) return this.$message.error("头像上传失败！");
      // 成功
      this.$message.success("头像上传成功！");
      // 设置表单展示图属性
      this.updateAdminForm.avatar = response.data.url;
    },
  },
};
</script>

<style scoped>
</style>