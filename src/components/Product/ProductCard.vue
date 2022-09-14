<template>
  <vs-card type="4">
    <template #title>
      <h3>{{ product.name }}</h3>
    </template>
    <template #img>
      <img
        :src="
          product.imgArray[0]
            ? product.imgArray[0]
            : require(`@/assets/images/placeholder.png`)
        "
        alt="Product image"
      />
    </template>
    <template #text>
      <p>{{ product.description }}</p>
    </template>
    <template #interactions>
      <vs-button
        :color="product.isActive ? '#5f4fe3' : '#959595'"
        icon
        size="small"
      >
        <i class="fa-solid fa-cart-shopping"></i>
      </vs-button>
      <vs-button class="btn-chat" shadow primary size="small">
        <i class="fa-solid fa-square-dollar"></i>
        <span class="span">{{ product.price }} ₸</span>
      </vs-button>
    </template>
  </vs-card>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      default: null,
    },
  },
};
</script>
