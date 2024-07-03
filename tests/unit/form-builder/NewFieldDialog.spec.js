import { mount } from '@vue/test-utils';
import NewFieldDialog from '@/components/form-builder/NewFieldDialog.vue';
import Vuetify from 'vuetify';

// Mock da store
jest.mock('@/stores/formStore', () => ({
  useFormStore: jest.fn(() => ({
    fieldTypes: {
      text: { title: 'Texto', description: 'Campo de texto', options: [] },
      selection: { title: 'Seleção', description: 'Campo de seleção', options: ['Opção 1', 'Opção 2'] },
    },
  })),
}));

describe('NewFieldDialog', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();

    // Simulando o elemento data-app
    const app = document.createElement('div');
    app.setAttribute('data-app', true);
    document.body.appendChild(app);
  });

  it('opens dialog correctly', async () => {
    const wrapper = mount(NewFieldDialog, {
      vuetify,
    });

    // Verifica se o dialog está fechado no início
    expect(wrapper.vm.dialog).toBe(false);

    // Chama o método open para abrir o dialog
    await wrapper.vm.open('text');
    expect(wrapper.vm.dialog).toBe(true);
    expect(wrapper.vm.selectedFieldType).toBe('text');
  });

  it('adds custom options when selection field type is selected', async () => {
    const wrapper = mount(NewFieldDialog, {
      vuetify,
    });

    await wrapper.vm.open('selection');

    // Adiciona opções customizadas
    await wrapper.find('.v-btn').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.customOptions.length).toBe(1);

    await wrapper.find('.v-btn').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.customOptions.length).toBe(2);

    // Testa o limite de 4 opções
    await wrapper.find('.v-btn').trigger('click');
    await wrapper.vm.$nextTick();
    await wrapper.find('.v-btn').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.v-alert').exists()).toBe(true);
  });

  it('enables save button when required fields are filled', async () => {
    const wrapper = mount(NewFieldDialog, {
      vuetify,
    });

    await wrapper.vm.open('text');
    expect(wrapper.find('#save-btn').attributes('disabled')).toBeTruthy();

    await wrapper.setData({ fieldLabel: 'Novo Campo' });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('#save-btn').attributes('disabled')).toBeFalsy();
  });

  it('emits "field-saved" event when save button is clicked', async () => {
    const wrapper = mount(NewFieldDialog, {
      vuetify,
    });

    await wrapper.vm.open('text');
    await wrapper.setData({ fieldLabel: 'Novo Campo' });
    await wrapper.vm.$nextTick();

    await wrapper.find('#save-btn').trigger('click');
    expect(wrapper.emitted('field-saved')).toBeTruthy();
    expect(wrapper.emitted('field-saved')[0][0]).toEqual({
      type: 'text',
      label: 'Novo Campo',
      option: '',
      customOptions: [],
    });
  });

  it('closes dialog when cancel button is clicked', async () => {
    const wrapper = mount(NewFieldDialog, {
      vuetify,
    });

    await wrapper.vm.open('text');
    expect(wrapper.vm.dialog).toBe(true);

    // Encontrar o botão de cancelar
    const cancelButton = wrapper.find('#cancel-btn');
    await cancelButton.trigger('click');

    expect(wrapper.vm.dialog).toBe(false);
    expect(wrapper.vm.fieldLabel).toBe('');
    expect(wrapper.vm.selectedFieldType).toBeNull();
  });
});
