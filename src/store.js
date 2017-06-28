import Vue from 'vue';
import Vuex from 'vuex';
import {getAllProducts} from '/src/productService';

Vue.use(Vuex);

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
    updateProducts ({ commit }, products) {
      commit('updateProducts', products);
    },
    fetchCurrentPageProducts({ dispatch, getters, commit } ) {
      commit("updateProductsStatus", {loading: true});
      getAllProducts(getters.currentPageNumber)
        .then((p) => dispatch("updateProducts", p))
        .catch(() => commit("updateProductsStatus", {error: true}))
        .then(() => commit("updateProductsStatus", {loading: false}));
    }
  },
  mutations: {
    updateProducts(state, newProducts) {
      state.products = newProducts;
    },
    updateProductsStatus(state, newStatus) {
      state.productsStatus = newStatus;
    }
  }
});
