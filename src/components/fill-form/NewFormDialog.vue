<template>
  <v-dialog id="dialog" v-model="internalDialogVisible" width="500">
    <v-card>
      <v-card-title id="card-title" class="text-h5 grey lighten-2">
        Formulários criados
      </v-card-title>

      <v-list v-if="filteredForms.length > 0">
        <v-list-item
          v-for="form in filteredForms"
          :key="form.id"
          @click="addFormToList(form)"
        >
          <v-list-item-title id="form-title" class="primary--text">{{ form.title }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-card-text class="mt-2 text-subtitle" v-else>
        Não há formulários disponíveis.
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn id="close-btn" text @click="closeDialog">
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useFillFormStore } from "@/stores/fillFormStore";

export default {
  name: "NewFormDialog",
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      fillFormStore: useFillFormStore(),
      internalDialogVisible: this.dialog,
    };
  },
  computed: {
    forms() {
      return this.fillFormStore.getForms;
    },
    filledForms() {
      return this.fillFormStore.fillFormsList;
    },
    filteredForms() {
      return this.forms.filter(form => !this.filledForms.includes(form));
    },
  },
  watch: {
    dialog(val) {
      this.internalDialogVisible = val;
    },
    internalDialogVisible(val) {
      if (!val) {
        this.$emit("close-dialog");
      }
    },
  },
  methods: {
    closeDialog() {
      this.internalDialogVisible = false;
      this.$emit("close-dialog");
    },
    addFormToList(form) {
      this.fillFormStore.addFormToFillList(form);
      this.closeDialog();
    },
  },
};
</script>
