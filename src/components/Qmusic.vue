<template>
  <!-- 导航栏组件 -->
  <div class="q-music">
      <div class="q-nav">
        <ul class="clear-fix">
          <li>
            <router-link to="/qmusic/home">首页</router-link>
          </li>
          <li>
            <router-link to="/qmusic/singer">歌手</router-link>
          </li>
          <li>
            <router-link to="/qmusic/album">专辑</router-link>
          </li>
          <li>
            <router-link to="/qmusic/toplist">排行榜</router-link>
          </li>
          <li>
            <router-link to="/qmusic/search">搜索</router-link>
          </li>
          <li>
            <router-link to="/qmusic/playlist">分类歌单</router-link>
          </li>
          <li>
            <router-link to="/qmusic/mv">MV</router-link>
          </li>
          <li>
            <router-link to="/qmusic/digital">数字专辑</router-link>
          </li>
          <li class="loginNo">
            <router-link to="/qmusic/register">注册</router-link>
          </li>
           <li class="loginNo">
            <router-link to="/qmusic/login">登录</router-link>
          </li>
          <!-- {{username}} -->
          <li class="loginYes "><a href="" class="name"><span class="user_name">{{welcome_info}}{{username}}</span></a></li>
          <li class="loginYes" @click='loginout'><a href="">退出</a></li>
        </ul>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>

 import { mapMutations ,mapActions,mapState} from 'vuex'
 import {getProfile} from '../api/musicapi'
 import $ from 'jquery' 
  import {setCookie} from '../assets/js/setcookie'


  export default{
    props: ['name'],
    data(){
      return{
        // 登录
        loginShow:false,
        welcome_info:'',
        username:'',
        exit:'',
        pl8:'pl8'
      }
    },
    created(){
      var username = JSON.parse(sessionStorage.getItem("user")).username;
      // console.log(username)
      if(username == ''){
          this.welcome_info = '欢迎你,';
          this.username = '爱豆';
       }
      else{
          this.welcome_info = '歡迎妳,';
          this.username = username;
          this.exit = '';
      }
    },
    mounted(){
      if(this.$router.currentRoute.path=='/qmusic'){
        // 导航到不同的 URL，则使用 router.push
        this.$router.push('/qmusic/home')
      }
    },
    watch:{
      $route(to){
        if(to.path=='/qmusic'){
          this.$router.push('/qmusic/home')
        }
      }
    },
    methods:{
      ...mapMutations([
        'setWeatherArr', 'setWeatherObj','setCurrentIndex','setUserInfo'
      ]),
       loginFn(id){
        getProfile(id).then((res)=>{
          this.setUserInfo(res.data)
          this.loginShow=false
        })
      },
      loginout(){
        sessionStorage.removeItem("user")
        this.$router.push('/qmusic/home')
      }
    }
  }
</script>

<style>

  #app .q-music ul{
    text-align: left;
  }
  #app .q-music{
    position: relative;
  }
  #app .q-music li{
    width: 100px;
    float: left;
    color: #42b983;
    text-align: left;
  }
  #app .q-music .q-nav{
    position: relative;
    left: 135px;
    text-align: left;
    top: -15px;
  }
  a{
    text-decoration: none;
  }
  #app .q-music .q-nav li{
    text-align: center;
    font-family: -webkit-body
  }
  .q-music li a{
    color: #42b983;
  }
.song-detail .lyric-wrapper{
  height: 515px !important;
}
.loginYes{
  display: block;
}
img{
    max-width: 100%;
}
.name{
  color: red !important;
}
.hidden{
    display: none;
}
.user_name{
  display: inline-block;
  width: 100px;
  margin-right: 20px;
}
</style>
