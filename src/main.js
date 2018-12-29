import Vue from 'vue'
import App from './App'
import router from './router/index'
import Dialog from './assets/js/vue-dialog'
import Resource from "vue-resource"
import VueLazyload from 'vue-lazyload'
import VeeValidate from 'vee-validate';
import store from './store/store'
import './assets/css/dialog.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.use(Dialog)
Vue.use(Resource)
Vue.use(VeeValidate)
Vue.use(VueLazyload,{
  preload:1.2,
  loading:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497847008067&di=2abd988a7d0e2e6bc7e24dd36707e2e8&imgtype=0&src=http%3A%2F%2Fimages0.cnblogs.com%2Fblog%2F694143%2F201507%2F062245453466958.gif",
  attempt:1
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
