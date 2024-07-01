<template>
    <v-dialog v-model="internalDialogVisible" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Formulários criados
        </v-card-title>
  
        <v-list>
          <v-list-item v-for="form in forms" :key="form.id">
            <v-list-item-title class="primary--text">{{ form.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import { useFillFormStore } from "@/stores/fillFormStore";
  
  export default {
    name: 'NewFormDialog',
    props: {
      dialog: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        internalDialogVisible: this.dialog,
      };
    },
    computed: {
      forms() {
        const fillFormStore = useFillFormStore();
        return fillFormStore.getForms;
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
    },
  };
  </script>
  