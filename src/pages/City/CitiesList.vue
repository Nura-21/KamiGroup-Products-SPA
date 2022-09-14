<template>
  <section class="animate">
    <first-level-header
      title="Список городов"
      :buttons="buttons"
      @editCity="editCity"
      @deleteCity="callDelete"
    ></first-level-header>
    <section class="city-list animate delay-2" v-if="!isLoading">
      <city-card
        v-for="city of cities"
        :key="city.id"
        :city="city"
        @click.native="selectCity(city)"
        :class="{ 'selected-city': selectedCity.id === city.id }"
      ></city-card>
    </section>
    <no-data v-if="cities.length === 0 && !isLoading"></no-data>
    <loader v-if="isLoading"></loader>
  </section>
</template>

<script>
import CityCard from "@/components/City/CityCard";
import NoData from "@/components/NoData";
import Button from "@/helpers/buttonClass";
import { mapActions, mapGetters } from "vuex";
import { showToaster, confirmModal } from "@/helpers/toaster";
export default {
  name: "CitiesList",
  components: { CityCard, NoData },
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
      const { value } = await confirmModal(
        "Вы уверены, что хотите удалить данный город?",
        "Подтвердить",
        "Отменить"
      );
      if (value) {
        this.isLoading = true;
        try {
          const id = this.selectedCity.id;
          this.unselectCity();
          await this.deleteCity(id);
        } catch (err) {
          console.log(err);
        }
        this.isLoading = false;
        showToaster("success", "Город успешно удален");
      }
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
