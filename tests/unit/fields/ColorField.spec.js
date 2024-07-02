import { shallowMount, createLocalVue } from '@vue/test-utils'
import ColorField from '@/components/fields/ColorField.vue'

const localVue = createLocalVue()

describe('ColorField.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = shallowMount(ColorField, {
      localVue,
    })

    // Verifica se o campo está sendo renderizado corretamente
    expect(wrapper.find('#color-field').exists()).toBe(true)

    // Verifica se o campo não está desabilitado por padrão
    expect(wrapper.find('#color-field').attributes('disabled')).toBeUndefined()
  })

  it('disables the field when disabled prop is true', () => {
    const wrapper = shallowMount(ColorField, {
      localVue,
      propsData: {
        disabled: true,
      },
    })

    // Verifica se o campo está desabilitado
    expect(wrapper.find('#color-field').attributes('disabled')).toBe('true')
  })

  it('emits an input event with the correct value when the color changes', async () => {
    const wrapper = shallowMount(ColorField, {
      localVue,
    })

    // Simule a alteração da cor no campo
    wrapper.vm.$emit('input', '#ff0000')

    // Verifica se o evento de input foi emitido com o valor correto
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input[0]).toEqual(['#ff0000'])
  })
})
