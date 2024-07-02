import { shallowMount } from '@vue/test-utils';
import TextareaField from '@/components/form-builder/fields/TextareaField.vue';

describe('TimeField', () => {
  it('renders correctly with default props', () => {
    const wrapper = shallowMount(TextareaField);

    // Verifica se o componente está renderizado
    expect(wrapper.exists()).toBe(true);

    // Verifica se o label padrão está sendo exibido corretamente no v-text-field
    expect(wrapper.find('#textarea-field').attributes('label')).toBe('Parágrafo');

    // Verifica se o campo não está desabilitado por padrão
    expect(wrapper.find('#textarea-field').attributes('disabled')).toBe(undefined);

    // Verifica se o tipo do campo é "text"
    expect(wrapper.find('#textarea-field').attributes('type')).toBe('text');
  });

  // Teste para verificar se o label personalizado é exibido corretamente
  it('renders custom label when passed via props', () => {
    const customLabel = 'Label customizado';
    const wrapper = shallowMount(TextareaField, {
      propsData: {
        label: customLabel,
      },
    });

    // Verifica se o label personalizado está sendo exibido corretamente no v-text-field
    expect(wrapper.find('#textarea-field').attributes('label')).toBe('Label customizado');
  });

  // Teste para verificar se o campo fica desabilitado quando a propriedade disabled é true
  it('disables field when disabled prop is true', () => {
    const wrapper = shallowMount(TextareaField, {
      propsData: {
        disabled: true,
      },
    });

    // Verifica se o atributo 'disabled' está presente no v-text-field quando disabled é true
    expect(wrapper.find('#textarea-field').attributes('disabled')).toBe('true');
  });

  // Teste para verificar se o campo fica habilitado quando a propriedade disabled é false
  it('enables field when disabled prop is false', () => {
    const wrapper = shallowMount(TextareaField, {
      propsData: {
        disabled: false,
      },
    });

    // Verifica se o atributo 'disabled' não está presente no v-text-field quando disabled é false
    expect(wrapper.find('#textarea-field').attributes('disabled')).toBe(undefined);
  });
});
