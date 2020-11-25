<template>
  <div></div>
</template>

<script>
import { request, crossRequest } from "plugins/network";
import { Loading } from "element-ui";

import {
  githubClientId,
  githubClientSecret,
  qqAppId,
  qqAppSecret,
} from "../../../envParams";
export default {
  data() {
    return {
      /* github登录人员信息 */
      githubUser: {},
      /* qq登录人员信息 */
      qqUser: {},
      /* qq的token */
      access_token: "",
    };
  },
  mounted() {
    // 获取登录方式
    const type = this.$route.name;
    // 获取返回参数
    const query = this.$route.query;
    // 判断方可登录方式
    if (type === "github") {
      // 访客github登录
      this.visitorGithubLogin(query);
    } else {
      // 访客qq登录
      this.visitorQQLogin(query);
    }
  },
  methods: {
    /* 访客GitHub登录  */
    visitorGithubLogin(query) {
      // 打开正在加载
      let loadingInstance = Loading.service({
        fullscreen: true,
      });
      // 获取登录之前的路由
      const router = window.sessionStorage.getItem("currentRouter");
      // 获取github应用的access_token
      crossRequest({
        method: "post",
        url: "/github/token/login/oauth/access_token",
        data: {
          client_id: githubClientId,
          client_secret: githubClientSecret,
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
            url: "/github/user/user",
          });
        })
        .then((res) => {
          if (res === false) return;
          // 提示错误信息
          if (res.status !== 200) {
            // 跳转到/home
            this.$router.replace(router);
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
            url: "/save/user/github",
            data: this.githubUser,
          });
        })
        .then((res) => {
          if (res === false) return;
          // 提示错误信息
          if (res.code !== 200) {
            // 跳转到/home
            this.$router.replace(router);
            return this.$message.error("登录失败，" + res.message);
          }
          // 设置token
          window.sessionStorage.setItem("visitor-token", res.data.token);
          window.sessionStorage.setItem("visitor-id", res.data.visitor_id);
          // 跳转到/home
          this.$router.replace(router);
          // 关闭loading, 关闭遮罩层
          this.$nextTick(() => {
            loadingInstance.close();
            // 发射登录按钮切换事件
            this.$bus.$emit("tabLoginBtn");
          });
        })
        .catch((err) => {
          this.$router.replace(router);
          return this.$message.error("登录失败，请重试");
        });
    },
    /* 访客QQ登录 */
    visitorQQLogin(query) {
      // 打开正在加载
      let loadingInstance = Loading.service({
        fullscreen: true,
      });
      // 获取登录之前的路由
      const router = window.sessionStorage.getItem("currentRouter");
      // 发送请求，获取qq应用的access_token
      crossRequest({
        method: "GET",
        url: "/qq/api/oauth2.0/token",
        params: {
          grant_type: "authorization_code",
          client_id: qqAppId,
          client_secret: qqAppSecret,
          code: query.code,
          redirect_uri: "https://www.lishuqi.top/login/qq",
          fmt: "json",
        },
      })
        .then((res) => {
          const result = JSON.parse(JSON.stringify(res));
          // 设置access_token
          this.access_token = result.data.access_token;
          // 发送请求，获取openid
          return crossRequest({
            method: "GET",
            url: "/qq/api/oauth2.0/me",
            params: {
              access_token: this.access_token,
              fmt: "json",
            },
          });
        })
        .then((res) => {
          const result = JSON.parse(JSON.stringify(res));
          // 获取openid
          this.qqUser.accountId = result.data.openid;
          return crossRequest({
            method: "GET",
            url: "/qq/api/user/get_user_info",
            params: {
              access_token: this.access_token,
              oauth_consumer_key: qqAppId,
              openid: result.data.openid,
            },
          });
        })
        .then((res) => {
          const result = JSON.parse(JSON.stringify(res));
          // 判断返回状态
          if (result.data.ret < 0) {
            this.$router.replace(router);
            return this.$message.error(result.data.msg);
          }
          // 成功，获取访客信息
          this.qqUser.avatarUrl = result.data.figureurl_qq_1;
          this.qqUser.visitorName = result.data.nickname;
          console.log(this.qqUser);
          // 发送请求，保存用户数据
          return request({
            method: "post",
            url: "/save/user/qq",
            data: this.qqUser,
          });
        })
        .then((res) => {
          // 提示错误信息
          if (res.code !== 200) {
            // 跳转到/home
            this.$router.replace(router);
            return this.$message.error("登录失败，" + res.message);
          }
          // 设置token
          window.sessionStorage.setItem("visitor-token", res.data.token);
          window.sessionStorage.setItem("visitor-id", res.data.visitor_id);
          // 跳转到
          this.$router.replace(router);
          // 关闭loading, 关闭遮罩层
          this.$nextTick(() => {
            loadingInstance.close();
            // 发射登录按钮切换事件
            this.$bus.$emit("tabLoginBtn");
          });
        });
    },
  },
};
</script>

<style scoped>
</style>