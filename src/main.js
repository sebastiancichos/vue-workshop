import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false;


Vue.filter(
  "asCurrency",
  (price) => '$' + (+price).toFixed(2)
);

window.app = new Vue({
  el: '#app',
  template: '<App ref="app"/>',
  components: { App }
});
