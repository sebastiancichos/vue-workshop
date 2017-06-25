import Vue from 'vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';

import App from './App'
import ProductsList from './components/ProductstList';

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueRouter);

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

const router = new VueRouter({
  routes: [
    { path: '/', component: ProductsList },
  ]
});

window.app = new Vue({
  el: '#app',
  template: '<App ref="app"/>',
  components: {App},
  router
});
