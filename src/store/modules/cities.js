import mutations from "@/store/mutations";
import cityApi from "@/services/cities.api";
const { CITIES, ADD_CITY, DELETE_CITY, EDIT_CITY } = mutations;

const citiesStore = {
  namespaced: true,
  state: {
    cities: [],
  },
  getters: {
    cities: ({ cities }) => cities,
    city:
      ({ cities }) =>
      (id) =>
        cities.find((i) => i.id === id),
  },
  mutations: {
    [CITIES](state, value) {
      state.cities = value;
    },
    [ADD_CITY](state, value) {
      Object.assign(state.cities, value);
    },
    [DELETE_CITY](state, id) {
      const itemIndex = state.cities.findIndex((i) => i.id === id);
      if (itemIndex !== -1) {
        delete state.cities[itemIndex];
      }
    },
    [EDIT_CITY](state, city) {
      let itemIndex = state.cities.findIndex((i) => i.id === city.id);
      if (itemIndex !== -1) {
        state.cities[itemIndex] = city;
      }
    },
  },
  actions: {
    async getCities({ commit }) {
      try {
        const cities = await cityApi.getCities();
        commit(CITIES, cities);
      } catch (err) {
        console.log(err);
      }
    },
    async createCity({ commit, dispatch }, city) {
      try {
        await cityApi.createCity(city);
        commit(ADD_CITY, city);
      } catch (err) {
        console.log(err);
      } finally {
        await dispatch("getCities");
      }
    },
    async deleteCity({ commit, dispatch }, id) {
      try {
        await cityApi.deleteCity(id);
        commit(DELETE_CITY, id);
      } catch (err) {
        console.log(err);
      } finally {
        await dispatch("getCities");
      }
    },
    async editCity({ commit, dispatch }, city) {
      try {
        await cityApi.updateCity(city.id, city);
        commit(EDIT_CITY, city);
      } catch (err) {
        console.log(err);
      } finally {
        await dispatch("getCities");
      }
    },
  },
};

export default citiesStore;
