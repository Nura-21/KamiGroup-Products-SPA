<template>
  <vs-card type="3">
    <template #title>
      <h3>{{ city.name }}</h3>
    </template>
    <template #img>
      <img :src="city.icon" alt="" />
    </template>
    <template #text>
      <p></p>
    </template>
  </vs-card>
</template>

<script>
export default {
  name: "CityCard",
  props: {
    city: {
      type: Object,
      default: null,
    },
  },
};
</script>
