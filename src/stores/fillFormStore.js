import { defineStore } from "pinia";
import { useFormStore } from "./formStore";

const LOCAL_STORAGE_KEY = "fillFormsData";

export const useFillFormStore = defineStore({
  id: "fillFormStore",
  state: () => ({
    formStore: useFormStore(),
    selectedForm: null,
    fillFormsList: [],
  }),
  getters: {
    getForms() {
      this.formStore.loadForms();
      return this.formStore.forms;
    },
  },
  actions: {
    loadFillFormsList() {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) {
        this.fillFormsList = JSON.parse(storedData);
      } else {
        this.fillFormsList = [];
      }
    },
    addFormToFillList(form) {
      this.fillFormsList.push(form);
      this.saveFillFormsList();
    },
    saveFillFormsList() {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.fillFormsList));
    },
    selectForm(form) {
      this.selectedForm = form;
    },
    deleteForm(form) {
      this.fillFormsList = this.fillFormsList.filter(f => f !== form);
      this.saveFillFormsList();
      if (this.selectedForm === form) {
        this.selectedForm = null;
      }
    },
    clearSelectedForm() {
      this.selectedForm = null;
    }
  },
});
