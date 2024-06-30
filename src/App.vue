<template>
  <v-app>
    <v-main>
      <AppBar/>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

import AppBar from "../src/components/shared/AppBar.vue"
export default {
  name: "App",
  components: { AppBar }
};
</script>
