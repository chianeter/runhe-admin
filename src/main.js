import Vue from 'vue'
import App from './App.vue'
import router from '@/permission'
import  ElementUI  from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'//全局引入
import 'normalize.css'
import axios from "@/axios"
import Cookie from 'js-cookie'
import store from '@/store'

/*
res.data
  {
    status:'error|success'
    msg:''
  }
*/


Vue.use(ElementUI);//按需加载引入到全局
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$cookie = Cookie
Vue.prototype.$EventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
