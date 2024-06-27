import Vue from 'vue';
import Router from 'vue-router';
import FormBuilderView from '@/views/FormBuilderView.vue'
import FormListView from '@/views/FormListView.vue'

Vue.use(Router);

const routes = [
  {
    path: '/form-list',
    name: 'FormList',
    component: FormListView,
  },
  {
    path: '/',
    name: 'FormBuilder',
    component: FormBuilderView,
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
