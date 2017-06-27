<template>
  <div>
    <p v-show="!productsStatus.loading && !(isFirstPage && isLastPage)">
      <router-link :to="{ path: '/', query: { page: page - 1 } }" v-show="!isFirstPage" class="btn">Previous page</router-link>
      {{ page }}
      <router-link :to="{ path: '/', query: { page: page + 1 } }" v-show="!isLastPage" class="btn">Next page</router-link>
    </p>
    <template v-if="productsStatus.error">
      Error fetching products. Refresh the page to try again.
    </template>
    <template v-else>
      <div v-show="productsStatus.loading" class="spinner"></div>
      <section v-show="!productsStatus.loading">
        <ul v-if="products.length" class="product-list">
          <product-list-item
            v-for="product in products"
            :key="product.id"
            :product="product" />
        </ul>
        <p v-else>No products to be shown. Try a different page.</p>
      </section>
    </template>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import {getAllProducts} from '../productService';
  import ProductListItem from "./ProductsListItem/ProductsListItem";

  export default {
    mounted() {
      this.fetchProducts();
    },
    computed: {
      isFirstPage() {
        return this.page === 1;
      },
      isLastPage() {
        return this.products.length === 0;
      },
      ...mapGetters({
        page: "currentPageNumber"
      }),
      ...mapGetters([
        "products",
        "productsStatus"
      ])
    },
    methods: {
      ...mapActions(["fetchProducts"])
    },
    watch: {
      page() {
        this.fetchProducts();
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
