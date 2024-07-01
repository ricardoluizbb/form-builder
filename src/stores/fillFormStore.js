import { defineStore } from "pinia";
import { useFormStore } from "./formStore";

export const useFillFormStore = defineStore({
  id: "fillFormStore",
  state: () => ({
    formStore: useFormStore(),
  }),
  getters: {
    getForms() {
      this.formStore.loadForms()
      return this.formStore.forms;
    },
  },
});
