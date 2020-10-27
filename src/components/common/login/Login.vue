<template>
  <div></div>
</template>

<script>
import { request, crossRequest } from "plugins/network";
import { Loading } from "element-ui";

export default {
  data() {
    return {
      /* github登录人员信息 */
      githubUser: {},
    };
  },
  mounted() {
    // 判断是否为登录返回的url
    const query = this.$route.query;
    // 访客登录请求
    this.visitorLogin(query);
  },
  methods: {
    /* 发送访客登录请求  */
    visitorLogin(query) {
      // 打开正在加载
      let loadingInstance = Loading.service({
        fullscreen: true,
      });
      // 获取登录之前的路由
      const router = window.sessionStorage.getItem("currentRouter");
      // 获取token
      crossRequest({
        method: "post",
        url: "/github/login/oauth/access_token",
        data: {
          client_id: "Iv1.ba5422c5eaed00e0",
          client_secret: "775c9dc24dafc04d2b2bdbdd4a764fa763b8061f",
          code: query.code,
          state: query.state,
        },
      })
        .then((res) => {
          // 截取token
          const data = res.data.split("&")[0].split("=");
          // 提示错误信息
          if (data[0] === "error") return false;
          // 通过token，获取登录人员的信息
          return crossRequest({
            headers: {
              Authorization: `token ${data[1]}`,
            },
            method: "get",
            url: "/getUser/user",
          });
        })
        .then((res) => {
          if (res === false) return;
          // 提示错误信息
          if (res.status !== 200) {
            // 跳转到/home
            this.$router.push(router);
            this.$message.error("获取用户信息失败，请重试");
            return false;
          }
          // 获取成功，设置信息
          // 设置id
          this.githubUser.accountId = res.data.id;
          // 设置头像
          this.githubUser.avatarUrl = res.data.avatar_url;
          // 用户名
          this.githubUser.visitorName = res.data.login;
          // 发送数据请求，保存用户信息
          return request({
            method: "post",
            url: "/save_github_user",
            data: this.githubUser,
          });
        })
        .then((res) => {
          if (res === false) return;
          // 提示错误信息
          if (res.code !== 200) {
            // 跳转到/home
            this.$router.push(router);
            return this.$message.error("登录失败，请重试");
          }
          // 设置token
          window.sessionStorage.setItem("visitor-token", res.data.token);
          window.sessionStorage.setItem("visitor-id", res.data.visitor_id);
          // 跳转到/home
          this.$router.push(router);
          // 关闭loading, 关闭遮罩层
          this.$nextTick(() => {
            loadingInstance.close();
            // 发射登录按钮切换事件
            this.$bus.$emit("tabLoginBtn");
          });
        })
        .catch((err) => {
          return this.$message.error("登录失败，请重试");
        });
    },
  },
};
</script>

<style scoped>
</style>