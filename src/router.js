import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import ProductsList from './components/ProductstList';
import ProductDetails from './components/ProductDetails';
import ProductForm from './components/ProductForm';

export const router = {
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
      path: '/product/:productId/edit',
      component: ProductForm,
    }
  ]
};

export default new VueRouter(router);
