<template>
  <div class="row h-center between mt-2">
    <h1 class="page-title">{{ title }}</h1>
    <aside class="row h-center">
      <div v-for="(button, index) of buttons" :key="index">
        <router-link v-if="button.type === 'link'" :to="button.link">
          <glass-button :title="button.title" :is-icon="false"></glass-button>
        </router-link>
        <glass-button
          v-else
          :title="button.title"
          :is-icon="false"
          class="ml-2"
          :class="{ 'btn-danger': button.type === 'delete' }"
          @click.native="$emit(button.emit)"
          >{{ button.emit }}</glass-button
        >
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: "FirstLevelHeader",
  props: {
    title: {
      type: String,
      default: null,
    },
    buttons: {
      type: Array,
      default: null,
    },
  },
};
</script>
