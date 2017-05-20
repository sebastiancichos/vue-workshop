const component = {
  data() {
    // default data
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
    // end default data
  },
  // validations
  validations: {
    name: {required},
    description: {required},
    photo: {required},
    color: {required},
    materials: {required},
    department: {required},
    inStock: {required, numeric},
    price: {required, numeric}
  },
  // end validations
};

const x =
// update data after fetch
(p) => {
  this.name = p.name || "";
  this.description = p.description || "";
  this.photo = p.photo || "";
  this.color = p.color || "#ffffff";
  this.materials = p.materials || [];
  this.department = p.department || "";
  this.inStock = p.inStock || 0;
  this.price = p.price || 0;
};
// end update data after fetch
