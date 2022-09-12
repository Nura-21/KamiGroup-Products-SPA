<template>
  <button class="btn glass">
    <span v-if="!isIcon">{{ title }}</span>
    <i v-else :class="iconClass"></i>
  </button>
</template>

<script>
export default {
  name: "GlassButton",
  props: {
    title: {
      type: String,
      default: null,
    },
    isIcon: {
      type: Boolean,
      default: false,
    },
    iconClass: {
      type: String,
      default: null,
    },
  },
};
</script>
