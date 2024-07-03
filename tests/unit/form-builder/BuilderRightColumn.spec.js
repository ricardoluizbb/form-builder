// Importações necessárias
import { mount, createLocalVue } from '@vue/test-utils';
import BuilderRightColumn from '@/components/form-builder/BuilderRightColumn.vue';
import Vuetify from 'vuetify';

// Configuração do Vuetify
const localVue = createLocalVue();
localVue.use(Vuetify);

// Mock do store
jest.mock('@/stores/formStore', () => ({
  useFormStore: jest.fn(() => ({
    selectedForm: null,
    saveForms: jest.fn(),
    deleteForm: jest.fn(),
    clearSelectedForm: jest.fn(),
    deleteFieldFromSelectedForm: jest.fn(),
  })),
}));

describe('BuilderRightColumn', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    
    // Simulando o elemento data-app
    const app = document.createElement('div');
    app.setAttribute('data-app', true);
    document.body.appendChild(app);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders "Selecione um formulário para visualizar aqui." when no form is selected', () => {
    const wrapper = mount(BuilderRightColumn, {
      localVue,
      vuetify,
    });

    expect(wrapper.find('.text-center').text()).toContain('Selecione um formulário para visualizar aqui.');
  });

  it('renders selected form details when a form is selected', async () => {
    const selectedForm = {
      id: 1,
      title: 'Test Form',
      fields: [],
    };

    const wrapper = mount(BuilderRightColumn, {
      localVue,
      vuetify,
    });

    wrapper.setData({ builderFormStore: { selectedForm } });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.mb-8 span').text()).toBe('Test Form');
  });

  it('adds a field to selected form when addField is called', async () => {
    const selectedForm = {
      id: 1,
      title: 'Test Form',
      fields: [],
    };

    const wrapper = mount(BuilderRightColumn, {
      localVue,
      vuetify,
    });

    wrapper.setData({ builderFormStore: { selectedForm } });

    await wrapper.vm.$nextTick();

    const newField = {
      label: 'New Field',
      type: 'text',
      option: 'Texto curto',
      customOptions: {},
    };
    wrapper.vm.addField(newField);

    expect(wrapper.vm.builderFormStore.selectedForm.fields).toHaveLength(1);
    expect(wrapper.vm.builderFormStore.saveForms).toHaveBeenCalled();
  });

  it('deletes selected form when openDeleteFormDialog is called', async () => {
    const selectedForm = {
      id: 1,
      title: 'Test Form',
      fields: [],
    };

    const wrapper = mount(BuilderRightColumn, {
      localVue,
      vuetify,
    });

    wrapper.setData({ builderFormStore: { selectedForm } });

    await wrapper.vm.$nextTick();

    wrapper.vm.openDeleteFormDialog();
    await wrapper.vm.$nextTick();

    wrapper.vm.handleConfirmDelete();

    expect(wrapper.vm.builderFormStore.deleteForm).toHaveBeenCalledWith(1);
    expect(wrapper.vm.builderFormStore.clearSelectedForm).toHaveBeenCalled();
  });

  it('deletes field from selected form when confirmDeleteField is called', async () => {
    const selectedForm = {
      id: 1,
      title: 'Test Form',
      fields: [{ label: 'Field 1', component: 'TextField', value: '', options: {} }],
    };

    const wrapper = mount(BuilderRightColumn, {
      localVue,
      vuetify,
    });

    wrapper.setData({ builderFormStore: { selectedForm } });

    await wrapper.vm.$nextTick();

    wrapper.vm.confirmDeleteField(0);
    await wrapper.vm.$nextTick();

    wrapper.vm.handleConfirmDelete();

    expect(wrapper.vm.builderFormStore.deleteFieldFromSelectedForm).toHaveBeenCalledWith(0);
  });

});

