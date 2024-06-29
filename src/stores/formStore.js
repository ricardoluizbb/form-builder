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
        this.forms = [];
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
    deleteForm(formId) {
      this.forms = this.forms.filter(form => form.id !== formId);
      this.saveForms();
    },
    clearSelectedForm() {
      this.selectedForm = null;
    },
  },
});
