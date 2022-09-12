<template>
  <section class="animate">
    <first-level-header
      title="Список городов"
      :buttons="buttons"
      @editCity="editCity"
      @deleteCity="callDelete"
    ></first-level-header>
    <section class="city-list animate" v-if="!isLoading">
      <city-card
        v-for="city of cities"
        :key="city.id"
        :city="city"
        @click.native="selectCity(city)"
        :class="{ selected: selectedCity.id === city.id }"
      ></city-card>
    </section>
    <loader v-else></loader>
  </section>
</template>

<script>
import CityCard from "@/components/City/CityCard";
import { Button } from "@/helpers/buttonClass";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CitiesList",
  components: { CityCard },
  data: function () {
    return {
      selectedCity: {},
      isLoading: true,
      buttons: [new Button("Добавить", "link", "toCreate", "/cities/create")],
    };
  },
  computed: {
    ...mapGetters("cities", ["cities"]),
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions("cities", ["getCities", "deleteCity"]),
    async initData() {
      if (this.cities.length === 0) {
        this.isLoading = true;
        try {
          await this.getCities();
        } catch (err) {
          console.log(err);
        }
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    },
    async callDelete() {
      this.isLoading = true;
      try {
        const id = this.selectedCity.id;
        this.unselectCity();
        await this.deleteCity(id);
      } catch (err) {
        console.log(err);
      }
      this.isLoading = false;
    },
    selectCity(city) {
      this.removeButtons();
      if (
        Object.keys(this.selectedCity).length === 0 ||
        (this.selectedCity && this.selectedCity.id !== city.id)
      ) {
        this.selectedCity = city;
        this.addButtons();
      } else {
        this.unselectCity();
      }
    },
    addButtons() {
      const editButton = new Button("Изменить данные", "edit", "editCity");
      const deleteButton = new Button("Удалить", "delete", "deleteCity");
      this.buttons.push(editButton);
      this.buttons.push(deleteButton);
    },
    removeButtons() {
      this.buttons = [this.buttons[0]];
    },
    unselectCity() {
      this.removeButtons();
      this.selectedCity = {};
    },
    editCity() {
      this.$router.push(`/cities/${this.selectedCity.id}/edit`);
    },
  },
};
</script>
