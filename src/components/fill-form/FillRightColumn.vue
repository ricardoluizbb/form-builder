<template>
  <div>
    <div v-if="fillFormStore.selectedForm">
      <h2 class="mb-4">{{ fillFormStore.selectedForm.title }}</h2>
      <div class="mb-4">
        <v-btn color="primary" @click="toggleEditMode">
          {{ isEditing ? 'Salvar formulário' : 'Editar formulário' }}
        </v-btn>
        <v-btn
          id="delete-form-btn"
          color="red darken-1"
          outlined
          @click="openDeleteFormDialog"
        >Excluir formulário
        </v-btn>
      </div>
      <div v-for="(field, index) in fillFormStore.selectedForm.fields" :key="index" class="d-flex align-center">
        <component
          :is="field.component"
          :label="field.label"
          v-model="field.value"
          :options="field.options"
          :disabled="!isEditing"
        />
      </div>
    </div>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :timeout="3000">
      {{ snackbarMessage }}
    </v-snackbar>

    <!-- Delete Dialog -->
    <delete-dialog
      ref="deleteDialog"
      title="Excluir Formulário"
      message="Você tem certeza que deseja excluir este formulário?"
      @confirm-delete="deleteForm"
    />
  </div>
</template>

<script>
import { useFillFormStore } from "@/stores/fillFormStore";

import NumberField from "../fields/NumberField.vue";
import TextField from "../fields/TextField.vue";
import TextareaField from "../fields/TextareaField.vue";
import DateField from "../fields/DateField.vue";
import DateTimeField from "../fields/DateTimeField.vue";
import TimeField from "../fields/TimeField.vue";
import FileField from "../fields/FileField.vue";
import MonetaryField from "../fields/MonetaryField.vue";
import SelectionField from "../fields/SelectionField.vue";
import ColorField from "../fields/ColorField.vue";
import MultiSelectionField from "../fields/MultiSelectionField.vue";
import DeleteDialog from "../shared/DeleteDialog.vue";

export default {
  name: "FillRightColumn",
  data() {
    return {
      fillFormStore: useFillFormStore(),
      isEditing: true,
      snackbar: false,
      snackbarMessage: '',
    };
  },
  watch: {
    'fillFormStore.selectedForm'(newForm, oldForm) {
      if (newForm && newForm !== oldForm) {
        this.isEditing = true;
      }
    },
  },
  methods: {
    toggleEditMode() {
      if (this.isEditing) {
        this.fillFormStore.saveFillFormsList();
        this.showSnackbar("Formulário salvo com sucesso");
      }
      this.isEditing = !this.isEditing;
    },
    showSnackbar(message) {
      this.snackbarMessage = message;
      this.snackbar = true;
    },
    openDeleteFormDialog() {
      this.$refs.deleteDialog.openDialog();
    },
    deleteForm() {
      this.fillFormStore.deleteForm(this.fillFormStore.selectedForm);
      this.showSnackbar("Formulário excluído com sucesso");
    },
  },
  components: {
    NumberField,
    TextField,
    TextareaField,
    DateField,
    DateTimeField,
    TimeField,
    FileField,
    MonetaryField,
    SelectionField,
    MultiSelectionField,
    ColorField,
    DeleteDialog,
  },
};
</script>
