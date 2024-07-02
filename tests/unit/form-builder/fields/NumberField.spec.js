import { shallowMount } from '@vue/test-utils';
import NumberField from '@/components/form-builder/fields/NumberField.vue';

describe('NumberField', () => {
    
  it('renders correctly with default props', () => {
    const wrapper = shallowMount(NumberField);

    // Verifica se o componente foi montado com sucesso
    expect(wrapper.exists()).toBe(true);
    // Verifica se o label padrão é 'Numérico'
    expect(wrapper.find('v-text-field-stub').attributes('label')).toBe('Numérico');
    // Verifica se o valor padrão é 0
    expect(wrapper.find('v-text-field-stub').props('value')).toBe(0);
    // Verifica se o campo não está desabilitado por padrão
    expect(wrapper.find('v-text-field-stub').attributes('disabled')).toBe(undefined);
  });

  it('displays the correct label', () => {
    const wrapper = shallowMount(NumberField, {
      propsData: {
        label: 'Test Label',
      },
    });

    // Verifica se o label está correto
    expect(wrapper.find('v-text-field-stub').attributes('label')).toBe('Test Label');
  });

  it('updates value correctly', async () => {
    const wrapper = shallowMount(NumberField, {
      propsData: {
        value: 10,
      },
    });

    // Altera a prop para 20
    await wrapper.setProps({ value: 20 });
    await wrapper.vm.$nextTick();

    // Verifica se o valor do campo foi atualizado para 20
    expect(wrapper.find('v-text-field-stub').props('value')).toBe(20);
  });

  it('disables field when disabled prop is true', async () => {
    const wrapper = shallowMount(NumberField, {
      propsData: {
        disabled: false,
      },
    });

    // Altera a prop disabled para true
    await wrapper.setProps({ disabled: true });
    await wrapper.vm.$nextTick();

    // Verifica se o campo está desabilitado
    expect(wrapper.find('v-text-field-stub').attributes('disabled')).toBe('true');
  });

  it('emits update:value event when input changes', async () => {
    const wrapper = shallowMount(NumberField);

    // Simula uma mudança no valor de entrada chamando o método onInput diretamente
    wrapper.vm.onInput({ target: { value: '42' } });

    // Verifica se o evento 'update:value' foi emitido
    expect(wrapper.emitted('update:value')).toBeTruthy();
    // Verifica se o evento foi emitido com o valor correto
    expect(wrapper.emitted('update:value')[0]).toEqual([42]);
  });

  it('emits 0 when input is invalid', async () => {
    const wrapper = shallowMount(NumberField);

    // Simula uma mudança no valor de entrada com um valor inválido chamando o método onInput diretamente
    wrapper.vm.onInput({ target: { value: 'invalid' } });

    // Verifica se o evento 'update:value' foi emitido
    expect(wrapper.emitted('update:value')).toBeTruthy();
    // Verifica se o evento foi emitido com o valor 0
    expect(wrapper.emitted('update:value')[0]).toEqual([0]);
  });
});
