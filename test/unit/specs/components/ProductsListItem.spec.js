import Vue from 'vue'
import ProductsListItem from '/src/components/ProductsListItem.vue';

function instantiateWithProduct(product) {
  const Constructor = Vue.extend(ProductsListItem);
  const vm = new Constructor({
    propsData: {
      product: product
    }
  }).$mount();
  return vm
}

// Visit http://chaijs.com/api/bdd/ to check out available assertions

describe('ProductsListItem.vue', () => {

  describe('Highlights product', () => {

    it('should be highlighted if price is below 300', () => {
      const vm = instantiateWithProduct({ price: 299 });
      expect(vm.$el.classList.contains("highlight")).to.be.true;
    });

    it('should not be highlighted if price is 300 or more', () => {
      const vm = instantiateWithProduct({ price: 300 });
      expect(vm.$el.classList.contains("highlight")).to.be.false;
    });

    it('updates the the highlighting when product changes', (done) => {
      const vm = instantiateWithProduct({ price: 299 });
      vm.product.price = 300;

      expect(vm.$el.classList.contains("highlight")).to.be.true;

      Vue.nextTick(() => {
        expect(vm.$el.classList.contains("highlight")).to.be.false;
        done()
      });
    });

  });
});
