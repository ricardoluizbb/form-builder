import { defineStore } from "pinia";

const LOCAL_STORAGE_KEY = "formsData";

export const useFormStore = defineStore({
  id: "formStore",
  state: () => ({
    forms: [],
    selectedForm: null,
    fieldTypes: {
      text: {
        title: "Campo de Texto",
        description:
          "Um campo que o usuário pode digitar qualquer mensagem que desejar. Especifique o tipo do campo que deseja incluir:",
        options: ["Texto curto", "Parágrafo"],
      },
      numeric: {
        title: "Campo Numérico",
        description: "Um campo que o usuário pode digitar apenas números.",
        options: [],
      },
      selection: {
        title: "Campo Caixa de Seleção",
        description:
          "Um campo que o usuário pode selecionar uma ou mais respostas.",
        options: ["Seleção única", "Múltipla escolha"],
        selectableOptions: [],
      },
      datetime: {
        title: "Campo Data/Hora",
        description:
          "Um campo que o usuário pode selecionar data, hora ou data e hora. Escolha qual tipo de campo deseja incluir:",
        options: ["Apenas data", "Apenas hora", "Data e hora"],
      },
      color: {
        title: "Campo Escolher Cor",
        description: "Um campo que o usuário pode selecionar uma cor.",
        options: [],
      },
      currency: {
        title: "Campo Valor Monetário",
        description: "Um campo que o usuário pode digitar um valor monetário",
        options: [],
      },
      file: {
        title: "Campo de Arquivo",
        description: "Um campo que o usuário pode adicionar um arquivo.",
        options: [],
      },
    },
  }),
  actions: {
    loadForms() {
      const savedForms = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedForms) {
        this.forms = JSON.parse(savedForms);
      } else {
        this.forms = [];
      }
      console.log(savedForms)
    },
    saveForms() {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.forms));
    },
    selectForm(form) {
      this.selectedForm = form;
    },
    createNewForm(title) {
      const newForm = {
        id: this.forms.length + 1,
        title: title,
        fields: [],
      };
      this.forms.push(newForm);
      this.selectedForm = newForm;
      this.saveForms();
    },
    deleteForm(formId) {
      this.forms = this.forms.filter((form) => form.id !== formId);
      this.saveForms();
    },
    clearSelectedForm() {
      this.selectedForm = null;
    },
    addFieldToSelectedForm(field) {
      if (this.selectedForm) {
        this.selectedForm.fields.push(field);
        this.saveForms();
      }
    },
    deleteFieldFromSelectedForm(index) {
      if (this.selectedForm) {
        this.selectedForm.fields.splice(index, 1);
        this.saveForms();
      }
    },
  },
});
