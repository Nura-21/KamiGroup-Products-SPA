<template>
  <header-component />
  <main><router-view /></main>
  <footer-component />
</template>

<script lang="ts">
import HeaderComponent from "@/components/Header/HeaderComponent.vue";
import FooterComponent from "@/components/Footer/FooterComponent.vue";

export default {
  components: { HeaderComponent, FooterComponent },
};
</script>
