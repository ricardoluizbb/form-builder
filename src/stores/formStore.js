import { defineStore } from 'pinia';

export const useFormStore = defineStore({
  id: 'formStore',
  state: () => ({
    forms: [
      { id: 1, name: 'Formulário de Contato', description: 'Formulário para contato com cliente.' },
      { id: 2, name: 'Formulário de Cadastro', description: 'Formulário para cadastro de usuários.' },
      { id: 3, name: 'Formulário de Feedback', description: 'Formulário para coleta de feedback dos clientes.' },
    ],
    selectedForm: null,
  }),
  actions: {
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
    },
  },
});
``
