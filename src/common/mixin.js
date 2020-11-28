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
        console.log(res);
        if (res.code !== 200) return this.$message.error(res.message)
        // 成功，设置数据源
        this.informData = res.data.informs
      })
    },
  }
}

/* 富文本编辑器文件上传 */
export const imgAddMixin = {
  methods: {
    /* mavon编辑器 图片上传 */
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      adminRequest({
        url: "/back/file/upload",
        method: "post",
        data: formdata,
        headers: {
          'Content-Type': 'multipart/form-data;boundary=' + new Date().getTime(),
          "Authorization": window.sessionStorage.getItem("admin-token")
        },
      }).then((response) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs.md.$img2Url(pos, response.data.url);
      });
    },
  }
}

/* 富文本编辑器文件删除 */
export const imgDelMixin = {
  methods: {
    $imgDel(file) {
      console.log(file);
      const fileNameTmp = file[0].split("?")[0].split("/")
      const fileName = fileNameTmp[fileNameTmp.length - 1]
      // 发送请求
      adminRequest({
        method: "delete",
        url: `/back/file/delete/${fileName}`,
      }).then((res) => {
        if (res.code !== 200) return this.$message.error("移除图片失败");
        // 成功
        this.$message.success("移除图片成功");
      });
    }
  }
}

import {
  imageUrl
} from '../envParams'

export const elUploadMixin = {
  data() {
    return {
      /* 图片上传地址 */
      imageURL: imageUrl,
      /* 图片上传请求头 */
      imageHeader: {
        Authorization: window.sessionStorage.getItem("admin-token"),
      },
      /* 控制图片预览对话框显示、隐藏 */
      imagePreviewDialog: false,
      /* 图片预览路径 */
      imagePreView: "",
    }
  },
  methods: {
    /* 文件上传成功 */
    handleSuccess(response) {
      if (response.code !== 200) return this.$message.error("图片上传失败！");
      // 成功
      this.$message.success("图片上传成功！");
      // 设置表单展示图属性
      this.articleForm.showImg = response.data.url;
    },
    /* 上传文件预览 */
    handlePreview(file) {
      // 打开图片预览对话框
      this.imagePreviewDialog = true;
      // 设置url
      this.imagePreView = file.response.data.url;
    },
    /* 移除上传的文件 */
    handleRemove(file) {
      // 获取文件名
      const fileName = file.response.data.fileName;
      // 发送请求
      adminRequest({
        method: "delete",
        url: `/back/file/delete/${fileName}`,
      }).then((res) => {
        console.log(res);
        if (res.code !== 200) return this.$message.error("移除图片失败");
        // 成功
        this.$message.success("移除图片成功");
      });
    },
  }
}
