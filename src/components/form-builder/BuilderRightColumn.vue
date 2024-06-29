<template>
  <div v-if="selectedForm">
    <div class="mb-4">
      <h3>{{ selectedForm.title }}</h3>
      <FieldsMenu @field-selected="addField" />
    </div>
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
          label: this.getFieldLabel(field),
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
    getFieldLabel(field) {
      switch (field.type) {
        case "text":
          return "Campo de texto";
        case "selection":
          return "Campo de seleção";
        case "datetime":
          return "Data/Hora";
        case "numeric":
          return "Numérico";
        case "color":
          return "Cor";
        case "currency":
          return "Valor monetário";
        case "file":
          return "Anexo";
        default:
          break;
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
  },
};
</script>
