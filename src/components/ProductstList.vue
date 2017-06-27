<template>
  <div>
    <p>
      <a class="btn" href="#less" @click.prevent="$emit('previous')">Previous page</a>
      {{ currentPage }}
      <a class="btn" href="#more" @click.prevent="$emit('next')">Next page</a>
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
  import ProductListItem from "./ProductsListItem";

  export default {
    props: {
      currentPage: {
        type: Number,
        default: 0
      },
      isLoading: Boolean,
      products: Array
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
