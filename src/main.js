import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import basmala from '@/assets/basmala.png';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.esm.min.js';
import '@popperjs/core';
import "./assets/style.scss";


Vue.filter('basmala', function (value) {
  var Rval = ''
  Rval = value.replace(
    'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
    '<span class="basmala"><img src="'+basmala+'"></span>');
  Rval = Rval.replace(
    'بِّسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
    '<span class="basmala"><img src="'+basmala+'"></span>');
  Rval = Rval.replace(
    '۩',
    '<span ref="prostration">۩</span>'
  )
    return Rval
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
