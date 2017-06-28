<template>
  <div>
    <p>
      <router-link class="btn" :to="{ path: '/', query: { page: page - 1 } }" v-show="page > 1">Previous page
      </router-link>
      {{ page }}
      <router-link class="btn" :to="{ path: '/', query: { page: page + 1 } }" v-show="products.length > 0">Next page
      </router-link>
    </p>

    <template v-if="isError">
      <span class="lozenge">ERROR</span> Sorry, could not load the products. Try a different page.
    </template>
    <template v-else>
      <div v-show="isLoading" class="spinner"></div>
      <section v-show="!isLoading">
        <ul class="product-list">
          <product-list-item
            v-for="product in products"
            :key="product.id"
            :product="product"/>
        </ul>
      </section>
    </template>
  </div>
</template>

<script>
  import {getAllProducts} from '/src/productService';
  import ProductListItem from "./ProductsListItem";

  export default {
    props: ["page"],
    data() {
      return {
        products: [],
        isLoading: true
      }
    },
    created() {
      this.reloadProducts();
    },
    methods: {
      reloadProducts() {
        this.isLoading = true;
        this.isError = false;
        getAllProducts(this.page)
          .then((data) => this.products = data)
          .catch(() => {
            this.products = [];
            this.isError = true
          })
          .then(() => this.isLoading = false);
      }
    },
    computed: {
      product() {
        return (this.products.length > 0) ? this.products[0] : {};
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
