import { shallowMount, createLocalVue } from '@vue/test-utils'
import FileField from '@/components/fields/FileField.vue'

const localVue = createLocalVue()

describe('FileField.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = shallowMount(FileField, {
      localVue,
    })

    // Verifica se o campo está sendo renderizado corretamente
    expect(wrapper.find('#file-field').exists()).toBe(true)

    // Verifica se o label padrão está sendo exibido corretamente
    expect(wrapper.props().label).toBe('Anexo')

    // Verifica se o campo não está desabilitado por padrão
    expect(wrapper.find('#file-field').attributes('disabled')).toBeUndefined()

    // Verifica se o campo aceita múltiplos arquivos por padrão
    expect(wrapper.attributes('multiple')).toBeTruthy()
  })

  it('disables the field when disabled prop is true', () => {
    const wrapper = shallowMount(FileField, {
      localVue,
      propsData: {
        disabled: true,
      },
    })

    // Verifica se o campo está desabilitado
    expect(wrapper.attributes('disabled')).toBeTruthy()
  })

  it('renders custom label when provided', () => {
    const customLabel = 'Arquivos'
    const wrapper = shallowMount(FileField, {
      localVue,
      propsData: {
        label: customLabel,
      },
    })

    // Verifica se o label customizado está sendo exibido corretamente
    expect(wrapper.props().label).toBe(customLabel)
  })
})
