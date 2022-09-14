<template>
  <section class="animate blur">
    <second-level-header
      :title="
        mode === 'create' ? 'Добавление продукта' : 'Изменение данных продукта'
      "
      parent-link="/products"
    ></second-level-header>
    <div v-if="!isLoading" class="product-editor-container glass">
      <div class="row mt-3">
        <vs-input
          v-model="productObject.name"
          label="Название продукта"
          color="#e99dcb"
          class="mr-3"
        >
          <template
            #message-danger
            v-if="productObject.name !== null && !productObject.validateName()"
          >
            Введите валидное название
          </template>
        </vs-input>
        <vs-input
          v-model="productObject.description"
          label="Описание"
          color="#e99dcb"
          class="w-100 mr-3"
        >
          <template
            #message-danger
            v-if="
              productObject.description !== null &&
              !productObject.validateDescription()
            "
          >
            Введите валидное описание
          </template>
        </vs-input>
        <vs-checkbox color="#e99dcb" v-model="productObject.isActive">
          {{ productObject.isActive ? "Активен" : "Неактивен" }}
        </vs-checkbox>
      </div>
      <div class="row mt-3">
        <vs-input
          type="number"
          v-model="productObject.price"
          label="Цена"
          class="mr-3"
          :disabled="!productObject.isPriceGeneral"
          @change="setDefaultPriceForCities"
          ><template
            #message-danger
            v-if="
              productObject.price !== null && !productObject.validatePrice()
            "
          >
            Введите валидную цену
          </template></vs-input
        >
        <vs-checkbox color="#e99dcb" v-model="productObject.isPriceGeneral">
          Одна цена для всех городов
        </vs-checkbox>
      </div>
      <vs-table class="mt-3" v-if="!productObject.isPriceGeneral && !isLoading">
        <template #thead>
          <vs-tr danger>
            <vs-th> Город </vs-th>
            <vs-th> Цена </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in productObject.priceArray"
            :data="tr"
          >
            <vs-td>
              {{ tr.name }}
            </vs-td>
            <vs-td>
              <vs-input type="number" v-model="tr.price"></vs-input>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <tiptap
        class="mt-3"
        @onChange="getDescriptionHTML"
        :value="productObject.descriptionHTML"
      />
      <div class="product-editor-images">
        <input
          type="file"
          multiple
          @change="saveImages"
          accept="image/*"
          :disabled="productObject.imgArray.length > 2"
        />
        <div
          class="product-editor-images-container glass"
          v-if="productObject.imgArray.length > 0"
        >
          <div
            class="product-editor-images-container-card"
            v-for="(img, index) of productObject.imgArray"
            :key="index"
          >
            <img :src="img" alt="Image" width="150" />
            <vs-button
              icon
              color="#5f4fe3"
              border
              size="mini"
              @click.native="deleteImage(index)"
            >
              <i class="fa-solid fa-circle-xmark" color="red"></i>
            </vs-button>
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <glass-button
          class="mr-2"
          :title="this.mode === 'create' ? 'Создать' : 'Сохранить'"
          @click.native="submit"
          :disabled="!validateAll"
        ></glass-button>
        <glass-button
          title="Отменить"
          @click.native="$router.push('/products')"
        ></glass-button>
      </div>
    </div>
    <loader v-if="isLoading"></loader>
  </section>
</template>

<script>
import Product from "@/helpers/productClass";
import Tiptap from "@/components/Tiptap";
import { mapGetters, mapActions } from "vuex";
import productApi from "@/services/products.api";
import { showToaster, confirmModal } from "@/helpers/toaster";

export default {
  name: "ProductEditor",
  components: { Tiptap },
  data: function () {
    return {
      isLoading: false,
      productId: this.$route.params.id,
      productObject: {},
    };
  },
  computed: {
    ...mapGetters("products", ["product"]),
    ...mapGetters("cities", ["cities"]),
    mode() {
      return this.$route.path.includes("create") ? "create" : "edit";
    },
    validateAll() {
      return (
        this.productObject.name !== null &&
        this.productObject.description !== null &&
        this.productObject.price !== null &&
        this.productObject.validateName() &&
        this.productObject.validateDescription() &&
        this.productObject.validatePrice()
      );
    },
  },
  watch: {
    productObject: {
      handler() {},
      deep: true,
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions("products", ["createProduct", "editProduct"]),
    ...mapActions("cities", ["getCities"]),
    async initData() {
      if (this.cities.length === 0) {
        await this.getCities();
      }
      if (this.mode === "edit") {
        const product = this.product(this.productId);
        if (product) {
          this.setProduct(product);
        } else {
          await this.getProduct(this.productId);
        }
      } else {
        this.productObject = new Product();
        this.setDefaultPriceForCities();
      }
    },
    async getProduct(id) {
      this.isLoading = true;
      try {
        const product = await productApi.getProduct(id);
        this.setProduct(product);
      } catch (err) {
        console.log(err);
      }
      this.isLoading = false;
    },
    async submit() {
      if (this.productObject.name.length === 0) {
        showToaster("warning", "Заполните название продукта");
        return;
      }
      if (this.productObject.imgArray.length === 0) {
        showToaster("warning", "У продукта должно быть хотя бы одно фото");
        return;
      }
      const { value } = await confirmModal(
        "Вы уверены?",
        "Подтвердить",
        "Отменить"
      );
      if (value) {
        this.isLoading = true;
        try {
          if (this.mode === "create") {
            await this.createProduct(this.productObject);
          } else {
            await this.editProduct(this.productObject);
          }
          this.$router.push("/products");
        } catch (err) {
          console.log(err);
          showToaster("error", "Что-то пошло не так");
        }
        this.isLoading = false;
      }
    },
    async saveImages(e) {
      try {
        for (let i = 0; i < e.target.files.length; i++) {
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[i]);
          reader.onload = async () => {
            await this.productObject.imgArray.push(reader.result);
          };
        }
      } catch (error) {
        console.log(error);
      }
    },
    deleteImage(index) {
      this.productObject.imgArray = this.productObject.imgArray.filter(
        (i, ind) => ind !== index
      );
    },
    setProduct(product) {
      this.productObject = new Product(
        product.id,
        product.name,
        product.description,
        product.descriptionHTML,
        product.price,
        product.imgArray,
        product.isActive,
        product.isPriceGeneral,
        product.priceArray
      );
      this.setDefaultPriceForCities();
    },
    getDescriptionHTML(value) {
      this.productObject.setDescriptionHTML(value);
    },
    setDefaultPriceForCities() {
      this.productObject.priceArray = [];
      this.cities.forEach((city) => {
        if (this.productObject && this.productObject.price > 0) {
          city.price = this.productObject.price;
        } else {
          city.price = 0;
        }
        this.productObject.priceArray.push({
          name: city.name,
          price: city.price,
        });
      });
    },
  },
};
</script>
