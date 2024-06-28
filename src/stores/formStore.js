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
          { id: 1, title: 'Formulário de Contato', fields: [{ label: 'Texto simples', type: 'text', value: '' }, { label: 'Anexo', type: 'file', value: '' }] },
          { id: 2, title: 'Formulário de Cadastro', fields: [{ label: 'Parágrafo', type: 'text', value: '' }, { label: 'checkbox', type: 'checkbox', value: '' }] },
          { id: 3, title: 'Formulário de Feedback', fields: [{ label: 'Comentário', type: 'textarea', value: '' }] },
        ];
      }
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
  },
});
