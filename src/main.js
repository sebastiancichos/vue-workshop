import Vue from 'vue'
import Vuelidate from 'vuelidate';

import App from './App'

Vue.config.productionTip = false;
Vue.use(Vuelidate);

Vue.filter(
  "asCurrency",
  (price) => '$' + (+price).toFixed(2)
);

Vue.directive(
  "style-when-broken", function (el) {
    el.classList.remove("broken-image");
    if (!el.onerror) {
      el.onerror = () => {
        el.classList.add("broken-image");
      };
    }
  }
);

window.app = new Vue({
  el: '#app',
  template: '<App ref="app"/>',
  components: {App}
});
