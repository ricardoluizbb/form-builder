import { mount, createLocalVue } from '@vue/test-utils'
import MonetaryField from '@/components/fields/MonetaryField.vue'

const localVue = createLocalVue()

describe('MonetaryField.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(MonetaryField, {
      localVue,
    })

    // Verifica se o campo está sendo renderizado corretamente
    expect(wrapper.find('#monetary-field').exists()).toBe(true)

    // Verifica se o label padrão está sendo exibido
    expect(wrapper.find('label').text()).toBe('Campo monetário')

    // Verifica se o valor inicial está correto
    expect(wrapper.vm.value).toBe('0,00') 
    expect(wrapper.find('#monetary-field').element.value).toBe('0,00')
    
    // Verifica se o campo não está desabilitado por padrão
    expect(wrapper.find('#monetary-field').attributes('disabled')).toBeUndefined()
  })

  it('disables the field when disabled prop is true', () => {
    const wrapper = mount(MonetaryField, {
      localVue,
      propsData: {
        disabled: true,
      },
    })

    // Verica se o campo está desabilitado
    expect(wrapper.find('#monetary-field').attributes('disabled')).toBe('disabled')
  })

  it('updates the value when user types into the field', async () => {
    const wrapper = mount(MonetaryField, {
      localVue,
    })

    // Digitando um valor no campo
    const inputField = wrapper.find('#monetary-field')
    await inputField.setValue('2,00')
    expect(wrapper.vm.value).toBe('2,00')

    // Verificando se o input está exibindo o valor corretamente
    expect(inputField.element.value).toBe('2,00')
  })

  it('formats the value correctly on initial render', () => {
    const wrapper = mount(MonetaryField, {
      localVue,
    })

    // Verifica se o valor inicial é formatado corretamente
    expect(wrapper.vm.value).toBe('0,00') // O valor inicial formatado é '0,00'
    expect(wrapper.find('#monetary-field').element.value).toBe('0,00') // Valor renderizado com prefixo 'R$'
  })
})
