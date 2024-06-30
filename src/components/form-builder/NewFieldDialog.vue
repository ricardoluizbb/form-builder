<template>
  <v-dialog persistent dense v-model="dialog" height="400px" width="400px">
    <v-card>
      <v-card-title class="mb-4">
        <span class="headline">{{ dialogTitle }}</span>
      </v-card-title>
      <v-card-subtitle>
        <span class="text-subtitle-1 text-justify">{{
          dialogDescription
        }}</span>
      </v-card-subtitle>
      <v-card-text class="pb-0">
        <v-text-field
          autofocus
          dense
          outlined
          label="Defina o nome deste campo"
          v-model="fieldLabel"
        ></v-text-field>
      </v-card-text>
      <v-card-text class="pt-0 pb-0">
        <v-radio-group v-if="fieldOptions.length" v-model="selectedOption">
          <v-radio
            v-for="option in fieldOptions"
            :key="option"
            :label="option"
            :value="option"
          ></v-radio>
        </v-radio-group>
        <div v-if="isSelectionFieldType">
          <v-text-field
            v-for="(option, index) in customOptions"
            :key="index"
            :label="'Opção ' + (index + 1)"
            v-model="customOptions[index]"
            dense
            outlined
          ></v-text-field>
          <v-btn
            text
            color="primary"
            @click="addOption"
            :disabled="customOptions.length >= 4"
          >
            Adicionar opção
          </v-btn>
          <v-alert v-if="customOptions.length >= 4" type="error" dense>
            Você só pode adicionar até 4 opções.
          </v-alert>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="!enableSaveButton"
          text
          color="primary"
          @click="saveField"
          >Salvar</v-btn
        >
        <v-btn text color="red darken-1" @click="closeDialog">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useFormStore } from "@/stores/formStore";
import { mapState } from "pinia";

export default {
  name: "NewFieldDialog",
  data() {
    return {
      dialog: false,
      fieldLabel: "",
      selectedOption: "",
      selectedFieldType: null,
      customOptions: [],
    };
  },
  computed: {
    ...mapState(useFormStore, ["fieldTypes"]),
    dialogTitle() {
      return this.selectedFieldType
        ? this.fieldTypes[this.selectedFieldType].title
        : "";
    },
    dialogDescription() {
      return this.selectedFieldType
        ? this.fieldTypes[this.selectedFieldType].description
        : "";
    },
    fieldOptions() {
      return this.selectedFieldType
        ? this.fieldTypes[this.selectedFieldType].options
        : [];
    },
    enableSaveButton() {
      return (
        this.fieldLabel && (!this.fieldOptions.length || this.selectedOption)
      );
    },
    isSelectionFieldType() {
      return this.selectedFieldType === "selection";
    },
  },
  methods: {
    open(type) {
      this.dialog = true;
      this.selectedFieldType = type;
      this.selectedOption = "";
      this.customOptions = [];
    },
    closeDialog() {
      this.dialog = false;
      this.fieldLabel = "";
      this.selectedFieldType = null;
    },
    addOption() {
      if (this.customOptions.length < 4) {
        this.customOptions.push("");
      }
    },
    saveField() {
      if (this.fieldLabel && this.selectedFieldType) {
        const field = {
          type: this.selectedFieldType,
          label: this.fieldLabel,
          option: this.selectedOption,
          customOptions: this.customOptions.filter(
            (option) => option.trim() !== ""
          ),
        };
        this.$emit("field-saved", field);
        this.closeDialog();
      }
    },
  },
};
</script>
