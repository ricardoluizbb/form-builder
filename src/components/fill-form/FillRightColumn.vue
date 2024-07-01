<template>
  <div>
    <div v-if="selectedForm">
      <h2>{{ selectedForm.title }}</h2>
      <div v-for="(field, index) in selectedForm.fields" :key="index" class="d-flex align-center">
        <component
          :is="field.component"
          :label="field.label"
          v-model="field.value"
          :options="field.options"
        />
      </div>
    </div>
    <div v-else class="text-center">
      <p>Selecione um formulário para visualizar aqui.</p>
    </div>
  </div>
</template>

<script>
import { useFillFormStore } from "@/stores/fillFormStore";

import NumberField from "../form-builder/fields/NumberField.vue";
import TextField from "../form-builder/fields/TextField.vue";
import TextareaField from "../form-builder/fields/TextareaField.vue";
import DateField from "../form-builder/fields/DateField.vue";
import DateTimeField from "../form-builder/fields/DateTimeField.vue";
import TimeField from "../form-builder/fields/TimeField.vue";
import FileField from "../form-builder/fields/FileField.vue";
import MonetaryField from "../form-builder/fields/MonetaryField.vue";
import SelectionField from "../form-builder/fields/SelectionField.vue";
import MultiSelectionField from "../form-builder/fields/MultiSelectionField.vue";
import ColorField from "../form-builder/fields/ColorField.vue";
import DeleteDialog from "../shared/DeleteDialog.vue";

export default {
  name: "FillRightColumn",
  data() {
    return {
      fillFormStore: useFillFormStore(),
    };
  },
  computed: {
    selectedForm() {
      return this.fillFormStore.selectedForm;
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
