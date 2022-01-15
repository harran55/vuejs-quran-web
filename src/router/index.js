import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SurahAyah from '@/components/SurahAyah'

Vue.use(VueRouter);
const url = document.querySelector('meta[name=url]').getAttribute('content');
const routes = [
  {
    path: url,
    name: "Home",
    component: Home,
  },
  {
    path: url + ':id',
    name: 'Surah',
    component: SurahAyah
  },
  {
    path: url + ':id/:ayah',
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
