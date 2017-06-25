<template>
  <div>
    <p v-show="!isLoading && !(isFirstPage && isLastPage)">
      <router-link :to="{ path: '/', query: { page: page - 1 } }" v-show="!isFirstPage" class="btn">Previous page</router-link>
      {{ page }}
      <router-link :to="{ path: '/', query: { page: page + 1 } }" v-show="!isLastPage" class="btn">Next page</router-link>
    </p>

    <div v-show="isLoading" class="spinner"></div>
    <section v-show="!isLoading">
      <ul v-if="products.length" class="product-list">
        <product-list-item
          v-for="product in products"
          :key="product.id"
          :product="product"/>
      </ul>
      <p v-else>No products to be shown. Try a different page.</p>
    </section>
  </div>
</template>

<script>
  import {getAllProducts} from '../productService';
  import ProductListItem from "./ProductsListItem";

  export default {
    props: {
      page: Number
    },
    data() {
      return {
        products: [],
        isLoading: true
      }
    },
    mounted() {
      this.reloadProducts();
    },
    computed: {
      isFirstPage() {
        return this.page === 1;
      },
      isLastPage() {
        return this.products.length === 0;
      }
    },
    methods: {
      reloadProducts() {
        this.isLoading = true;
        getAllProducts(this.page)
          .then((data) => this.products = data)
          .catch((e) => console.error("Error fetching products, this should never happen :D", e))
          .then(() => this.isLoading = false);
      }
    },
    watch: {
      page() {
        this.reloadProducts();
      }
    },
    components: {
      ProductListItem
    }
  }
</script>

<style lang="scss">
  @import "../assets/style";

  .product-list {
    list-style: none;
    padding: 0;
    margin: 0 0 0 (-$gutter);
    display: flex;
    flex-wrap: wrap;

    &--product {
      $inRow: 4;
      flex-basis: calc(#{100%/$inRow} - #{$gutter});
    }
  }
</style>
