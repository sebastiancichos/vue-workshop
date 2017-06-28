import Vue from 'vue';
import Vuex from 'vuex';
import {getAllProducts} from '/src/productService';

Vue.use(Vuex);

const UPDATE_PRODUCTS = "updateProducts";
const UPDATE_PRODUCTS_STATUS = "updateProductsStatus";

export default new Vuex.Store({
  state: {
    products: [],
    productsStatus: {}
  },
  getters: {
    currentPageNumber: (state, getters, rootState) => +rootState.route.query.page || 1,
    products: (state, getters, rootState) => state.products,
    productsStatus: (state, getters, rootState) => state.productsStatus
  },
  actions: {
    [UPDATE_PRODUCTS] ({ commit }, products) {
      commit(UPDATE_PRODUCTS, products);
    },
    fetchCurrentPageProducts({ dispatch, getters, commit } ) {
      commit(UPDATE_PRODUCTS_STATUS, {loading: true});
      getAllProducts(getters.currentPageNumber)
        .then((p) => dispatch(UPDATE_PRODUCTS, p))
        .catch(() => commit(UPDATE_PRODUCTS_STATUS, {error: true}))
        .then(() => commit(UPDATE_PRODUCTS_STATUS, {loading: false}));
    }
  },
  mutations: {
    [UPDATE_PRODUCTS](state, newProducts) {
      state.products = newProducts;
    },
    [UPDATE_PRODUCTS_STATUS](state, newStatus) {
      state.productsStatus = newStatus;
    }
  }
});
