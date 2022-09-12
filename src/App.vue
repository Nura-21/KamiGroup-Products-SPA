<template>
  <div id="app">
    <header-component />
    <main><router-view /></main>
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header/HeaderComponent";
export default {
  components: { HeaderComponent },
};
</script>
