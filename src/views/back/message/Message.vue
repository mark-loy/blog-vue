<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/back' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>留言管理</el-breadcrumb-item>
      <el-breadcrumb-item>留言列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-table :data="messageData" stripe style="width: 100%" row-key="message.id"
      :tree-props="{children: 'child_messages', hasChildren: 'hasChildren'}">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <el-avatar
              :size="50"
              :src="scope.row.visitor.avatar_url"
            ></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="visitor.visitor_name" label="留言人">
        </el-table-column>
        <el-table-column label="留言内容">
          <template slot-scope="scope">
            {{ handleContent(scope.row.message.content, scope.row.message.parentId) }}
          </template>
        </el-table-column>
        <el-table-column label="留言时间">
          <template slot-scope="scope">
            {{ scope.row.message.gmt_create | dateFormat("yyyy-MM-dd hh:ss") }}
          </template>
        </el-table-column>
        <el-table-column label="留言状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.message.state"
              @change="updateMessageState(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.currentPage"
        :page-sizes="[5, 20, 30, 50]"
        :page-size="query.offset"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { adminRequest } from "plugins/network";

export default {
  data() {
    return {
      messageData: [],
      total: 0,
      query: {
        currentPage: 1,
        offset: 5
      }
    };
  },
  mounted() {
    // 获取留言数据
    this.getMessageData();
  },
  methods: {
    /* 发送请求，获取留言数据 */
    getMessageData() {
      adminRequest({
        method: "GET",
        url: "/back/message",
        params: {
          currentPage: this.query.currentPage,
          offset: this.query.offset,
        },
      }).then((res) => {
        console.log(res);
        if (res.code !== 200) return this.$message.error(res.message);
        // 设置留言数据
        this.messageData = res.data.messages;
        this.total = res.data.total
      });
    },
    /* 发送请求，修改留言状态 */
    updateMessageState(message) {
      adminRequest({
        method: "PUT",
        url: `/back/message/${message.message.id}/${message.message.state}`,
      }).then((res) => {
        console.log(res);
        if (res.code !== 200) {
          return this.$message.error(res.message);
        }
        // 成功提示
        this.$message.success("更新留言状态成功");
      });
    },
    /* 处理留言内容 */
    handleContent(content, parentId) {
      // 判断是否为父级留言
      if (parentId === 0) {
        return content
      }
      return content.split(
        '<span style="font-weight: 700; color: #3eaf7c">@mark-loy</span>'
      )[1];
    },
    /* 分页，当前页显示数改变 */
    handleSizeChange(offset) {
      // 设置数据
      this.query.offset = offset
      // 刷新留言表格数据
      this.getMessageData()
    },
    /* 分页，当前页改变 */
    handleCurrentChange(currentPage) {
      // 设置数据
      this.query.currentPage = currentPage
      // 刷新留言表格数据
      this.getMessageData()
    }
  },
};
</script>

<style scoped>
</style>