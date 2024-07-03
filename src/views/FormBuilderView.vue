<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="2">
        <BuilderLeftColumn
          :forms="forms"
          :selectedForm="selectedForm"
          @form-selected="selectForm"
          @new-form="showNewForm"
        />
      </v-col>
      <v-col cols="12" md="1">
        <v-divider vertical class="d-none d-md-block"></v-divider>
        <!-- divider na horizontal em telas pequenas -->
        <v-divider class="d-md-none"></v-divider>
      </v-col>
      <v-col cols="12" md="9">
        <template v-if="showNewFormComponent">
          <BuilderCreateForm @form-saved="hideNewForm" />
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
import BuilderCreateForm from '@/components/form-builder/BuilderCreateForm.vue';
import { useFormStore } from '@/stores/formStore';

export default {
  name: 'FormBuilderView',
  components: {
    BuilderLeftColumn,
    BuilderRightColumn,
    BuilderCreateForm,
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
.fill-height {
  height: 100vh;
}
</style>
