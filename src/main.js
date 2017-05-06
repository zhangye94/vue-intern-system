// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Vuex)

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.config.productionTip = false


const store = new Vuex.Store({
  state: {
    count: 0,
    adminleftnavnum:"1"  //管理后台左侧导航
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
