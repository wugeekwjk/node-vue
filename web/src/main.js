import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/scss/style.scss'
import './assets/iconfont/iconfont.css'
import router from './router'

import Card from './components/Card.vue'
Vue.component('MCard',Card)
import ListCard from './components/ListCard.vue'
Vue.component('MListCard',ListCard)

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

import axios from 'axios'
const http = axios.create({
  baseURL:process.env.VUE_APP_URL_API || '/web/api'
  // baseURL:'http://localhost:3000/web/api'
})
Vue.prototype.$http = http


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

