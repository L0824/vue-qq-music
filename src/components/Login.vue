<template>
 <!-- <transition name="slide"> -->
    <div class="login-body">
    <div class="container login-box">
      <form class='form-signin' action="">
        <h2 class="form-signin-heading">sign in now</h2>
        <div class="login-wrap">
          <p v-show="showTishi">{{tishi}}</p>
          <input type="text" class="form-control" placeholder="User" v-model="username" name="username" autofocus autocomplete="off">
          <input type="password" class="form-control" placeholder="Password" v-model="password" name="password">
          <button class="btn btn-lg btn-login btn-block" type="button" @click="login" ref="toolbar">Sign in</button>
          <p class="msg"></p>
          <div class="registration">
            <span> Don't have an account yet?</span>
            <a href="" class="toRegest"  @click='toRegieter'>Create an account</a>
          </div>
        </div>
      </form>
    </div>
  </div>
 <!-- </transition> -->
</template>

<script>

import $ from 'jquery'
import axios from 'axios'

  export default{
     data(){
       return{
          showTishi: false,
          tishi: '',
          username: '',
          password: '',
       }
     },
     methods:{
       toRegieter(){
         this.$router.push('/qmusic/Register')
      },
      login(){
        if(this.username == "" || this.password == ""){
            alert("请输入用户名或密码")
        }else{
            let data = {'username':this.username,'password':this.password}
            /*接口请求*/
            this.$http.jsonp('/api/login',data).then(res=>{
              sessionStorage.setItem("user", JSON.stringify(data));
               for(var i=0;i<=res.body.length;i++){
                  if(data.username == res.body[i].username && data.password == res.body[i].password){
                    this.$router.push('home')
                  }else{
                    $(".msg").html("账号或密码错误，请核对！！！")
                  }
               }
         })
        }
      }
    }
  }

</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
body{
  color: #797979;
}
.login-body{
  background:  #f1f2f7;
}
.form-signin{
    max-width: 400px;
    margin: 30px auto 0;
    background: #fff;
    border-radius: 5px;
    height: 400px;
}

.login-wrap{
    padding: 20px;
}
.login-wrap p{
    text-align: center;
    color: #b6b6b6;
    font-size: 16px;
    font-weight: 300;
}
.container{
  padding-top:30px;
  padding-bottom: 30px;
  background: url('../assets/img/bg.jpg') no-repeat;
  background-size: 100% 100%;
}
.login-box{
  padding-bottom: 360px;
} 
.form-signin .form-control{
    position: relative;
    height: auto;
    padding: 10px;
    box-sizing: border-box;
    color: #c2c2c2;
    display: block;
    width: 100%;
    margin-top: 8px;
}
.form-signin input{
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #eaeaea;
    box-shadow: none;
    font-size: 12px;
    outline: none;
}
.form-signin .checkbox {
    position: relative;
    display: block;
    margin-top: 10px;
    font-size: 14px;
    color: #b6b6b6;
    font-weight: 300;
    font-family: 'Open Sans', sans-serif;
    margin-bottom: 14px;
}
.form-signin .btn-login {
    background: #f67a6e;
    color: #fff;
    text-transform: uppercase;
    font-weight: 300;
    font-family: 'Open Sans', sans-serif;
    box-shadow: 0 4px #e56b60;
    margin-bottom: 20px;
}
.btn-block {
    display: block;
    width: 100%;
}
.btn-lg {
    padding: 10px 16px;
    font-size: 18px;
    border-radius: 6px;
}
.btn{
    outline: none;
    border: 1px solid transparent;
}
.registration span{
    color: #797979;
    font-size: 13px;
}
.toLogin,.toRegest{
    color:#41cac0;
    text-decoration: none;
    font-size: 13px;
} 
.msg{
  color: red !important;
}
</style>说