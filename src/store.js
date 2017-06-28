import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: []
  },
  getters: {
    products: (state) => state.products
  },
  actions: {
    updateProducts ({ commit }, products) {
      commit('updateProducts', products);
    }
  },
  mutations: {
    updateProducts(state, newProducts) {
      state.products = newProducts;
    }
  }
});
