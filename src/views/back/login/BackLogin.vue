<template>
  <!-- 后台登录页区域 -->
  <div class="login">
    <div class="login-box">
      <!-- 登录行 -->
      <el-row type="flex" justify="center">
        <el-col :xs="24" class="login-col">
          <!-- 登录表单头 -->
          <div class="login-hd">
            <h2>Blog管理后台登录</h2>
          </div>
          <!-- 登录表单体 -->
          <div class="login-bd">
            <el-form
              :model="loginForm"
              :rules="loginRules"
              ref="loginFormRef"
              label-position="right"
              label-width="70px"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  v-model="loginForm.username"
                  clearable
                  prefix-icon="iconfont icon-yonghu1"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="loginForm.password"
                  type="password"
                  clearable
                  prefix-icon="iconfont icon-mima1"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { request } from "plugins/network";

import { SAVE_ADMIN_USER } from "store/mutation-type";

export default {
  data() {
    return {
      /* 登录表单 */
      loginForm: {
        username: "",
        password: "",
      },
      /* 登录表单验证规则 */
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 16,
            message: "长度在 5 到 16 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 11,
            message: "长度在 5 到 11 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    /* 登录表单提交 */
    submitForm() {
      /* 表单验证 */
      this.$refs["loginFormRef"].validate((valid) => {
        if (valid) {
          //效验成功，发送后台登录请求
          request({
            method: "post",
            url: "/login",
            data: this.loginForm,
          }).then((res) => {
            console.log(res);
            // 提示错误信息
            if (res.code !== 200) return this.$message.error(res.message);
            // 提示登录成功
            this.$message.success("登录成功");
            // 保存用户token
            window.sessionStorage.setItem("admin-token", res.data.token);
            // 将登录的用户放在store中
            this.$store.commit(SAVE_ADMIN_USER, res.data.user);
            // 跳转到后台首页
            this.$router.replace("/back");
          });
        }
      });
    },
    /* 登录表单重置 */
    resetForm() {
      this.$refs["loginFormRef"].resetFields();
    },
  },
};
</script>

<style scoped>
.login {
  height: 100vh;
  background-color: #efefef;
}

.login-box {
  position: relative;
  top: 35%;
  transform: translateY(-50%);
}

.login-col {
  width: 400px;
  height: 250px;
  padding: 10px;
  border-radius: 5px;
  background-color: azure;
}

.login-hd {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.login-hd img {
  border-radius: 50%;
  width: 35px;
  margin-right: 20px;
}

.login-hd h2 {
  font-size: 21px;
  color: #0bbd87;
}
</style>