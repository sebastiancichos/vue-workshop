<template>
  <div>
    <p>
      <a class="btn" href="#less" @click.prevent="onClickPrevious">Previous page</a>
      {{ page }}
      <a class="btn" href="#more" @click.prevent="onClickNext">Next page</a>
    </p>

    <div v-show="isLoading" class="spinner"></div>
    <section v-show="!isLoading">
      <ul class="product-list">
        <product-list-item
          v-for="product in products"
          :key="product.id"
          :product="product"/>
      </ul>
    </section>
  </div>
</template>

<script>
  import {getAllProducts} from '../productService';
  import ProductListItem from "./ProductsListItem";

  export default {
    data() {
      return {
        page: 1,
        products: [],
        isLoading: true
      }
    },
    created() {
      this.reloadProducts();
    },
    methods: {
      onClickNext() {
        this.page = this.page + 1;
      },
      onClickPrevious() {
        if (this.page > 1) {
          this.page = this.page - 1;
        }
      },
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
