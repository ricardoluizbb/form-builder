<template>
  <v-container fluid>
    <v-row no-gutters>
      <!-- Lista de formulários criados -->
      <v-col cols="2">
        <BuilderLeftColumn
          :forms="forms"
          :selectedForm="selectedForm"
          @form-selected="selectForm"
          @new-form="showNewForm"
        />
      </v-col>
      <v-col cols="2">
        <v-divider vertical></v-divider>
      </v-col>
      <!-- Formulário selecionado renderizado -->
      <v-col cols="6">
        <template v-if="showNewFormComponent">
          <NewForm @form-saved="hideNewForm" />
        </template>
        <template v-else>
          <BuilderRightColumn :selectedForm="selectedForm" />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BuilderLeftColumn from '@/components/form-builder/BuilderLeftColumn.vue';
import BuilderRightColumn from '@/components/form-builder/BuilderRightColumn.vue';
import NewForm from '@/components/form-builder/NewForm.vue';
import { useFormStore } from '@/stores/formStore';

export default {
  name: 'FormBuilderView',
  components: {
    BuilderLeftColumn,
    BuilderRightColumn,
    NewForm,
  },
  data() {
    return {
      formStore: useFormStore(),
      showNewFormComponent: false,
    };
  },
  computed: {
    forms() {
      return this.formStore.forms;
    },
    selectedForm() {
      return this.formStore.selectedForm;
    },
  },
  methods: {
    selectForm(form) {
      console.log("chamei")
      this.formStore.selectForm(form);
      this.showNewFormComponent = false;
    },
    showNewForm() {
      this.showNewFormComponent = true;
    },
    hideNewForm() {
      this.showNewFormComponent = false;
    },
  },
  mounted() {
    this.formStore.loadForms();
  },
};
</script>

<style scoped>
.active-form {
  background-color: #f0f0f0;
}
</style>
