<template>
  <div class="text-center">
    <v-btn id="new-form-btn" width="100%" color="primary" outlined @click="dialog = true">
      Novo formulário
    </v-btn>

    <v-list dense>
      <v-list-item
        v-for="(form, index) in fillFormStore.fillFormsList"
        :key="index"
        @click="selectForm(form)"
        :class="{ 'active-form': form === fillFormStore.selectedForm }"
      >
        <v-list-item-title>{{ form.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <NewFormDialog :dialog="dialog" @close-dialog="dialog = false" />
  </div>
</template>

<script>
import NewFormDialog from "./NewFormDialog.vue";
import { useFillFormStore } from "@/stores/fillFormStore";

export default {
  name: "FillLeftColumn",
  data() {
    return {
      dialog: false,
      fillFormStore: useFillFormStore()
    };
  },
  components: {
    NewFormDialog,
  },
  methods: {
    selectForm(form) {
      this.fillFormStore.selectForm(form);
    },
  },
  created() {
    this.fillFormStore.loadFillFormsList();
  },
};
</script>
