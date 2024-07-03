import { mount } from '@vue/test-utils';
import NewFieldMenu from '@/components/form-builder/NewFieldMenu.vue';
import Vuetify from 'vuetify';

// Mock do componente NewFieldDialog
const NewFieldDialogMock = {
  name: 'NewFieldDialog',
  template: '<div></div>',
  methods: {
    open: jest.fn(), // Mock do método open
  },
};

describe('NewFieldMenu', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();

    // Simulando o elemento data-app
    const app = document.createElement('div');
    app.setAttribute('data-app', true);
    document.body.appendChild(app);
  });

  it('opens add field menu correctly', async () => {
    const wrapper = mount(NewFieldMenu, {
      vuetify,
      stubs: {
        NewFieldDialog: NewFieldDialogMock,
      },
    });

    // Simula o clique no botão "Adicionar campo"
    await wrapper.find('.v-btn').trigger('click');
    await wrapper.vm.$nextTick(); // Aguarda o próximo ciclo de atualização

    // Verifica se o menu está visível após o clique
    expect(wrapper.find('.v-menu').isVisible()).toBe(true);
  });

  it('opens new field dialog when menu item is clicked', async () => {
    const wrapper = mount(NewFieldMenu, {
      vuetify,
      stubs: {
        NewFieldDialog: NewFieldDialogMock,
      },
    });

    // Simula o clique no botão "Adicionar campo"
    await wrapper.find('.v-btn').trigger('click');
    await wrapper.vm.$nextTick();

    // Simula o clique em um item do menu
    await wrapper.findAll('.v-list-item').at(0).trigger('click');
    await wrapper.vm.$nextTick();

    // Verifica se o método open do dialog foi chamado corretamente com o tipo 'text'
    expect(NewFieldDialogMock.methods.open).toHaveBeenCalledWith('text');
  });

  it('emits field-selected event when field is saved', async () => {
    const wrapper = mount(NewFieldMenu, {
      vuetify,
      stubs: {
        NewFieldDialog: NewFieldDialogMock,
      },
    });

    // Simula o clique no botão "Adicionar campo"
    await wrapper.find('.v-btn').trigger('click');
    await wrapper.vm.$nextTick();

    // Simula o clique em um item do menu
    await wrapper.findAll('.v-list-item').at(0).trigger('click');
    await wrapper.vm.$nextTick();

    // Emite um evento simulando que um campo foi salvo
    wrapper.findComponent(NewFieldDialogMock).vm.$emit('field-saved', {
      type: 'text',
      label: 'Novo Campo',
      option: '',
      customOptions: [],
    });
    await wrapper.vm.$nextTick(); 

    // Verifica se o evento 'field-selected' foi emitido corretamente com os dados do campo
    expect(wrapper.emitted('field-selected')).toBeTruthy();
    expect(wrapper.emitted('field-selected')[0][0]).toEqual({
      type: 'text',
      label: 'Novo Campo',
      option: '',
      customOptions: [],
    });
  });
});
