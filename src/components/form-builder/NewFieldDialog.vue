<template>
    <v-dialog v-model="dialog" width="450px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogTitle }}</span>
        </v-card-title>
        <!-- coloca as opções para os campos que precisam. Usar slot? -->
        <v-card-actions>
          <v-btn text color="primary" @click="saveField">Salvar</v-btn>
          <v-btn text color="negative" @click="closeDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>

  import TextField from '../fields/TextField.vue';

  export default {
    name: 'NewFieldDialog',
    data() {
      return {
        dialog: false,
        dialogTitle: '',
      };
    },
    methods: {
      open(type) {
        switch (type) {
          case 'text':
            this.dialogTitle = 'Campo de Texto';
            return TextField
          case 'numeric':
            this.dialogTitle = 'Campo Numérico';
            break;
          case 'checkbox':
            this.dialogTitle = 'Campo Caixa de Seleção';
            break;
          case 'datetime':
            this.dialogTitle = 'Campo Data/Hora';
            break;
          case 'color':
            this.dialogTitle = 'Campo Escolher Cor';
            break;
          case 'currency':
            this.dialogTitle = 'Campo Valor Monetário';
            break;
          default:
            break;
        }
        this.dialog = true;
      },
      closeDialog() {
        this.dialog = false;
      },
      saveField() {
        this.closeDialog();
      }
    }
  };
  </script>
  