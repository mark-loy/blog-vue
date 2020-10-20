<template>
  <div v-if="Object.keys(timeLineData).length !== 0">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="14" :md="12" :lg="12">
        <!-- 时间线区域 -->
        <div class="timeline-box">
          <el-timeline v-for="(timeline, index) in timeLineData" :key="index">
            <el-timeline-item size="large" color="#0bbd87"
              ><span class="year-font">{{
                timeline.year
              }}</span></el-timeline-item
            >
            <el-timeline-item v-for="item in timeline.articles" :key="item.id">
              <el-link :underline="false" :href="'/article/' + item.id" class="link-font"
                ><span class="date-font">{{ item.date }}</span>
                <span class="title-font">{{ item.title }}</span></el-link
              >
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { request } from "plugins/network";

export default {
  data() {
    return {
      timeLineData: [],
      total: 0,
    };
  },
  created() {
    this.getTimeLineData();
  },
  methods: {
    /* 获取时间线数据源 */
    getTimeLineData() {
      request({
        method: "get",
        url: "/timeLine",
      }).then((res) => {
        console.log(res);
        // 错误消息提示
        if (res.code !== 200) return this.$message.error(res.msg);
        // 设置数据源
        this.timeLineData = res.data.timeLine;
        this.total = res.data.total;
      });
    },
  },
};
</script>

<style scoped>
.box-card {
  margin-bottom: 50px;
}

.time-line-nav {
  padding: 8px 10px;
}

.timeline-box {
  margin: 40px 25px;
}

.year-font {
  font-size: 18px;
  font-weight: 700;
}

.date-font {
  font-size: 11px;
  color: #7f7f7f;
}

.title-font {
  margin-left: 15px;
  font-size: 16px;
  color: #7f7f7f;
}
.link-font:hover {
  transform: scale(1.06);
}
.link-font:hover span {
  color: #0bbd87;
}
</style>