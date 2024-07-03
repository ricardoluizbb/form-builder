<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <FillLeftColumn />
      </v-col>

      <v-col cols="2">
        <v-divider vertical></v-divider>
      </v-col>

      <v-col cols="6">
        <FillRightColumn />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FillLeftColumn from "@/components/fill-form/FillLeftColumn.vue";
import FillRightColumn from "@/components/fill-form/FillRightColumn.vue";

export default {
  name: "FillFormView",
  components: {
    FillLeftColumn,
    FillRightColumn
  },
  data() {
    return {
      showNewFormComponent: false,
    };
  },
};
</script>

<style scoped>
</style>
