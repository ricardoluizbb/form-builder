import { mount } from '@vue/test-utils';
import BuilderLeftColumn from '@/components/form-builder/BuilderLeftColumn.vue';
import Vuetify from 'vuetify';

// Mock da store
jest.mock('@/stores/formStore', () => ({
  useFormStore: jest.fn(() => ({
    selectForm: jest.fn(),
  })),
}));

describe('BuilderLeftColumn', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const forms = [
    { id: 1, title: 'Formulário 1' },
    { id: 2, title: 'Formulário 2' },
    { id: 3, title: 'Formulário 3' },
  ];

  const selectedForm = forms[1];

  it('renders list of forms correctly', async () => {
    const wrapper = mount(BuilderLeftColumn, {
      vuetify,
      propsData: {
        forms: forms,
        selectedForm: selectedForm,
      },
    });

    await wrapper.vm.$nextTick();

    const formItems = wrapper.findAll('.v-list-item');
    expect(formItems.length).toBe(forms.length);

    forms.forEach((form, index) => {
      const formItem = formItems.at(index);
      expect(formItem.text()).toContain(form.title);
    });

    expect(formItems.at(1).classes()).toContain('active-form');
  });

  it('emits "form-selected" event when a form is clicked', async () => {
    const wrapper = mount(BuilderLeftColumn, {
      vuetify,
      propsData: {
        forms: forms,
        selectedForm: selectedForm,
      },
    });

    await wrapper.vm.$nextTick();

    const formToSelect = forms[0];
    await wrapper.findAll('.v-list-item').at(0).trigger('click');

    expect(wrapper.emitted('form-selected')).toBeTruthy();
    expect(wrapper.emitted('form-selected')[0][0]).toBe(formToSelect);

    const formStoreMock = wrapper.vm.builderFormStore;
    expect(formStoreMock.selectForm).toHaveBeenCalledWith(formToSelect);
  });

  it('emits "new-form" event when "Criar Formulário" button is clicked', async () => {
    const wrapper = mount(BuilderLeftColumn, {
      vuetify,
      propsData: {
        forms: forms,
        selectedForm: selectedForm,
      },
    });

    await wrapper.vm.$nextTick();

    await wrapper.find('.v-btn').trigger('click');

    expect(wrapper.emitted('new-form')).toBeTruthy();
  });
});
