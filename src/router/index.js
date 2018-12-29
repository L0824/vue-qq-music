import Vue from 'vue'
import Router from 'vue-router'
import Music from '../components/Music'
import Detail from '../components/Detail'
import Qmusic from '../components/Qmusic'
import Singer from '../components/qmusic/Singer'
import SingerDetail from '../components/qmusic/SingerDetail'
import Search from '../components/Qsearch'
import Toplist from '../components/Toplist'
import Playlist from '../components/Playlist'
import Mvlist from '../components/Mvlist'
import Album from '../components/Album'
import Home from '../components/Home'
import Digital from '../components/Digital'
import SongDetail from '../components/qmusic/SongDetail'
import AlbumDetail from '../components/qmusic/AlbumDetail'
import CompanyDetail from '../components/qmusic/CompanyDetail'
import PlaylistDetail from '../components/qmusic/PlaylistDetail'
import DegitalDetail from '../components/qmusic/DigitalDetail'
import Register from '../components/Register'
import Login from '../components/Login'
import RegisterSuccess from '../components/RegisterSuccess'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      component: Qmusic
    },
    {
      path: '/music',
      component: Music
    },
    {
      path: '/qmusic',
      component: Qmusic,
      // 子路由
      children: [
        {
          path: '/qmusic/singer',
          // singer（歌手）组件
          component: Singer,
          // singer 的子路由  singer详情页面
          children: [
            {
              path: ':id',
              component: SingerDetail
            }
          ]
        }, {
          path: '/qmusic/search',
          // 搜索组件
          component: Search
        }, {
          path: '/qmusic/toplist',
          // 排行榜组件
          component: Toplist
        }, {
          path: '/qmusic/playlist',
          // 分类歌单组件
          component: Playlist
        },{
          path: '/qmusic/mv',
          // MV组件
          component: Mvlist
        }, {
          path: '/qmusic/album',
          // 专辑组件
          component: Album
        }, {
          path: '/qmusic/home',
          // 主页组件
          component: Home
        }, {
          path: '/qmusic/digital',
          // 数字专辑
          component: Digital
        }, {
          path: '/qmusic/songdetail/:id',
          // 歌曲详情
          component: SongDetail
        }, {
          path: '/qmusic/albumdetail/:id',
          // 专辑详情
          component: AlbumDetail
        }, 
         {
          path: '/qmusic/register',
          component: Register
        },
        {
          path: '/qmusic/RegisterSuccess',
          component: RegisterSuccess
        },
        {
          path: '/qmusic/login',
          component: Login
        },
        {
          path: '/qmusic/companydetail/:id',
          // 唱片公司详情
          component: CompanyDetail
        }, {
          path: '/qmusic/playlistdetail/:id',
          component: PlaylistDetail
        }, {
          path: '/qmusic/degitaldetail/:id',
          component: DegitalDetail
        }
      ]
    },
    {
      path: '/detail/:id',
      component: Detail
    }
  ]
})
