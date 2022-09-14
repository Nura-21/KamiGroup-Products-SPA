import mutations from "@/store/mutations";
import productsApi from "@/services/products.api";
const { PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, CHANGE_PAGE } =
  mutations;

import { showToaster } from "@/helpers/toaster";

const productsStore = {
  namespaced: true,
  state: {
    products: [],
    perPage: 10,
    page: 1,
    count: 0,
  },
  getters: {
    products: ({ products }) => products,
    product:
      ({ products }) =>
      (id) =>
        products.find((i) => i.id === id),
    perPage: ({ perPage }) => perPage,
    page: ({ page }) => page,
  },
  mutations: {
    [PRODUCTS](state, value) {
      state.products = value.items;
      state.count = value.count;
    },
    [ADD_PRODUCT](state, value) {
      Object.assign(state.products, value);
    },
    [DELETE_PRODUCT](state, id) {
      const itemIndex = state.products.findIndex((i) => i.id === id);
      if (itemIndex !== -1) {
        delete state.products[itemIndex];
      }
    },
    [EDIT_PRODUCT](state, product) {
      let itemIndex = state.products.findIndex((i) => i.id === product.id);
      if (itemIndex !== -1) {
        state.products[itemIndex] = product;
      }
    },
    [CHANGE_PAGE](state, page) {
      state.page = page;
    },
  },
  actions: {
    changePage({ commit }, page) {
      commit(CHANGE_PAGE, page);
    },
    async getProducts({ commit }, { page, limit }) {
      try {
        const products = await productsApi.getProductsPage(page, limit);
        commit(PRODUCTS, products);
      } catch (err) {
        console.log(err);
      }
    },
    async createProduct({ commit, dispatch, state }, product) {
      try {
        await productsApi.createProduct(product);
        showToaster("success", "Продукт успешно создан");
        commit(ADD_PRODUCT, product);
      } catch (err) {
        console.log(err);
        if (err.response.status === 413) {
          showToaster("error", "Размер файлов слишком большой");
        } else {
          showToaster("error", "Что-то пошло не так");
        }
      } finally {
        await dispatch("getProducts", {
          page: state.page,
          limit: state.perPage,
        });
      }
    },
    async deleteProduct({ commit, dispatch, state }, { page, id }) {
      try {
        await productsApi.deleteProduct(id);
        commit(DELETE_PRODUCT, id);
      } catch (err) {
        console.log(err);
      } finally {
        await dispatch("getProducts", { page: page, limit: state.perPage });
      }
    },
    async editProduct({ commit, dispatch, state }, product) {
      try {
        await productsApi.updateProduct(product.id, product);
        showToaster("success", "Данные успешно изменены");
        commit(EDIT_PRODUCT, product);
      } catch (err) {
        console.log(err);
        if (err.response.status === 413) {
          showToaster("error", "Размер файлов слишком большой");
        } else {
          showToaster("error", "Что-то пошло не так");
        }
      } finally {
        await dispatch("getProducts", {
          page: state.page,
          limit: state.perPage,
        });
      }
    },
  },
};

export default productsStore;
