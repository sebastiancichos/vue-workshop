import Vue from 'vue'
import Vuelidate from 'vuelidate';
import VueRouter from 'vue-router';
import App from './App'
import ProductsList from './components/ProductstList';
import ProductDetails from './components/ProductDetails.vue';
import ProductForm from './components/ProductForm.vue';
import store from './store';
import { sync } from 'vuex-router-sync';

Vue.use(Vuelidate);
Vue.use(VueRouter);

Vue.config.productionTip = false;

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

const withId = (r) =>  ({ id: +r.params.id });
const router = new VueRouter({
  routes: [
    { path: "/", component: ProductsList },
    { path: "/product/:id", component: ProductDetails, props: withId },
    { path: "/product/:id/edit", component: ProductForm, props: withId },
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
