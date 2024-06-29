<template>
  <div>
    <div v-if="selectedForm">
      <h2 class="mb-8">{{ selectedForm.title }}</h2>
      <v-row class="mb-4 justify-space-between">
        <FieldsMenu @field-selected="addField" />
        <v-btn color="red darken-1" outlined @click="openDeleteDialog">Excluir formulário</v-btn>
      </v-row>
      <div v-for="(field, index) in selectedForm.fields" :key="index">
        <component
          :is="field.component"
          :label="field.label"
          v-model="field.value"
        />
      </div>
    </div>
    <div v-else>
      <p>Selecione um formulário para visualizar aqui.</p>
    </div>
    <DeleteFormDialog ref="deleteDialog" @confirm-delete="deleteForm" />
  </div>
</template>

<script>
import FieldsMenu from "@/components/form-builder/FieldsMenu.vue";
import { useFormStore } from "@/stores/formStore";
import NumberField from "./fields/NumberField.vue";
import TextField from "./fields/TextField.vue";
import TextareaField from "./fields/TextareaField.vue";
import DateField from "./fields/DateField.vue";
import DateTimeField from "./fields/DateTimeField.vue";
import TimeField from "./fields/TimeField.vue";
import FileField from "./fields/FileField.vue";
import MonetaryField from "./fields/MonetaryField.vue";
import SelectionField from "./fields/SelectionField.vue";
import MultiSelectionField from "./fields/MultiSelectionField.vue";
import ColorField from "./fields/ColorField.vue";
import DeleteFormDialog from "./DeleteFormDialog.vue";

export default {
  name: "BuilderRightColumn",
  components: {
    FieldsMenu,
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
    DeleteFormDialog,
  },
  data() {
    return {
      formStore: useFormStore(),
    };
  },
  computed: {
    selectedForm() {
      return this.formStore.selectedForm;
    },
  },
  methods: {
    addField(field) {
      if (this.selectedForm) {
        const value = this.getInitialValue(field);
        this.selectedForm.fields.push({
          label: field.label,
          component: this.getFieldComponent(field),
          value,
        });
        this.formStore.saveForms();
      }
    },
    getInitialValue(field) {
      switch (field.type) {
        case "numeric":
        case "currency":
          return 0;
        default:
          return "";
      }
    },
    getFieldComponent(field) {
      switch (field.type) {
        case "text":
          return field.option === "Texto curto" ? "TextField" : "TextareaField";
        case "selection":
          return field.option === "Escolha única"
            ? "SelectionField"
            : "MultiSelectionField";
        case "datetime":
          if (field.option === "Apenas data") return "DateField";
          if (field.option === "Apenas hora") return "TimeField";
          if (field.option === "Data e hora") return "DateTimeField";
          break;
        case "numeric":
          return "NumberField";
        case "color":
          return "ColorField";
        case "currency":
          return "MonetaryField";
        case "file":
          return "FileField";
        default:
          break;
      }
    },
    openDeleteDialog() {
      this.$refs.deleteDialog.openDialog();
    },
    deleteForm() {
      if (this.selectedForm) {
        this.formStore.deleteForm(this.selectedForm.id);
        this.formStore.clearSelectedForm();
      }
    },
  },
};
</script>
