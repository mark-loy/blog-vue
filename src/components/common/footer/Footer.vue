<template>
  <div class="footer">
    <div class="footer-box">
      <p>Copyright © 2020-2021 MBlog</p>
      <p style="margin: 7px 0 5px;"><a href="http://www.beian.miit.gov.cn/">湘ICP备2020021755号-1</a></p>
      <p style="width: 240px; margin:0 auto;">
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43070302000277"
          style="color: #ff1c04"
        >
          <img src="~assets/imgs/备案图标.png" style="vertical-align: bottom; margin-right: 8px" /> 
          湘公网安备 43070302000277号 
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  height: 75px;
}

.footer-box {
  margin-top: 13px;
  text-align: center;
}

.footer-box p {
  color: #fff;
  font-size: 14px;
}

a {
  text-decoration: none;
  color: #3eaf7c;
  font-size: 14px;
}
</style>