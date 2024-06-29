<template>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Excluir Formulário</v-card-title>
        <v-card-text>Você tem certeza que deseja excluir este formulário?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDialog">Cancelar</v-btn>
          <v-btn color="red darken-1" text @click="confirmDelete">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: "DeleteFormDialog",
    data() {
      return {
        dialog: false,
      };
    },
    methods: {
      openDialog() {
        this.dialog = true;
      },
      closeDialog() {
        this.dialog = false;
      },
      confirmDelete() {
        this.$emit('confirm-delete');
        this.closeDialog();
      },
    },
  };
  </script>
  