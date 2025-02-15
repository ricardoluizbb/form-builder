<template>
  <div>
    <div v-if="builderFormStore.selectedForm">
      <div class="d-flex">
        <h2 class="mb-8" v-if="!editingTitle">
          {{ builderFormStore.selectedForm.title }}
        </h2>

        <v-text-field
          v-else
          full-width
          v-model="editedTitle"
          dense
          outlined
        ></v-text-field>

        <v-btn class="ml-2" icon @click="toggleEditTitle">
          <v-icon size="20">{{
            editingTitle ? "mdi-check" : "mdi-pencil"
          }}</v-icon>
        </v-btn>
      </div>

      <v-row class="mb-4">
        <NewFieldMenu @field-selected="addField" />
        <v-btn color="red darken-1" outlined @click="openDeleteFormDialog"
          >Excluir formulário</v-btn
        >
      </v-row>
      <div>
        <div
          v-for="(field, index) in builderFormStore.selectedForm.fields"
          :key="index"
          class="d-flex align-center"
        >
          <component
            :is="field.component"
            :label="field.label"
            v-model="field.value"
            :options="field.options"
          />
          <v-menu offset-y class="ml-2">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="align-self-start"
                dense
                icon
                color="grey"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="confirmDeleteField(index)">
                <v-list-item-title>Excluir</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
    <DeleteDialog
      ref="deleteDialog"
      :title="deleteDialogTitle"
      :message="deleteDialogMessage"
      @confirm-delete="handleConfirmDelete"
    />
  </div>
</template>

<script>
import NumberField from "../fields/NumberField.vue";
import TextField from "../fields/TextField.vue";
import TextareaField from "../fields/TextareaField.vue";
import DateField from "../fields/DateField.vue";
import DateTimeField from "../fields/DateTimeField.vue";
import TimeField from "../fields/TimeField.vue";
import FileField from "../fields/FileField.vue";
import MonetaryField from "../fields/MonetaryField.vue";
import SelectionField from "../fields/SelectionField.vue";
import MultiSelectionField from "../fields/MultiSelectionField.vue";
import ColorField from "../fields/ColorField.vue";

import NewFieldMenu from "@/components/form-builder/NewFieldMenu.vue";
import { useFormStore } from "@/stores/formStore";
import DeleteDialog from "../shared/DeleteDialog.vue";

export default {
  name: "BuilderRightColumn",
  components: {
    NewFieldMenu,
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
  data() {
    return {
      builderFormStore: useFormStore(),
      fieldIndexToDelete: null,
      deleteDialogTitle: "",
      deleteDialogMessage: "",
      deleteType: "",
      editingTitle: false,
      editedTitle: "",
    };
  },
  methods: {
    addField(field) {
      if (this.builderFormStore.selectedForm) {
        const value = this.getInitialValue(field);
        this.builderFormStore.selectedForm.fields.push({
          label: field.label,
          component: this.getFieldComponent(field),
          value,
          options: field.customOptions,
        });
        this.builderFormStore.saveForms();
      }
    },
    getInitialValue(field) {
      switch (field.type) {
        case "numeric":
        case "currency":
          return 0;
        case "selection":
          return field.option == "Múltipla escolha" ? [] : "";
        default:
          return "";
      }
    },
    getFieldComponent(field) {
      switch (field.type) {
        case "text":
          return field.option === "Texto curto" ? "TextField" : "TextareaField";
        case "selection":
          return field.option == "Seleção única"
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
    openDeleteFormDialog() {
      this.deleteDialogTitle = "Excluir Formulário";
      this.deleteDialogMessage =
        "Tem certeza que deseja excluir este formulário?";
      this.deleteType = "form";
      this.$refs.deleteDialog.openDialog();
    },
    deleteForm() {
      if (this.builderFormStore.selectedForm) {
        this.builderFormStore.deleteForm(this.builderFormStore.selectedForm.id);
        this.builderFormStore.clearSelectedForm();
      }
    },
    confirmDeleteField(index) {
      this.fieldIndexToDelete = index;
      this.deleteDialogTitle = "Excluir Campo";
      this.deleteDialogMessage = "Tem certeza que deseja excluir este campo?";
      this.deleteType = "field";
      this.$refs.deleteDialog.openDialog();
    },
    deleteField() {
      if (this.fieldIndexToDelete !== null) {
        this.builderFormStore.deleteFieldFromSelectedForm(
          this.fieldIndexToDelete
        );
        this.fieldIndexToDelete = null;
      }
    },
    handleConfirmDelete() {
      if (this.deleteType === "form") {
        this.deleteForm();
      } else if (this.deleteType === "field") {
        this.deleteField();
      }
    },
    toggleEditTitle() {
      if (!this.builderFormStore.selectedForm) return;
      if (this.editingTitle) {
        this.builderFormStore.selectedForm.title = this.editedTitle;
        this.builderFormStore.saveForms();
      } else {
        this.editedTitle = this.builderFormStore.selectedForm.title;
      }
      this.editingTitle = !this.editingTitle;
    },
  },
};
</script>
