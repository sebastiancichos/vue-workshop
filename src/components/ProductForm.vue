<template>
  <form action="#" @submit.prevent="submit" class="box product-edit">
    <template v-if="status.loading || saveStatus.loading">
      <div class="spinner"></div>
    </template>
    <template v-else-if="status.error">
      <span class="lozenge">ERROR</span>
      There was an error when fetching the product.
    </template>
    <template v-else>
      <h2>Edit product</h2>

      <p v-if="saveStatus.error">
        <span class="lozenge">ERROR</span> Could not save the product.
      </p>

      <div class="form-row">
        <label for="edit-name">Name</label>
        <input id="edit-name" v-model.trim="name" @change="$v.name.$touch()" type="text"/>
      </div>

      <div class="form-row">
        <label for="edit-photo">Photo</label>
        <input id="edit-photo" v-model.trim.lazy="photo" @change="$v.photo.$touch()" type="text"/>
        <img class="photo-preview" :src="photo" v-style-when-broken/>
      </div>

      <div class="form-row">
        <label for="edit-desc">Description</label>
        <textarea id="edit-desc" v-model="description" @change="$v.description.$touch()"></textarea>
      </div>

      <div class="form-row">
        <label for="edit-color">Color</label>
        <input type="color" id="edit-color" v-model.trim="color" @input="$v.color.$touch()"/>
      </div>

      <div class="form-row">
        <label>Materials</label>
        <div>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Steel"/> Steel</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Wooden"/> Wooden</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Concrete"/> Concrete</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Plastic"/> Plastic</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Cotton"/> Cotton</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Granite"/> Granite</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Rubber"/> Rubber</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Metal"/> Metal</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Soft"/> Soft</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Fresh"/> Fresh</label>
          <label><input type="checkbox" v-model="materials" @change="$v.materials.$touch()" value="Frozen"/> Frozen</label>
        </div>
      </div>

      <div class="form-row">
        <label for="edit-departmnet">Department</label>
        <select id="edit-departmnet" v-model="department" @input="$v.department.$touch()">
          <option disabled value="">Wybierz dział...</option>
          <option>Books</option>
          <option>Movies</option>
          <option>Music</option>
          <option>Games</option>
          <option>Electronics</option>
          <option>Computers</option>
          <option>Home</option>
          <option>Garden</option>
          <option>Tools</option>
          <option>Grocery</option>
          <option>Health</option>
          <option>Beauty</option>
          <option>Toys</option>
          <option>Kids</option>
          <option>Baby</option>
          <option>Clothing</option>
          <option>Shoes</option>
          <option>Jewelery</option>
          <option>Sports</option>
          <option>Outdoors</option>
          <option>Automotive</option>
          <option>Industrial</option>
        </select>
      </div>

      <div class="form-row">
        <label for="edit-stock">In stock</label>
        <input type="number" v-model.number="inStock" @input="$v.inStock.$touch()" id="edit-stock"/>
      </div>

      <div class="form-row">
        <label for="edit-price">Price</label>
        <input type="number" v-model.number="price" @input="$v.price.$touch()" id="edit-price"/>
      </div>

      <button :disabled="$v.$invalid" type="submit" class="btn">Save product</button>
      <span v-show="$v.$invalid" class="lozenge">All fields are required</span>
    </template>
  </form>
</template>

<script>
  import {required, numeric} from 'vuelidate/lib/validators';
  import {mapGetters, mapActions} from 'vuex';

  export default {
    data() {
      return {
        name: "",
        description: "",
        photo: "",
        color: "#ffffff",
        materials: [],
        department: "",
        inStock: 0,
        price: 0
      }
    },
    created() {
      this.fetchCurrentProduct();
    },
    computed: {
      ...mapGetters({
        id: "currentProductId",
        status: "currentProductStatus",
        currentProduct: "currentProduct",
        saveStatus: "saveProductStatus"
      })
    },
    watch: {
      currentProductId() {
        this.fetchCurrentProduct();
      },
      currentProduct() {
        const p = this.currentProduct;

        this.name = p.name || "";
        this.description = p.description || "";
        this.photo = p.photo || "";
        this.color = p.color || "#ffffff";
        this.materials = p.materials || [];
        this.department = p.department || "";
        this.inStock = p.inStock || 0;
        this.price = p.price || 0;
      }
    },
    methods: {
      submit() {
        if (!this.$v.$invalid) {
          this.saveProduct({
            id: this.id,
            name: this.name,
            description: this.description,
            photo: this.photo,
            color: this.color,
            materials: this.materials,
            department: this.department,
            inStock: this.inStock,
            price: this.price
          })
            .then(() => {
              if (!this.saveStatus.error) {
                this.$router.push("/product/" + this.id)
              }
            });
        }
      },
      ...mapActions([
        "fetchCurrentProduct",
        "saveProduct"
      ])
    },
    validations: {
      name: {required},
      description: {required},
      photo: {required},
      color: {required},
      materials: {required},
      department: {required},
      inStock: {required, numeric},
      price: {required, numeric}
    }
  }
</script>

<style lang="scss">
  @import "../assets/style";

  .product-list--product {
    @extend .box;
    display: flex;
    flex-direction: column;

    margin-left: $gutter;

    &--description {
      font-size: asRem(14px);
    }

    &--caption {
      flex: 1 1 auto;
    }

    @include productCommons();
  }
</style>
