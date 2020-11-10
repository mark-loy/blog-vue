let baseUrl= ""; //这里是一个默认的url，可以没有
switch (process.env.NODE_ENV) {
    case 'development':
        baseUrl = "http://localhost:8888/private/api"  //开发环境url
        break
    case 'production':
        baseUrl = "http://8.131.86.202:8888/private/api"  //生产环境url
        break
}
export default baseUrl;
