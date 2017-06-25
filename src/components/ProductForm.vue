<template>
  <form action="#" class="box product-edit">
    <h2>Edit product</h2>

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

    <button :disabled="$v.$invalid" class="btn">Save product</button>
    <span v-show="$v.$invalid" class="lozenge">All fields are required</span>
  </form>
</template>

<script>
  import {required, numeric} from 'vuelidate/lib/validators'

  export default {
    props: {
      product: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        name: this.product.name || "",
        description: this.product.description || "",
        photo: this.product.photo || "",
        color: this.product.color || "#ffffff",
        materials: this.product.materials || [],
        department: this.product.department || "",
        inStock: this.product.inStock || 0,
        price: this.product.price || 0,
      }
    },
    watch: {
      product() {
        this.name = this.product.name || "";
        this.description = this.product.description || "";
        this.photo = this.product.photo || "";
        this.color = this.product.color || "#ffffff";
        this.materials = this.product.materials || [];
        this.department = this.product.department || "";
        this.inStock = this.product.inStock || 0;
        this.price = this.product.price || 0;
      }
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
