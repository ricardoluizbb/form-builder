import { mount } from "@vue/test-utils";
import BuilderCreateForm from "@/components/form-builder/BuilderCreateForm.vue";

// Mockando a store
jest.mock("@/stores/formStore", () => ({
  useFormStore: jest.fn(() => ({
    createNewForm: jest.fn(),
  })),
}));

describe("BuilderCreateForm", () => {
  it("emits 'form-saved' event when Enter is pressed", async () => {
    const wrapper = mount(BuilderCreateForm);

    // Digitando um texto no input
    const input = wrapper.find("input");
    await input.setValue("Meu formulário");

    // Simulate pressing Enter on the text field
    await input.trigger("keyup.enter");

    // Verifica se o evento form-saved é emitido
    expect(wrapper.emitted("form-saved")).toBeTruthy();

    // Verifica se o createNewForm foi chamado
    expect(wrapper.vm.builderFormStore.createNewForm).toHaveBeenCalledWith(
      "Meu formulário"
    );
  });

  it("does not emit 'form-saved' event when Enter is pressed with empty title", async () => {
    const wrapper = mount(BuilderCreateForm);

    await wrapper.find("input").trigger("keyup.enter");

    expect(wrapper.emitted("form-saved")).toBeFalsy();
  });
});
