import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/styles.scss";

import Loader from "@/components/Loader";
import GlassButton from "@/components/GlassButton";
import FirstLevelHeader from "@/components/Header/FirstLevelHeader";
import SecondLevelHeader from "@/components/Header/SecondLevelHeader";

Vue.config.productionTip = false;

Vue.component("Loader", Loader);
Vue.component("GlassButton", GlassButton);
Vue.component("FirstLevelHeader", FirstLevelHeader);
Vue.component("SecondLevelHeader", SecondLevelHeader);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
