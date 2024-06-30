<template>
    <v-dialog v-model="dialogVisible" max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="surface-variant"
          text="Open Dialog"
          variant="flat"
        ></v-btn>
      </template>
  
      <template v-slot:default>
        <v-card title="Dialog">
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close Dialog" @click="dialogVisible = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: "FillNewFormDialog",
    data() {
      return {
        dialogVisible: false,
      };
    },
  };
  </script>
  