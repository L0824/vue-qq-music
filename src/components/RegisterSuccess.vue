<template>
  <div class="container">
    <div class="crumbs crumbs-register">
      <el-breadcrumb separator="/" class="register-title">
        <el-breadcrumb-item class='ok'><i class="el-icon-setting"></i>注册成功</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="userContent success">
      <div class="eidt-success">
        <div class="show-success">
          <i class="el-icon-check"></i>&nbsp;&nbsp;<span>恭喜您，注册成功</span>
        </div>
        <div class="click-login">
          <a href="#" @click="handleCommand()">跳转登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      handleCommand() {
        this.$router.push('/qmusic/login')
      }
    }
  }
</script>

<style>
  .crumbs {
    margin-bottom: 0;
  }
  .crumbs-register {
    height: 50px;
    line-height: 50px;
  }
  .register-title {
    line-height: 50px;
    margin: 0 auto;
    width: 100px;
    font-size: 18px;
  }
  .success{
    background-image: url('../assets/img/success.jpg');
     background-size: cover;
     height: 500px;
  }
  .userContent {
    margin: 0 auto;
    background-size: cover;
  }
  .select-sex {
    width: 320px;
  }
  .eidt-success {
    width: 400px;
    margin: 0 auto;
    position: relative;
  }
  .eidt-success .show-success {
    position: absolute;
    margin-left: -190px;
    left: 50%;
  }
  .click-login {
    position: absolute;
    margin-left: -40px;
    left: 50%;
    top: 61px;
  }
  .eidt-success i {
    color: #e60b32;
  }
  .eidt-success i,
  .eidt-success span {
    font-size: 40px;
    font-family: Microsoft YaHei;
  }
  .ok{
    font-size: 18px !important;
    color: #fff !important;
  }
   .el-breadcrumb__inner{
     color: #fff !important;
   }
</style>