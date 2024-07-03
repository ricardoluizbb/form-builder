import { shallowMount } from "@vue/test-utils";
import DeleteDialog from "@/components/shared/DeleteDialog.vue";

describe("DeleteDialog.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(DeleteDialog, {
      propsData: {
        title: "Confirm Deletion",
        message: "Are you sure you want to delete this item?",
      },
    });
  });

  // Teste para verificar se o diálogo é renderizado corretamente com o título e mensagem
  it("renders the dialog with the correct title and message", () => {
    expect(wrapper.find(".headline").text()).toBe("Confirm Deletion");
    expect(wrapper.find("#message").text()).toBe(
      "Are you sure you want to delete this item?"
    );
  });

  // Teste para verificar se o diálogo é aberto corretamente quando o método openDialog é chamado
  it("opens the dialog when openDialog method is called", () => {
    wrapper.vm.openDialog();
    expect(wrapper.vm.dialog).toBe(true);
  });
});
