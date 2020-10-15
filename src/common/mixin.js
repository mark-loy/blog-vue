import { request } from 'plugins/network';

export const mixin = {
  components: {

  },
  data() {
    return {
      /* 文章列表数据源 */
      articleList: [],
      /* 文章发表总数 */
      total: 0,
      /* 分页条件 */
      query: {
        currentPage: 1,
        offset: 5,
        cate_id: '',
        tag_id: '',
        search: ''
      },
    }
  },
  created() {
    //请求文章列表数据源
    this.getArticleListData();
  },
  methods: {
    /* 获取文章列表数据源 */
    getArticleListData() {
      //发送数据请求
      request({
        method: "get",
        url: "/home/article",
        params: this.query,
      }).then((res) => {
        // 提示错误信息
        if (res.code !== 200) {
          return this.$message.error("请求文章列表数据失败");
        }
        // 设置列表数据
        this.articleList = res.data.articles;
        // 设置文章总篇数
        this.total = res.data.total;
      });
    },
    /* 当页显示数改变 */
    handleSizeChange(value) {
      // 设置查询参数
      this.query.offset = value;
      // 刷新列表数据
      this.getArticleListData();
    },
    /* 当前页发生改变 */
    handleCurrentChange(value) {
      // 设置查询参数
      this.query.currentPage = value;
      // 刷新列表数据
      this.getArticleListData();
    },
  }
}