<template>
  <div class="footer">
    <el-row class="footer-row" type="flex" justify="center">
      <el-col class="foot-col" :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
        <!-- item项 -->
        <el-row :gutter="18" type="flex" justify="center" class="footer-item-row">
          <!-- pc端显示 -->
          <el-col class="weixin-col" :xs="0" :sm="5" :md="5" :lg="5" :xl="5">
            <div class="weixin">
              <img src="~assets/imgs/weixin.png" />
            </div>
          </el-col>
          <el-col class="link-way-col" :xs="0" :sm="5" :md="5" :lg="5" :xl="5">
            <div class="link-way">
              <h2>联系我</h2>
              <p>邮箱：mark_loy@163.com</p>
              <p>qq: 1984563911</p>
            </div>
          </el-col>
          <el-col :xs="0" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="description">
              <h2>blog</h2>
              <p>
                这是我的个人博客，会分享关于编程、写作、思考相关的内容，希望可以给来到这儿的人有所帮助~
              </p>
            </div>
          </el-col>
        </el-row>

        <!-- 移动端显示 -->
        <el-row>
          <el-col :xs="24" :sm="0" >
            <div class="weixin">
              <img src="~assets/imgs/weixin.png" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="0">
            <div class="iphone-link-way">
              <h2>联系我</h2>
              <p>邮箱：mark_loy@163.com</p>
              <p>qq: 1984563911</p>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="" :xs="24" :sm="0">
            <div class="description">
              <h2>blog</h2>
              <p>
                这是我的个人博客，会分享关于编程、写作、思考相关的内容，希望可以给来到这儿的人有所帮助~
              </p>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footer-row {
  padding: 50px 0;
}

.footer-item-row {
  position: relative;
}

.weixin-col {
  border-right: solid 1px rgba(100, 100, 100, 1);
}

.weixin {
  text-align: center;
}

.weixin img {
  width: 140px;
}

.link-way-col {
  border-right: solid 1px rgba(100, 100, 100, 1);
}

.link-way {
  text-align: center;
}

.link-way h2 {
  font-size: 14px;
  margin-bottom: 15px;
}
.link-way p {
  padding: 6px 0;
}

.description {
  text-align: center;
}

.description h2 {
  margin-bottom: 20px;
}

.iphone-link-way {
    text-align: center;
    margin: 40px 0;
}

.iphone-link-way h2 {
  font-size: 14px;
  margin-bottom: 15px;
}
.iphone-link-way p {
  padding: 6px 0;
}
</style>