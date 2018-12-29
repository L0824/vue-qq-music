<template>
  <div id="app" >
    <!-- <div> -->
      <div class="weather-box">
        <div class="weather-wrapper">
          <div>
            <!-- 时间 2018年？月？日 -->
            <p>{{formatTime}}</p>
           
          </div>
        </div>
        <!-- 用户信息 -->
        <div class="user-info" v-if="userInfo.creator">
          <!-- 用户头像 -->
          <img :src="userInfo.creator.headpic"/>
          <!-- 用户昵称 -->
          <span>{{userInfo.creator.nick}}</span>
        </div>
        
        <!-- 倒计时 -->
        <!-- <p class="down-count"> 离{{year}}年12月31日还有{{downCountText}}</p> -->
      </div>
      <div class="toolbar" ref="toolbar">
        <div class="toolbar-panels">
            <div class="panel-head">
              <a>我的关注</a><span class="close-follow" @click="hideFollow">&times;</span>
            </div>
            <div class="panel-nav clear-fix">
              <!--  -->
              <div class="panel-nav">
               <p class="current">我的音乐</p>
            </div>
            </div>
            <div class="panel-body ">
              <div class="panel panel-music">
                <ul class="ppp">
                  <li v-for="(item,index) in followQmusicArr" :key="item" style="height: 150px" @click="selectItem(item,index,true)">
                      <span class="delete" @click.stop.prevent="removeMusic(index)"></span>
                      <!-- https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497847008067&di=2abd988a7d0e2e6bc7e24dd36707e2e8&imgtype=0&src=http%3A%2F%2Fimages0.cnblogs.com%2Fblog%2F694143%2F201507%2F062245453466958.gif  加载图片的地址 -->
                      <img style="margin-top: 20px" height="100" v-lazy="{'src':item.avatar,'loading':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497847008067&di=2abd988a7d0e2e6bc7e24dd36707e2e8&imgtype=0&src=http%3A%2F%2Fimages0.cnblogs.com%2Fblog%2F694143%2F201507%2F062245453466958.gif'}">
                      <p>{{item.songname}}</p>
                  </li>
                </ul>
                <p v-show="followQmusicArr.length==0">快去关注喜欢的音乐吧！</p>
              </div>
            </div>
        </div>
        <div class="toolbar-tabs">
          <div class="tabs tab-follow" @click.stop="toggleFollow">
            <i></i>
            <em>我的关注</em>
          </div>
          <div class="tabs tab-top" @click="goTop">
            <i></i>
            <em>返回顶部</em>
          </div>
        </div>
      </div>
      <!-- 播放组件 -->
      <v-player ref="player" @getMusic="getMusic"></v-player>
      <!-- 引用 Qmusic 视图 -->
      <router-view></router-view>
    <!-- </div> -->
  </div>
</template>

<script>
  // import getLunarDay from './assets/js/getLunarDay'
  import Player from './components/qmusic/Player'
  import ScrollBar from './assets/js/scrollBar'
  import {addClass,removeClass} from './assets/js/dom'
  import {getProfile} from './api/musicapi'
  import { mapMutations ,mapActions,mapState} from 'vuex'
  import $ from 'jquery'
  var scrollBar = new ScrollBar();

  // 实现横向滚动条
  window.onscroll = function () {
    var bodyHeight = document.getElementsByTagName('body')[0].scrollHeight;
    var times = 1;
    if (bodyHeight > 1000 && bodyHeight < 2000) {
      times = 2.5
    } else if (bodyHeight > 2000 && bodyHeight < 3000) {
      times = 1.57
    } else {
      times = 1.3
    }
    if (bodyHeight > document.getElementsByTagName('body')[0].clientWidth) {
      var height = parseInt(document.getElementsByTagName('body')[0].scrollTop / bodyHeight * 100) * times
      scrollBar.setWidth(height);
    } else {
    }
   
  }
  export default {
    name: 'app',
    data(){
      return {
        area: '',
        // detaileAddress: '',
        formatTime: "",
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        // year: "",
        followQmusicArr:[],
        // lunarDay: "",
        // downCountText: "",
        maxLevel: 25,
        followIndex:0,
        // 左移
        isLeft:false,
      }
    },
    // 计算属性
    computed:{
      // 状态映射 state
      ...mapState([
        'musicList','playing','userInfo'
      ])
    },
    methods: {
      ...mapMutations([
        'setCurrentIndex','setUserInfo'
      ]),
      ...mapActions([
        'selectPlay'
      ]),
      selectItem(itm,index,flag){
        var item={}
        item.musicData=itm
        for(var i=0;i<this.musicList.length;i++){
          if(this.musicList[i]==item){
            this.setCurrentIndex(i)
            return
          }
        }
        this.selectPlay({
          item,
          index,
          flag
        })
      },
      removeMusic(index){
        this.followQmusicArr.splice(index,1);
        localStorage.setItem('followQmusicArr',JSON.stringify(this.followQmusicArr))
        this.$refs.player.getFollowMusic()
      },
      getMusic(){
        if(localStorage.getItem('followQmusicArr')){
          this.followQmusicArr=JSON.parse(localStorage.getItem('followQmusicArr'))
        }
      },
      changeFollow(index){
        this.followIndex=index
        var translate='-'+index*33.3+"%";
        document.querySelector('.panel-body').style.transform=`translate3D(${translate},0,0)`;
        if(index==0&&localStorage.getItem('followQmusicArr')){
          this.followQmusicArr=JSON.parse(localStorage.getItem('followQmusicArr'))
        }
      },
      toggleFollow(){
        if(!this.isLeft){
          addClass(this.$refs.toolbar,'tool-left')
        }else {
          removeClass(this.$refs.toolbar,'tool-left')
        }
        this.isLeft=!this.isLeft
      },
      hideFollow(){
        removeClass(this.$refs.toolbar,'tool-left')
        this.isLeft=false
      },
      // 返回顶部
      goTop(){
//        document.body.scrollTop = 0;        
        var currentPosition,timer;
        timer=setInterval(function(){
          currentPosition=document.documentElement.scrollTop || document.body.scrollTop;
          currentPosition-=10;
          if(currentPosition>0)
          {
            window.scrollTo(0,currentPosition);
          }
          else
          {
            window.scrollTo(0,0);
            clearInterval(timer);
          }
        },1);
      },
      padLeftZero(str){
        return ("00" + str).substr((str + "").length);
      },
      getLocation(){
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(this.showPosition);
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      },
      showPosition(position){
        var point = new BMap.Point(position.coords.longitude, position.coords.latitude);
        var geoc = new BMap.Geocoder();
        var self = this;
        geoc.getLocation(point, function (rs) {
//          console.log(rs);
          var addComp = rs.addressComponents;
          self.detaileAddress = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
          //alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
        });
      }
    },
    components: {
      'v-player':Player

    },
    mounted(){
      if(this.$router.currentRoute.path=='/'){
        // 如果遇到当前路径为 / 就跳转到home页面
        this.$router.push('/qmusic/home')
      }
      this.changeFollow(0);
      var self = this;
      this.getLocation();
      var endTime = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);
      endTime = endTime.getTime();
      setInterval(() => {
        var now = new Date();
        var year = now.getFullYear();
        var month = this.padLeftZero(now.getMonth() + 1);
        var day = this.padLeftZero(now.getDate());
        var week = parseInt(this.padLeftZero(now.getDay()));
        var hour = this.padLeftZero(now.getHours());
        var minute = this.padLeftZero(now.getMinutes());
        var second = this.padLeftZero(now.getSeconds());

        var nowTime = now.getTime();
        this.year = year;
        this.downCountText = Math.floor((endTime - nowTime) / 1000 / 60 / 60 / 24) + "天"
          + Math.floor((endTime - nowTime) / 1000 / 60 / 60 % 24) + "小时"
          + Math.floor((endTime - nowTime) / 1000 / 60 % 60) + "分钟"
          + Math.floor((endTime - nowTime + 2000) / 1000 % 60) + "秒";

        // this.lunarDay = getLunarDay(year, month, day);
        var noonText = hour > 12 ? '下午' : '上午';
        hour = hour >= 13 ? hour - 12 : hour;
        this.formatTime = year + '年' + month + '月' + day + '日 ' + '星期' + this.weeks[week] + ' ' + noonText + ' ' + hour + ":" + minute + ":" + second
      }, 1000)
    }
  }
</script>

<style>
  ul li{
    list-style: none;
  }
  body{
        background: #151515;
  }
  .user-info{
    position: absolute;
    text-align: center;
    left: -255px;
    top:0px;
    width: 200px;
  }
  .user-info img{
    width: 60px;
    display: block;
    border-radius: 50%;
    margin-left: 65px;
  }
  .clear-fix:after{
    content:".";
    display:block;
    height:0;
    clear:both;
    visibility:hidden
  }
  .clear-fix{
    *+height:1%;
  }
  .panel-music li{
    cursor: pointer;
  }
  body{
    padding-bottom: 60px;
  }
  .panel li .delete{
    width: 9px;
    height: 11px;
    background: url("./assets/img/delete.png");
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 10px;
    background-size: cover;
    display: none;
  }
  .panel p{
    text-align: center;
  }
  .panel ul{
    margin-left: 10px;
    margin-top: 10px;
  }
  .panel li{
    transition: all .5s;
    width: 100px;
    height: 130px;
    background: #fff;
    float: left;
    text-align: center;
    margin-bottom: 10px;
    margin-right: 10px;
    padding: 5px;
    position: relative;
  }
  .panel li:hover .delete{
    display: inline-block;
  }
  .panel li p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #42b983;
  }
  .panel-body{
    width: 810px;
    height: 100%;
    transition: all .5s;
  }
  .panel-body .panel{
    width:270px;
    float: left;
    text-align: left;
    height: 100%;
    overflow-y: auto;
  }
  .panel-nav{
    width:270px;
  }
  .panel-nav p{
    height: 37px;
    border-bottom: 3px solid #FFFFFF;
    background: #fff;
    width: 100%;
    float: left;
    text-align: center;
    line-height: 37px;
    cursor: pointer;
  }
  .panel-nav p.current{
    border-color: #ff6633;
    color: #ff6633;
  }
  .panel-head{
    height: 40px;
    line-height: 40px;
    text-align: left;
    text-indent: 16px;
    color: rgb(94, 80, 80);
  }
  .panel-head a{
    color: rgb(94, 80, 80);
  }
  .panel-head .close-follow{
    position: absolute;
    right: 10px;
    top:0px;
    font-size: 30px;
    transition: all .5s;
    cursor: pointer;
    display: inline-block;
    text-align: center;
    text-indent: 0;
  }
  .panel-head .close-follow:hover{
    transform: rotate(180deg);
  }
  
  .toolbar {
    position: fixed;
    right: 0px;
    top: 0;
    width: 0;
    height: 100%;
    border-right: 6px solid #42b983;
    -webkit-transition: right .3s ease-in-out 0s;
    -moz-transition: right .3s ease-in-out 0s;
    transition: right .3s ease-in-out 0s;
    z-index: 100;
  }
  .tool-left{
    right: 270px;
  }
  .tool-start{
    right: 0px;
  }
  .toolbar-panels {
    position: absolute;
    left: 6px;
    top: 0;
    width: 270px;
    height: 100%;
    z-index: 200;
    background: #eceaea;
    overflow: hidden;
  }

  .toolbar-tabs {
    position: absolute;
    top: 50%;
    left: -29px;
    width: 29px;
  }

  .toolbar-tabs .tabs {
    position: relative;
    width: 38px;
    height: 29px;
    background: #42b983;
    border-radius: 2px;
    left: 0px;
    z-index: 100;
    transition: all .5s;
    margin-top: 2px;
    cursor: pointer;
  }

  .toolbar-tabs .tabs img {
    position: absolute;
    transition: all .5s;
    min-width: 90px !important;
    left: -134px;
    transform: scale(0);
    top: -90px;
    transform-origin: right bottom;
    opacity: 0;
  }

  .toolbar-tabs .tabs:hover img {
    left: -92px;
    transform: scale(1);
    opacity: 1;
  }

  .toolbar-tabs .tabs:hover em {
    left: -92px;
    background: #ff6633;
  }

  .toolbar-tabs .tabs:hover, .toolbar-tabs .tabs:hover i {
    background-color: #ff6633;
  }

  .toolbar-tabs .tabs i {
    transition: all .5s;
    width: 29px;
    height: 29px;
    background: url("./assets/img/follow-icon.png") no-repeat;
    background-position: 2px;
    background-color: #42b983;
    background-size: 17px 15px;
    border-radius: 2px;
    position: absolute;
    display: inline-block;
    z-index: 111;
    left: 6px;
    top: 0;
  }

  .toolbar-tabs .tab-top i {
    background: url("./assets/img/top-icon.png") no-repeat;
    background-position: 1px;
  }
  .toolbar-tabs .tabs em {
    transition: all .5s;
    width: 96px;
    height: 29px;
    background: #42b983;
    position: absolute;
    display: inline-block;
    font-style: normal;
    left: 34px;
    z-index: 100;
    top: 0;
    color: #fff;
    border-radius: 4px;
    line-height: 29px;
  }

  .fadeScale-enter-active, .fadeScale-leave-active {
    transition: all .5s;
  }

  .fadeScale-enter .game-wrapper, .fadeScale-leave-active .game-wrapper, .fadeScale-enter .calculator, .fadeScale-leave-active .calculator {
    transform: scale(0.5);
    opacity: 0
  }
  .animation_paused {
    -webkit-animation-play-state: paused;
    -moz-animation-play-state: paused;
    -ms-animation-play-state: paused;
    animation-play-state: paused;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 70px;
    user-select: none;
  }

  body {
    overflow-x: hidden;
  }

  .weather-box {
    position: absolute;
    width: 405px;
    color: #FFFFFF;
    right: 0px;
    top: 30px;
    text-align: left;
  }

  .weather-wrapper {
    display: flex;
  }

  .down-count {
    text-indent: 15px;
    background: #2ad487;
    width: 92%;
    border-radius: 4px;
    margin-top: 20px;
  }
  .weather-wrapper .weather-left {
  text-align: center;
  vertical-align: middle;
  border-right: 1px solid #2ad487;
  padding-right: 10px;
  margin-right: 10px;
  font-size: 30px;
  line-height: 84px;
}

  .nav {
    clear: both;
    height: 55px;
    margin-left: 600px;
  }

  .nav li {
    float: left;
    margin:-10px 20px;
    vertical-align: middle;
  }

  .nav li a {
    color: #2ad487;
  }

  .router-link-active {
    background: #fff;
    padding: 2px 6px;
    border-radius: 2px;
  }

  .custom-classes-transition-enter-active, .custom-classes-transition-leave-active {
    transition: all .5s
  }

  .custom-classes-transition-enter {
    transform: translateX(100%);
  }

  .custom-classes-transition-leave-active {
    transform: translateX(-100%);
  }
  .ppp{
    padding-left: 10px !important;
  }
</style>
