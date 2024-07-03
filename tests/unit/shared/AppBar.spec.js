import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import AppBar from '@/components/shared/AppBar.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('AppBar.vue', () => {
  let vuetify;
  let router;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
  });

  it('renders the AppBar component', () => {
    const wrapper = shallowMount(AppBar, {
      localVue,
      vuetify,
      router,
    });

    expect(wrapper.findComponent({ name: 'v-app-bar' }).exists()).toBe(true);
  });

  it('renders the correct number of tabs', () => {
    const wrapper = shallowMount(AppBar, {
      localVue,
      vuetify,
      router,
    });

    const tabs = wrapper.findAllComponents({ name: 'v-tab' });
    expect(tabs.length).toBe(2);
  });

  it('renders the correct text in the tabs', () => {
    const wrapper = shallowMount(AppBar, {
      localVue,
      vuetify,
      router,
    });

    const tabs = wrapper.findAllComponents({ name: 'v-tab' });
    expect(tabs.at(0).text()).toBe('Criar formulário');
    expect(tabs.at(1).text()).toBe('Preencher formulário');
  });

  it('correctly sets the "to" attribute on tabs', () => {
    const wrapper = shallowMount(AppBar, {
      localVue,
      vuetify,
      router,
    });

    const tabs = wrapper.findAllComponents({ name: 'v-tab' });
    expect(tabs.at(0).attributes('to')).toBe('/');
    expect(tabs.at(1).attributes('to')).toBe('/fill-form');
  });
});
