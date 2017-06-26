import Vue from 'vue'
import Vuelidate from 'vuelidate';
import { sync } from 'vuex-router-sync';

import styleWhenBroken from './directives/styleWhenBroken';
import asCurrency from './filters/asCurrency';
import store from './store';
import router from './router';
import App from './App';

Vue.config.productionTip = false;
Vue.use(Vuelidate);

Vue.filter("asCurrency", asCurrency);
Vue.directive("style-when-broken", styleWhenBroken);

sync(store, router);

window.app = new Vue({
  el: '#app',
  template: '<App ref="app"/>',
  components: {App},
  router,
  store
});
