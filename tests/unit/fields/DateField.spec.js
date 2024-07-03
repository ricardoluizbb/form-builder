import { shallowMount, createLocalVue } from '@vue/test-utils'
import DateField from '@/components/fields/DateField.vue'

const localVue = createLocalVue()

describe('DateField.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = shallowMount(DateField, {
      localVue,
    })

    // Verifica se o campo está sendo renderizado corretamente
    expect(wrapper.find('#date-field').exists()).toBe(true)

    // Verifica se o campo não está desabilitado por padrão
    expect(wrapper.find('#date-field').attributes('disabled')).toBeUndefined()

    // Verifica se o tipo do campo é date
    expect(wrapper.find('#date-field').attributes('type')).toBe('date')

    // Verifica se o label padrão está sendo exibido corretamente
    expect(wrapper.find('#date-field').attributes('label')).toBe('Data')
  })

  it('disables the field when disabled prop is true', () => {
    const wrapper = shallowMount(DateField, {
      localVue,
      propsData: {
        disabled: true,
      },
    })

    // Verifica se o campo está desabilitado
    expect(wrapper.find('#date-field').attributes('disabled')).toBe('true')
  })

  it('renders custom label when provided', () => {
    const customLabel = 'Escolha a data'
    const wrapper = shallowMount(DateField, {
      localVue,
      propsData: {
        label: customLabel,
      },
    })

    // Verifica se o label personalizado está sendo exibido corretamente
    expect(wrapper.find('#date-field').attributes('label')).toBe(customLabel)
  })
})
