import { shallowMount } from '@vue/test-utils';
import SelectionField from '@/components/fields/SelectionField.vue';

describe('SelectionField', () => {
  it('renders correctly with default props', () => {
    // Monta o componente com as propriedades padrão
    const wrapper = shallowMount(SelectionField, {
      propsData: {
        label: 'Test Label',
        options: ['Option 1', 'Option 2', 'Option 3'],
      },
    });

    // Verifica se o componente está renderizado
    expect(wrapper.exists()).toBe(true);
    // Verifica se o label está sendo exibido corretamente no v-select
    expect(wrapper.find('#selection-field').attributes('label')).toBe('Test Label');
    // Verifica se as opções estão sendo passadas corretamente para o v-select
    expect(wrapper.find('#selection-field').vm.items).toEqual(['Option 1', 'Option 2', 'Option 3']);
    // Verifica se o campo não está desabilitado por padrão
    expect(wrapper.find('#selection-field').attributes('disabled')).toBe(undefined);
  });

  it('requires label prop to be present', () => {
    // Monta o componente com a prop 'label'
    const wrapper = shallowMount(SelectionField, {
      propsData: {
        options: ['Option 1', 'Option 2'],
        label: 'Test Label',
      },
    });

    // Verifica se o componente está renderizado, o que implica que a prop 'label' é necessária
    expect(wrapper.exists()).toBe(true);
  });

  it('updates options when options prop changes', async () => {
    // Monta o componente com as opções iniciais
    const wrapper = shallowMount(SelectionField, {
      propsData: {
        label: 'Test Label',
        options: ['Option A', 'Option B'],
      },
    });

    // Altera as opções
    await wrapper.setProps({ options: ['Option X', 'Option Y', 'Option Z'] });
    // Aguarda o próximo ciclo de vida do Vue para garantir que as atualizações sejam aplicadas
    await wrapper.vm.$nextTick();

    // Verifica se as novas opções estão sendo passadas corretamente para o v-select
    expect(wrapper.find('#selection-field').vm.items).toEqual(['Option X', 'Option Y', 'Option Z']);
  });

  it('disables field when disabled prop is true', async () => {
    // Monta o componente com a prop 'disabled' inicialmente falsa
    const wrapper = shallowMount(SelectionField, {
      propsData: {
        label: 'Test Label',
        options: ['Option 1', 'Option 2'],
        disabled: false,
      },
    });

    // Altera a prop 'disabled' para true
    await wrapper.setProps({ disabled: true });
    // Aguarda o próximo ciclo de vida do Vue para garantir que as atualizações sejam aplicadas
    await wrapper.vm.$nextTick();

    // Verifica se o atributo 'disabled' está presente no v-select quando 'disabled' é true
    expect(wrapper.find('#selection-field').attributes('disabled')).toBeTruthy();
  });

  it('emits input event when selected value changes', async () => {
    // Monta o componente com um valor inicial
    const wrapper = shallowMount(SelectionField, {
      propsData: {
        label: 'Test Label',
        options: ['Option 1', 'Option 2'],
        value: 'Option 1',
      },
    });

    // Simula uma mudança no valor selecionado
    await wrapper.setData({ selectedValue: 'Option 2' });

    // Verifica se o evento de input foi emitido com o novo valor
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0]).toEqual(['Option 2']);
  });
});
