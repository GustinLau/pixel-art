import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueCropper from 'vue-cropper'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small' })
Vue.use(VueCropper)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
