import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import HomePage from "@/pages/HomePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/products",
    name: "products",
    component: () => import("@/pages/Products/Products.vue"),
  },
  {
    path: "/cities",
    name: "cities",
    component: () => import("@/pages/Cities/Cities.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
