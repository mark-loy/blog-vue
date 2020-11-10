import {
  request,
  adminRequest
} from 'plugins/network';

export const articleMixin = {
  data() {
    return {
      /* 文章列表数据源 */
      articleList: [],
      /* 文章发表总数 */
      total: -1,
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
  mounted() {
    // 监听根据title查询文章事件
    this.$bus.$on('searchArticle', search => {
      console.log(search);
      // 设置title值
      this.query.search = search
      // 刷新页面数据
      this.getArticleListData();
    })
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

export const categoryMixin = {
  data() {
    return {
      /* 分类数据源 */
      categoryData: []
    }
  },
  created() {
    this.getCategoryData()
  },
  methods: {
    /* 获取分类数据 */
    getCategoryData() {
      adminRequest({
        method: "get",
        url: "/back/category",
      }).then((res) => {
        this.categoryData = res.data.category;
      });
    },
  }
}

export const tagMixin = {
  data() {
    return {
      /* 标签数据源 */
      tagsData: [],
    }
  },
  created() {
    this.getTagData()
  },
  methods: {
    /* 获取标签数据 */
    getTagData() {
      adminRequest({
        method: "get",
        url: "/back/tags",
      }).then((res) => {
        this.tagsData = res.data.tags;
      });
    },
  }
}

export const informMixin = {
  data() {
    return {
      /* 通知数据源 */
      informData: []
    }
  },
  created() {
    this.getInformData()
  },
  methods: {
    /* 获取通知数据源 */
    getInformData() {
      adminRequest({
        method: 'get',
        url: '/back/inform'
      }).then(res => {
        if (res.code !== 200) return this.$message.error(res.message)
        // 成功，设置数据源
        this.informData = res.data.informs
      })
    },
  }
}
