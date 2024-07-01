<template>
  <div class="text-center">
    <v-btn width="100%" color="primary" outlined @click="dialog = true">
      Novo formulário
    </v-btn>

    <NewFormDialog :dialog="dialog" @close-dialog="dialog = false" />
  </div>
</template>

<script>
import NewFormDialog from "./NewFormDialog.vue";

export default {
  name: "FillLeftColumn",
  data() {
    return {
      dialog: false,
    };
  },
  components: {
    NewFormDialog,
  },
};
</script>
