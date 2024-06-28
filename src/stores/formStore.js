// stores/formStore.js
import { defineStore } from 'pinia';

const LOCAL_STORAGE_KEY = 'formsData';

export const useFormStore = defineStore({
  id: 'formStore',
  state: () => ({
    forms: [],
    selectedForm: null,
  }),
  actions: {
    loadForms() {
      const savedForms = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedForms) {
        this.forms = JSON.parse(savedForms);
      } else {
        this.forms = [
          { id: 1, name: 'Formulário de Contato', description: 'Formulário para contato com cliente.' },
          { id: 2, name: 'Formulário de Cadastro', description: 'Formulário para cadastro de usuários.' },
          { id: 3, name: 'Formulário de Feedback', description: 'Formulário para coleta de feedback dos clientes.' },
        ];
      }
    },
    saveForms() {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.forms));
    },
    selectForm(form) {
      this.selectedForm = form;
    },
    createNewForm() {
      const newForm = {
        id: this.forms.length + 1,
        name: 'Novo Formulário',
        description: 'Descrição do novo formulário.',
      };
      this.forms.push(newForm);
      this.selectedForm = newForm;
      this.saveForms();
    },
  },
});
