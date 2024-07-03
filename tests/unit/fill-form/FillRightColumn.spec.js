import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import FillRightColumn from "@/components/fill-form/FillRightColumn.vue";

// Mock da store
jest.mock("@/stores/fillFormStore", () => ({
  useFillFormStore: jest.fn(() => ({
    selectedForm: {
      title: "Formulário de Teste",
      fields: [
        { component: "TextField", label: "Nome", value: "John Doe" },
        { component: "NumberField", label: "Idade", value: 30 },
      ],
    },
    saveFillFormsList: jest.fn(),
    deleteForm: jest.fn(),
  })),
}));

describe("FillRightColumn", () => {
  let vuetify;
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
  });

  it("renders selected form details correctly", () => {
    const wrapper = shallowMount(FillRightColumn, {
      localVue,
      vuetify,
    });

    // Verifica se o título do formulário é renderizado corretamente
    const title = wrapper.find("h2");
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe("Formulário de Teste");

    const deleteButton = wrapper.find("#delete-form-btn");
    expect(deleteButton.exists()).toBe(true);
    expect(deleteButton.text()).toContain("Excluir formulário");

    // Verifica se os campos do formulário são renderizados corretamente
    const textFields = wrapper.findAllComponents({ name: "TextField" });
    expect(textFields.length).toBe(1); // Deve haver 1 campo de TextField renderizado

    const numberFields = wrapper.findAllComponents({ name: "NumberField" });
    expect(numberFields.length).toBe(1); // Deve haver 1 campo de NumberField renderizado
  });

  it("opens delete dialog when delete button is clicked", async () => {
    const wrapper = shallowMount(FillRightColumn, {
      localVue,
      vuetify,
    });

    const deleteDialog = wrapper.findComponent({ name: "DeleteDialog" });

    // Simula o clique no botão de exclusão
    await wrapper.find("#delete-form-btn").trigger("click");

    // Verifica se o dialog de exclusão está visível após o clique
    expect(deleteDialog.exists()).toBe(true);
  });
});
