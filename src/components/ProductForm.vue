<template>
  <form action="#" class="box product-edit">
    <h2>Edit product</h2>

    <div class="form-row">
      <label for="edit-name">Name</label>
      <input id="edit-name" v-model.trim="name" @input="$v.name.$touch()" type="text"/>
    </div>

    <div class="form-row">
      <label for="edit-photo">Photo</label>
      <input id="edit-photo" v-model.trim.lazy="photo"  @input="$v.photo.$touch()" type="text"/>
      <img class="photo-preview" :src="photo" v-style-when-broken/>
    </div>

    <div class="form-row">
      <label for="edit-desc">Description</label>
      <textarea id="edit-desc" v-model="description" @input="$v.description.$touch()"></textarea>
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

    <button class="btn" :disabled="$v.$invalid">Save product</button>
    <span class="lozenge" v-if="$v.$invalid">Error - all fields are required</span>
  </form>
</template>

<script>
  import {required, numeric} from 'vuelidate/lib/validators';
  import { getProductById } from '../productService';

  export default {
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        isError: false,
        isLoading: true,
        name: "",
        description: "",
        photo: "",
        color: "#ffffff",
        materials: [],
        department: "",
        inStock: 0,
        price: 0,
      }
    },
    created() {
      this.fetchProduct();
    },
    watch: {
      id() {
        this.fetchProduct();
      }
    },
    methods: {
      fetchProduct() {
        this.isError = false;
        this.isLoading = true;

        getProductById(this.id)
          .then((p) => {
            this.name = p.name || "";
            this.description = p.description || "";
            this.photo = p.photo || "";
            this.color = p.color || "#ffffff";
            this.materials = p.materials || [];
            this.department = p.department || "";
            this.inStock = p.inStock || 0;
            this.price = p.price || 0;
          })
          .catch(() => this.isError = true)
          .then(() => this.isLoading = false);
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

</style>
