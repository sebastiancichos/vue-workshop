import Vue from 'vue';
import Vuex from 'vuex';
import {getAllProducts, getProductById, updateProduct} from './productService';

Vue.use(Vuex);

const withId = (id) => (el) => el.id === id;

export default new Vuex.Store({
  state: {
    products: [],
    productsStatus: {},
    currentProductStatus: {},
  },
  getters: {
    currentPageNumber: (state, getters, rootState) => +rootState.route.query.page || 1,
    currentProductId: (state, getters, rootState) => +rootState.route.params.productId,
    products: (state) => state.products,
    productsStatus: (s) => s.productsStatus,
    currentProduct: (s, g) => s.products.find(withId(g.currentProductId)),
    currentProductStatus: (s) => s.currentProductStatus,
  },
  mutations: {
    updateProducts(state, newProducts) {
      state.products = newProducts;
    },
    changeProductsStatus(state, newProductsStatus) {
      state.productsStatus = newProductsStatus;
    },
    changeCurrentProductStatus(state, newCurrentProductStatus) {
      state.currentProductStatus = newCurrentProductStatus;
    },
    updateOrAddProduct(state, updatedProduct) {
      const productIdx = state.products.findIndex(withId(updatedProduct.id));
      if (productIdx >= 0) {
        state.products.splice(productIdx, 1, updatedProduct);
      } else {
        state.products.push(updatedProduct);
      }
    }
  },
  actions: {
    updateProducts({ commit }, newProducts) {
      commit("updateProducts", newProducts);
      commit("changeProductsStatus", { loading: false });
    },
    fetchProducts({ commit, dispatch, getters }) {
      commit("changeProductsStatus", { loading: true });
      return getAllProducts(getters.currentPageNumber)
        .then((products => dispatch("updateProducts", products)))
        .catch((e) => {
          dispatch("updateProducts", []);
          commit("changeProductsStatus", { error: e });
        });
    },
    updateOrAddProduct({ commit }, product) {
      commit("updateOrAddProduct", product);
    },
    fetchCurrentProduct({ commit, dispatch, getters }) {
      commit("changeCurrentProductStatus", { loading: true });
      return getProductById(getters.currentProductId)
        .then((product => {
          dispatch("updateOrAddProduct", product);
          commit("changeCurrentProductStatus", { loading: false });
        }))
        .catch((e) => commit("changeCurrentProductStatus", { error: e }));
    },
  }
});
