<template>
  <div class="city-card">
    <img
      class="city-card-image"
      :src="city.icon"
      alt="City icon"
      draggable="false"
    />
    <span class="city-card-name">{{ city.name }}</span>
  </div>
</template>

<script>
export default {
  name: "CityCard",
  data: function () {
    return {
      isHovered: false,
    };
  },
  props: {
    city: {
      type: Object,
      default: null,
    },
  },
};
</script>
