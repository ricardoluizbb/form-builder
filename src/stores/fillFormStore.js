import { defineStore } from "pinia";
import { useFormStore } from "./formStore";

export const useFillFormStore = defineStore({
  id: "fillFormStore",
  state: () => ({
    formStore: useFormStore(),
  }),
  getters: {
    getForms() {
      return this.formStore.forms;
    },
  },
});
