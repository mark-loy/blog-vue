/* logo的url */
let logoUrl = ""
/* axios发送网络请求的基础路径 */
let baseUrl = "";
/* 登录GitHub */
let loginGithubUrl = "";
/* 登录QQ */
let loginQQUrl = "";
/* GitHub.client_id */
let githubClientId = ""
/* GitHub.client_secret */
let githubClientSecret = ""
/* 上传图片url */
let imageUrl = ""
/* qq应用key */
let qqAppId = ""
/* qq应用secret */
let qqAppSecret = ""

switch (process.env.NODE_ENV) {
  case 'development':
    //url
    logoUrl = "http://localhost:8080/"
    baseUrl = "http://localhost:8888/private/api"
    loginGithubUrl = "https://github.com/login/oauth/authorize?client_id=b2494ae29b6ed42397bf&redirect_uri=http://localhost:8080/login/git&scope=user&state=fbc9b373-1375-11eb-a817-005056c00001"
    loginQQUrl = "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101908663&redirect_uri=http://192.168.1.4:8080/login/qq&state=fbc9b373-1375-11eb-a817-005056c00001"
    imageUrl = "http://192.168.1.4:8888/private/api/back/file/upload"
    //参数
    githubClientId = "b2494ae29b6ed42397bf"
    githubClientSecret = "c894c6c7f8a4d2df3a6e91c7c0c5895f7fa2ad6b"
    qqAppId = ""
    qqAppSecret = ""
    
    break
  case 'production':
    //url
    logoUrl = "http://www.lishuqi.top/"
    baseUrl = "http://8.131.86.202:8888/private/api"
    loginGithubUrl = "https://github.com/login/oauth/authorize?client_id=941034207570ce50a8c4&redirect_uri=https://www.lishuqi.top/login/git&scope=user&state=fbc9b373-1375-11eb-a817-005056c00001"
    loginQQUrl = "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101908663&redirect_uri=https://www.lishuqi.top/login/qq&state=fbc9b373-1375-11eb-a817-005056c00001"
    imageUrl = "http://8.131.86.202:8888/private/api/back/file/upload"
    //参数
    githubClientId = "941034207570ce50a8c4"
    githubClientSecret = "9a6df520deaf312428614b81333726506fba800c"
    qqAppId = "101908663"
    qqAppSecret = "323695c26a84ca0c3fcbfa7011693e27"
    
    break
}

export {
  logoUrl,
  baseUrl,
  loginGithubUrl,
  loginQQUrl,
  imageUrl,
  githubClientId,
  githubClientSecret,
  qqAppId,
  qqAppSecret
}
