import Vue from 'vue'
import App from './App.vue'
import ScrollView from 'vue-scrollview'

Vue.config.productionTip = false
Vue.use(ScrollView)

new Vue({
  render: h => h(App),
}).$mount('#app')
