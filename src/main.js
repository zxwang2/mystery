// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js'
import {server} from './providers/http-service'
import BaiduMap from 'vue-baidu-map'

//定义全局变量
Vue.prototype.$server=server;

Vue.config.productionTip = false;
Vue.use(BaiduMap, {
  ak: 'QNAlcqh6MbeeK0lhjM6wNj2L4HnnXXj2'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
