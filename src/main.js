import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import { createPinia, PiniaVuePlugin } from 'pinia';

// Use Pinia plugin
Vue.use(PiniaVuePlugin);

const pinia = createPinia();

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  pinia,
  render: h => h(App)
}).$mount('#app');
