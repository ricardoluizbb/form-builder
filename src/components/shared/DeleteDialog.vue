<template>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>{{ message }}</v-card-text>
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
    name: "DeleteDialog",
    props: {
      title: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
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
  