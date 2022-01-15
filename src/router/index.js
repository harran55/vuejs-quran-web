import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SurahAyah from '@/components/SurahAyah'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/page",
    name: "Page",
    component: () =>
      import("../views/Page.vue"),
  },
  {
    path: '/:id',
    name: 'Surah',
    component: SurahAyah
  },
  {
    path: '/:id/:ayah',
    name: 'SurahId',
    component: SurahAyah
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
