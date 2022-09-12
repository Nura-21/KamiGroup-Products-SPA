import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import HomePage from "../pages/HomePage";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../pages/Product/ProductList"),
  },
  {
    path: "/products/create",
    name: "productCreate",
    component: () => import("../pages/Product/ProductCreate"),
  },
  {
    path: "/products/:id/edit",
    name: "productEdit",
    component: () => import("../pages/Product/ProductCreate"),
  },
  {
    path: "/cities",
    name: "cities",
    component: () => import("../pages/City/CitiesList"),
  },
  {
    path: "/cities/create",
    name: "cityCreate",
    component: () => import("../pages/City/CityEditor"),
  },
  {
    path: "/cities/:id/edit",
    name: "cityEdit",
    meta: {
      auth: true,
    },
    component: () => import("../pages/City/CityEditor"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
