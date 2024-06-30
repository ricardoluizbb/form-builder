import Vue from 'vue';
import Router from 'vue-router';
import FormBuilderView from '@/views/FormBuilderView.vue'
import FillFormView from '@/views/FillFormView.vue';

Vue.use(Router);

const routes = [
  {
    path: '/fill-form',
    name: 'FillFormView',
    component: FillFormView,
  },
  {
    path: '/',
    name: 'FormBuilderView',
    component: FormBuilderView,
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
