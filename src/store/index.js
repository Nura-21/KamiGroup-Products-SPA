import Vue from "vue";
import Vuex from "vuex";

import cities from "./modules/cities";
import products from "./modules/products";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { cities, products },
});
