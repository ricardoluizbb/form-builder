<template>
  <v-app-bar dense color="primary" app :elevation="2">
    <v-tabs color="white" centered>
      <v-tab class="white--text" to="/">Criar formulário</v-tab>
      <v-tab class="white--text" to="/fill-form">Preencher formulário</v-tab>
      <!-- <v-tab class="white--text" to="/filled-forms">Formulários preenchidos</v-tab> -->
    </v-tabs>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
};
</script>
