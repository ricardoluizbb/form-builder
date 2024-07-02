import { shallowMount } from '@vue/test-utils';
import MultiSelectionField from '@/components/form-builder/fields/MultiSelectionField.vue';

describe('MultiSelectionField', () => {
  it('renders correctly with default props', () => {
    const wrapper = shallowMount(MultiSelectionField, {
      propsData: {
        label: 'Test Label',
        options: ['Option 1', 'Option 2', 'Option 3'],
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('#multi-selection').attributes('label')).toBe('Test Label');
    expect(wrapper.find('#multi-selection').vm.items).toEqual(['Option 1', 'Option 2', 'Option 3']);
    expect(wrapper.find('#multi-selection').attributes('disabled')).toBe(undefined);
  });

  it('displays the correct label', () => {
    const wrapper = shallowMount(MultiSelectionField, {
      propsData: {
        label: 'Test Label',
        options: ['Option 1', 'Option 2'],
      },
    });

    expect(wrapper.find('#multi-selection').attributes('label')).toBe('Test Label');
  });

  it('updates items when options prop changes', async () => {
    const wrapper = shallowMount(MultiSelectionField, {
      propsData: {
        label: 'Test Label',
        options: ['Option A', 'Option B'],
      },
    });

    await wrapper.setProps({ options: ['Option X', 'Option Y', 'Option Z'] });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.items).toEqual(['Option X', 'Option Y', 'Option Z']);
  });

  it('disables field when disabled prop is true', async () => {
    const wrapper = shallowMount(MultiSelectionField, {
      propsData: {
        label: 'Test Label',
        options: ['Option 1', 'Option 2'],
        disabled: false,
      },
    });

    await wrapper.setProps({ disabled: true });
    await wrapper.vm.$nextTick();

    expect(wrapper.find('#multi-selection').attributes('disabled')).toBeTruthy();
  });

  it('emits input event when selected values change', async () => {
    const wrapper = shallowMount(MultiSelectionField, {
      propsData: {
        label: 'Test Label',
        options: ['Option 1', 'Option 2'],
        value: ['Option 1'],
      },
    });

    await wrapper.setData({ selectedValues: ['Option 2'] });

    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0]).toEqual([['Option 2']]);
  });

  it('updates selected values when value prop changes', async () => {
    const wrapper = shallowMount(MultiSelectionField, {
      propsData: {
        label: 'Test Label',
        options: ['Option 1', 'Option 2'],
        value: ['Option 1'],
      },
    });

    await wrapper.setProps({ value: ['Option 2'] });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedValues).toEqual(['Option 2']);
  });

  it('emits empty array when all selections are cleared', async () => {
    const wrapper = shallowMount(MultiSelectionField, {
      propsData: {
        label: 'Test Label',
        options: ['Option 1', 'Option 2'],
        value: ['Option 1', 'Option 2'],
      },
    });

    await wrapper.setData({ selectedValues: [] });

    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0]).toEqual([[]]);
  });
});
