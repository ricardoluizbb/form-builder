import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import NewFormDialog from '@/components/fill-form/NewFormDialog.vue';

// Mock da store
jest.mock('@/stores/fillFormStore', () => ({
  useFillFormStore: jest.fn(() => ({
    getForms: [
      { id: 1, title: 'Formulário 1' },
      { id: 2, title: 'Formulário 2' },
    ],
    fillFormsList: [],
    addFormToFillList: jest.fn(),
  })),
}));

describe('NewFormDialog.vue', () => {
  let vuetify;
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
  });

  it('renders dialog with correct title', () => {
    const wrapper = shallowMount(NewFormDialog, {
      localVue,
      vuetify,
      propsData: {
        dialog: true,
      },
    });

    // Verifica se o diálogo é renderizado
    expect(wrapper.findComponent({ name: 'v-dialog' }).exists()).toBe(true);

    // Verifica se o título do diálogo é renderizado corretamente
    const title = wrapper.find('#card-title');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('Formulários criados');
  });

  it('renders the list of forms', () => {
    const wrapper = shallowMount(NewFormDialog, {
      localVue,
      vuetify,
      propsData: {
        dialog: true,
      },
    });

    // Verifica se os itens da lista são renderizados corretamente
    const listItems = wrapper.findAllComponents({ name: 'v-list-item' });
    expect(listItems.length).toBe(2);
    expect(listItems.at(0).find('#form-title').text()).toBe('Formulário 1');
    expect(listItems.at(1).find('#form-title').text()).toBe('Formulário 2');
  });
});
