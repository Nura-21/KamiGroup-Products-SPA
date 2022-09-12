<template>
  <section class="animate blur">
    <second-level-header
      :title="
        mode === 'create' ? 'Добавление города' : 'Изменение данных города'
      "
      parent-link="/cities"
    ></second-level-header>
    <div class="city-create-container glass mt-2" v-if="!isLoading">
      <label class="city-create-label"
        >Название города <input class="glass" type="text" v-model="name"
      /></label>
      <small class="text-error" v-if="hasError"
        >Введите валидное название</small
      >
      <glass-button
        class="mt-2"
        :is-icon="false"
        :title="mode === 'create' ? 'Создать' : 'Сохранить'"
        @click.native="submit"
      ></glass-button>
    </div>
    <loader v-else></loader>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import cityApi from "@/services/cities.api";
export default {
  name: "CityCreate",
  data: function () {
    return {
      isLoading: false,
      hasError: false,
      name: "",
      pattern: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
      cityObject: {},
      cityId: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters("cities", ["city"]),
    mode() {
      return this.$route.path.includes("create") ? "create" : "edit";
    },
  },
  mounted() {
    if (this.mode === "edit") {
      const city = this.city(this.cityId);
      if (city) {
        this.name = city.name;
        this.cityObject = city;
      } else {
        this.getCity(this.cityId);
      }
    }
  },
  methods: {
    ...mapActions("cities", ["createCity", "editCity"]),
    async submit() {
      if (
        this.name.length === 0 ||
        (this.name && !this.pattern.test(this.name))
      ) {
        this.hasError = true;
        setTimeout(() => {
          this.hasError = false;
        }, 2000);
      } else {
        this.isLoading = true;
        if (this.mode === "create") {
          await this.createCity({ name: this.name });
        } else {
          this.cityObject.name = this.name;
          await this.editCity(this.cityObject);
        }
        this.$router.push("/cities");
      }
    },
    async getCity(id) {
      this.isLoading = true;
      try {
        const city = await cityApi.getCity(id);
        this.name = city.name;
        this.cityObject = city;
      } catch (err) {
        console.log(err);
      }
      this.isLoading = false;
    },
  },
};
</script>
