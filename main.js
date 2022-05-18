import App from './App'

// #ifdef H5
const DeviceType = 'H5'
//#endif

// #ifdef MP-WEIXIN
const DeviceType = 'WEIXIN'
//#endif

// #ifndef VUE3
import Vue from 'vue'


Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.DeviceType = DeviceType
const app = new Vue({
    ...App
})
app.$mount()
// #endif



// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
