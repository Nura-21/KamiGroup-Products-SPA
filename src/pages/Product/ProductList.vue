<template>
  <section class="product animate">
    <first-level-header
      title="Список продуктов"
      :buttons="buttons"
      @editProduct="editProduct"
      @deleteProduct="callDelete"
    >
    </first-level-header>
    <section v-if="!isLoading" class="product-list animate delay-2">
      <product-card
        v-for="(product, index) of products"
        :key="index"
        :product="product"
        @click.native="selectProduct(product)"
        :class="{
          'selected-product': selectedProduct.id === product.id,
        }"
      ></product-card>
    </section>
    <vs-pagination
      v-if="!isLoading && hasPagination"
      class="animate delay-4"
      not-arrows
      v-model="currentPage"
      :length="limit"
    ></vs-pagination>
    <no-data v-if="products.length === 0 && !isLoading"></no-data>
    <loader v-if="isLoading"></loader>
  </section>
</template>

<script>
import ProductCard from "@/components/Product/ProductCard.vue";
import NoData from "@/components/NoData";
import productsApi from "@/services/products.api";
import Button from "@/helpers/buttonClass";
import { mapActions, mapGetters } from "vuex";
import { showToaster, confirmModal } from "@/helpers/toaster";
export default {
  name: "ProductList",
  components: { ProductCard, NoData },
  data: function () {
    return {
      isLoading: true,
      selectedProduct: {},
      length: -1,
      buttons: [new Button("Добавить", "link", "toCreate", "/products/create")],
      currentPage: 1,
    };
  },
  computed: {
    ...mapGetters("products", ["products", "perPage", "page"]),
    limit() {
      return Math.ceil(this.length / this.perPage);
    },
    hasPagination() {
      return this.length > this.perPage;
    },
  },
  watch: {
    currentPage(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loadProducts();
      }
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions("products", ["getProducts", "deleteProduct", "changePage"]),
    async initData() {
      await this.getProductsCount();
      if (this.length !== 0) {
        await this.loadProducts();
      } else {
        this.isLoading = false;
      }
    },
    async getProductsCount() {
      try {
        const { count } = await productsApi.getAllProducts();
        this.length = count;
      } catch (err) {
        console.log(err);
      }
    },
    async loadProducts() {
      this.removeButtons();
      this.isLoading = true;
      try {
        this.changePage(this.currentPage);
        await this.getProducts({
          page: this.currentPage,
          limit: this.perPage,
        });
      } catch (err) {
        console.log(err);
      }
      this.isLoading = false;
    },
    editProduct() {
      this.$router.push(`/products/${this.selectedProduct.id}/edit`);
    },
    async callDelete() {
      const { value } = await confirmModal(
        "Вы уверены, что хотите удалить данный продукт?",
        "Подтвердить",
        "Отменить"
      );
      if (value) {
        this.isLoading = true;
        try {
          const id = this.selectedProduct.id;
          this.unselectProduct();
          if (this.products.length === 1 && this.currentPage > 1) {
            this.currentPage -= 1;
          }
          await this.deleteProduct({ page: this.currentPage, id: id });
          await this.getProductsCount();
        } catch (err) {
          console.log(err);
        }
        this.isLoading = false;
        showToaster("success", "Продукт успешно удален");
      }
    },
    addButtons() {
      const editButton = new Button("Изменить данные", "edit", "editProduct");
      const deleteButton = new Button("Удалить", "delete", "deleteProduct");
      this.buttons.push(editButton);
      this.buttons.push(deleteButton);
    },
    removeButtons() {
      this.buttons = [this.buttons[0]];
    },
    selectProduct(product) {
      this.removeButtons();
      if (
        Object.keys(this.selectedProduct).length === 0 ||
        (this.selectedProduct && this.selectedProduct.id !== product.id)
      ) {
        this.selectedProduct = product;
        this.addButtons();
      } else {
        this.unselectProduct();
      }
    },
    unselectProduct() {
      this.removeButtons();
      this.selectedProduct = {};
    },
  },
};
</script>
