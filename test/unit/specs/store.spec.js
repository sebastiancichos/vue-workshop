// !! at the start means "disable all loaders from the global config";
// vue?inject! means "use the vue loader, and pass in the ?inject query".
// This tells vue-loader to compile the component in dependency-injection mode.
// const ExampleInjector = require('!!vue?inject!/src/components/Navbar.vue');
const StoreInjector = require('inject-loader!/src/store');
const Vuex = require('vuex').default;

describe("Store", () => {
  let getAllProducts;
  let getProductById;
  let updateProduct;
  let storeWithMocks;

  beforeEach(() => {
    getAllProducts = sinon.stub().returns(new Promise(() => {}));
    getProductById = sinon.stub().returns(new Promise(() => {}));
    updateProduct = sinon.stub().returns(new Promise(() => {}));
    storeWithMocks = StoreInjector({
      // the path has to be string-equal to the one in the component we are injecting mocks into
      './productService': {
        getAllProducts,
        getProductById,
        updateProduct
      }
    }).store;
  });

  it('calls service to fetch products', () => {
    Object.assign(storeWithMocks.state, {
      route: {
        query: 1
      }
    });

    const store = new Vuex.Store(storeWithMocks);
    store.dispatch("fetchProducts");

    sinon.assert.calledOnce(getAllProducts);
    sinon.assert.calledWith(getAllProducts, 1);
  });
});
