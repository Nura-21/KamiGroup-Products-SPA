<template>
  <div class="row h-center mt-2">
    <router-link :to="parentLink" class="mr-2">
      <glass-button
        :is-icon="true"
        icon-class="fa-solid fa-arrow-left"
      ></glass-button>
    </router-link>
    <h1 class="page-title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "SecondLevelHeader",
  props: {
    title: {
      type: String,
      default: null,
    },
    parentLink: {
      type: String,
      default: null,
    },
    iconClass: {
      type: String,
      default: null,
    },
  },
};
</script>
