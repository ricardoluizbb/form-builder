<template>
  <v-container fluid>
    <v-row>
      <!-- Left Column for Larger Screens -->
      <v-col cols="12" md="2" class="hidden-sm-and-down">
        <FillLeftColumn />
      </v-col>

      <!-- Divider for Larger Screens -->
      <v-col cols="12" md="1" class="fill-height hidden-sm-and-down">
        <v-divider vertical></v-divider>
      </v-col>

      <!-- Right Column for Larger Screens -->
      <v-col cols="12" md="9" class="hidden-sm-and-down">
        <FillRightColumn />
      </v-col>

      <!-- List of Forms for Small Screens -->
      <v-col cols="12" class="hidden-md-and-up">
        <template v-if="!selectedForm">
          <FillLeftColumn @form-selected="selectForm" />
        </template>
        <template v-else>
          <v-btn icon @click="clearSelectedForm">
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
  components: {
    FillLeftColumn,
    FillRightColumn,
  },
  computed: {
    selectedForm() {
      return this.fillFormStore.selectedForm;
    },
  },
  methods: {
    selectForm(form) {
      this.fillFormStore.selectForm(form);
    },
    clearSelectedForm() {
      this.fillFormStore.clearSelectedForm();
    },
  },
  setup() {
    const fillFormStore = useFillFormStore();
    return { fillFormStore };
  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
