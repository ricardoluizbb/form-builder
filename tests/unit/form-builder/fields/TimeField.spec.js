import { shallowMount } from '@vue/test-utils';
import TimeField from '@/components/form-builder/fields/TimeField.vue';

describe('TimeField', () => {
  it('renders correctly with default props', () => {
    const wrapper = shallowMount(TimeField);

    // Verifica se o componente está renderizado
    expect(wrapper.exists()).toBe(true);

    // Verifica se o label padrão está sendo exibido corretamente no v-text-field
    expect(wrapper.find('#time-field').attributes('label')).toBe('Horas');

    // Verifica se o campo não está desabilitado por padrão
    expect(wrapper.find('#time-field').attributes('disabled')).toBe(undefined);

    // Verifica se o tipo do campo é "time"
    expect(wrapper.find('#time-field').attributes('type')).toBe('time');
  });

  it('renders custom label when passed via props', () => {
    const customLabel = 'Label customizado';
    const wrapper = shallowMount(TimeField, {
      propsData: {
        label: customLabel,
      },
    });

    // Verifica se o label personalizado está sendo exibido corretamente no v-text-field
    expect(wrapper.find('#time-field').attributes('label')).toBe('Label customizado');
  });

  it('disables field when disabled prop is true', () => {
    const wrapper = shallowMount(TimeField, {
      propsData: {
        disabled: true,
      },
    });

    // Verifica se o atributo 'disabled' está presente no v-text-field quando disabled é true
    expect(wrapper.find('#time-field').attributes('disabled')).toBe('true');
  });

  it('enables field when disabled prop is false', () => {
    const wrapper = shallowMount(TimeField, {
      propsData: {
        disabled: false,
      },
    });

    // Verifica se o atributo 'disabled' não está presente no v-text-field quando disabled é false
    expect(wrapper.find('#time-field').attributes('disabled')).toBe(undefined);
  });
});
