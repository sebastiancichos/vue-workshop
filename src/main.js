import Vue from 'vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import { sync } from 'vuex-router-sync';

import store from './store';
import App from './App';
import ProductsList from './components/ProductstList';
import ProductDetails from './components/ProductDetails';
import ProductForm from './components/ProductForm';

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

const idAsNumber = (r) => ({ id: +r.params.id });

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: ProductsList
    },
    {
      path: '/product/:productId',
      component: ProductDetails,
    },
    {
      path: '/product/:id/edit',
      component: ProductForm,
      props: idAsNumber
    }
  ]
});

sync(store, router);

window.app = new Vue({
  el: '#app',
  template: '<App ref="app"/>',
  components: {App},
  router,
  store
});
