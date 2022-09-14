<template>
  <div class="row h-center v-center max-size animate blur">
    <section class="notfound glass">
      <div class="notfound-block">
        <i class="fa-solid fa-circle-exclamation"></i>
        <h2>{{ title }}</h2>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  props: {
    title: {
      type: String,
      default: "Страница не найдена",
    },
  },
};
</script>
