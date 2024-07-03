<template>
  <div class="text-center">
    <v-btn id="new-form-btn" width="100%" color="primary" outlined @click="dialog = true">
      Novo formulário
    </v-btn>

    <v-list dense>
      <v-list-item
        v-for="(form, index) in fillFormsList"
        :key="index"
        @click="selectForm(form)"
        :class="{ 'active-form': form === selectedForm }"
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
    };
  },
  components: {
    NewFormDialog,
  },
  computed: {
    fillFormsList() {
      return this.fillFormStore.fillFormsList;
    },
    selectedForm() {
      return this.fillFormStore.selectedForm;
    },
  },
  methods: {
    selectForm(form) {
      this.fillFormStore.selectForm(form);
      this.$root.$emit('form-selected', form);
    },
  },
  created() {
    this.fillFormStore.loadFillFormsList();
  },
  setup() {
    const fillFormStore = useFillFormStore();
    return { fillFormStore };
  },
};
</script>
