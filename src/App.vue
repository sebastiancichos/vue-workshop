<template>
  <div id="app">
    <navbar />

    <products-list
      class="container"
      v-bind="{ products, isLoading }"
      :currentPage="page"
      @previous="onClickPrevious"
      @next="onClickNext"
    />

    <div class="container">
      <product-details :product="product" />
    </div>

    <div class="container">
      <product-form :product="product" />
    </div>

  </div>
</template>

<script>
  import {getAllProducts} from './productService';
  import Navbar from './components/Navbar';
  import ProductsList from './components/ProductstList';
  import ProductDetails from './components/ProductDetails';
  import ProductForm from './components/ProductForm';

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
        if (this.page > 0) {
          this.page = this.page - 1;
        }
      },
      reloadProducts() {
        this.isLoading = true;
        getAllProducts(this.page)
          .then((data) => this.products = data)
          .catch(() => console.log("Error fetching products, this should never happen :D"))
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
      Navbar,
      ProductsList,
      ProductDetails,
      ProductForm
    }
  }
</script>

<style lang="scss">
  @import "./assets/style";
</style>
