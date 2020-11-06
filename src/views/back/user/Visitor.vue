<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/back' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>访客列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-table :data="visitorData" stripe style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="visitorName" label="访客名"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              @change="updateVisitorState(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="来源">
          <template slot-scope="scope">
            <el-tag
              size="mini"
              :type="scope.row.source === 1 ? 'primary' : 'danger'"
            >
              {{ scope.row.source === 1 ? "GitHub" : "QQ" }}
            </el-tag>
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
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { adminRequest } from "plugins/network";

export default {
  data() {
    return {
      visitorData: [],
    };
  },
  created() {
    this.getVisitorData();
  },
  methods: {
    /* 获取访客信息数据源 */
    getVisitorData() {
      adminRequest({
        method: "get",
        url: "/back/visitor",
      }).then((res) => {
        if (res.code !== 200) {
          return this.$message.error(res.message);
        }
        // 设置数据源
        this.visitorData = res.data.visitors;
      });
    },
    /* 修改访客账户状态 */
    updateVisitorState(visitor) {
      adminRequest({
        method: 'put',
        url: `/back/visitor/${visitor.id}`,
        params: {
          state: visitor.state
        }
      }).then(res => {
        if (res.code !== 200) return this.$message.error(res.message)
        // 提示成功
        this.$message.success("修改状态成功")
      })
    }
  },
};
</script>

<style scoped>
</style>