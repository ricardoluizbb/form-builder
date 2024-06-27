<template>
  <v-container fluid>
    <v-row no-gutters>
      <!-- Created form list -->
      <v-col cols="3">
        <BuilderLeftColumn
          :forms="forms"
          :selectedForm="selectedForm"
          @form-selected="selectForm"
          @new-form="createNewForm"
        />
      </v-col>
      <v-divider vertical></v-divider>
      <!-- Selected form or new form render -->
      <v-col cols="8">
        <BuilderRightColumn :selectedForm="selectedForm" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BuilderLeftColumn from '@/components/form-builder/BuilderLeftColumn.vue';
import BuilderRightColumn from '@/components/form-builder/BuilderRightColumn.vue';

export default {
  data() {
    return {
      forms: [
        { id: 1, name: 'Formulário de Contato', description: 'Formulário para contato com cliente.' },
        { id: 2, name: 'Formulário de Cadastro', description: 'Formulário para cadastro de usuários.' },
        { id: 3, name: 'Formulário de Feedback', description: 'Formulário para coleta de feedback dos clientes.' },
      ],
      selectedForm: null,
    };
  },
  components: {
    BuilderLeftColumn,
    BuilderRightColumn
  },
  methods: {
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
};
</script>

<style scoped>
.active-form {
  background-color: #f0f0f0;
}
</style>
