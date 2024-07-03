<template>
  <v-container fluid>
    <v-row>
      <!-- Coluna esquerda para desktop -->
      <v-col cols="12" md="2" class="hidden-sm-and-down">
        <FillLeftColumn />
      </v-col>

      <v-col cols="12" md="1" class="fill-height hidden-sm-and-down">
        <v-divider vertical></v-divider>
      </v-col>

      <!-- Coluna da direita para desktop -->
      <v-col cols="12" md="9" class="hidden-sm-and-down">
        <FillRightColumn />
      </v-col>

      <!-- Lista de form para mobile -->
      <v-col cols="12" class="hidden-md-and-up">
        <template v-if="!fillFormStore.selectedForm">
          <FillLeftColumn />
        </template>
        <template v-else>
          <v-btn icon @click="fillFormStore.clearSelectedForm">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <FillRightColumn />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FillLeftColumn from "@/components/fill-form/FillLeftColumn.vue";
import FillRightColumn from "@/components/fill-form/FillRightColumn.vue";
import { useFillFormStore } from "@/stores/fillFormStore";

export default {
  name: "FillFormView",
  data() {
    return {
      fillFormStore: useFillFormStore()
    }
  },
  components: {
    FillLeftColumn,
    FillRightColumn,
  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
