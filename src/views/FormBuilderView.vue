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
import { useFormStore } from '@/stores/formStore';

export default {
  name: 'FormBuilderView',
  components: {
    BuilderLeftColumn,
    BuilderRightColumn,
  },
  data() {
    return {
      formStore: useFormStore(),
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
      this.formStore.selectForm(form);
    },
    createNewForm() {
      this.formStore.createNewForm();
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
