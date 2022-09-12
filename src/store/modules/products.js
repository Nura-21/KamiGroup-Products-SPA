import mutations from "@/store/mutations";
import productsApi from "@/services/products.api";
const { PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT } = mutations;

const productsStore = {
  namespaced: true,
  state: {
    products: {},
  },
  getters: {
    products: ({ products }) => products,
  },
  mutations: {
    [PRODUCTS](state, value) {
      state.products = value;
    },
    [ADD_PRODUCT](state, value) {
      Object.assign(state.products, value);
    },
    [DELETE_PRODUCT](state, id) {
      const itemIndex = state.products.findIndex((item) => item.id === id);
      if (itemIndex > -1) {
        delete state.products[itemIndex];
      }
    },
    [EDIT_PRODUCT](state, id, changes = "Edited Product Title") {
      const itemIndex = state.products.findIndex((item) => item.id === id);
      if (itemIndex > -1) {
        state.products[id].name = changes;
      }
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const request = await axios.get(`/products`);
        // console.log(request);
        commit(PRODUCTS, request);
      } catch (err) {
        console.log(err);
      }
    },

    async removeProduct({ commit, dispatch }, id) {
      try {
        await axios.delete(`/products/${id}`);
        commit(DELETE_PRODUCT, id);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("fetchProducts");
      }
    },

    async addProduct({ commit, dispatch }, newProduct) {
      try {
        const response = await axios.post(`/products`, newProduct);
        console.log(response);
        commit(ADD_PRODUCT, response);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("fetchProducts");
      }
    },

    async editProduct({ dispatch }, { editedObject, id }) {
      try {
        await axios.put(`/products/${id}`, editedObject);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("fetchProducts");
      }
    },
  },
};

export default productsStore;
