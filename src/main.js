import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false;

window.app = new Vue({
  el: '#app',
  template: '<App ref="app"/>',
  components: { App }
});
