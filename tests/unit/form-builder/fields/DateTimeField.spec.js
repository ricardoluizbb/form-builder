import { shallowMount, createLocalVue } from '@vue/test-utils'
import DateTimeField from '@/components/form-builder/fields/DateTimeField.vue'

const localVue = createLocalVue()

describe('DateTimeField.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = shallowMount(DateTimeField, {
      localVue,
    })

    // Verifica se o campo está sendo renderizado corretamente
    expect(wrapper.find('#date-time').exists()).toBe(true)

    // Verifica se o campo não está desabilitado por padrão
    expect(wrapper.find('#date-time').attributes('disabled')).toBeUndefined()

    // Verifica se o tipo do campo é datetime-local
    expect(wrapper.find('#date-time').attributes('type')).toBe('datetime-local')
  })

  it('disables the field when disabled prop is true', () => {
    const wrapper = shallowMount(DateTimeField, {
      localVue,
      propsData: {
        disabled: true,
      },
    })

    // Verifica se o campo está desabilitado
    expect(wrapper.find('#date-time').attributes('disabled')).toBe('true')
  })

  it('renders custom label when provided', () => {
    const customLabel = 'Escolha a data e hora'
    const wrapper = shallowMount(DateTimeField, {
      localVue,
      propsData: {
        label: customLabel,
      },
    })

    // Verifica se o label customizado está sendo exibido corretamente
    expect(wrapper.find('#date-time').attributes('label')).toBe(customLabel)
  })
})
