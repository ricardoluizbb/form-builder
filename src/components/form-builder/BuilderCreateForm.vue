<template>
  <div>
    <v-text-field
      dense
      autofocus
      v-model="newFormTitle"
      label="Título do formulário"
      outlined
      @keyup.enter="saveForm"
      hint="Pressione enter para atualizar o titulo"
    ></v-text-field>
  </div>
</template>

<script>
import { useFormStore } from "@/stores/formStore";

export default {
  name: "BuilderCreateForm",
  data() {
    return {
      builderFormStore: useFormStore(),
      newFormTitle: "",
    };
  },
  methods: {
    saveForm() {
      if (this.newFormTitle.trim() !== "") {
        this.builderFormStore.createNewForm(this.newFormTitle);
        this.$emit("form-saved");
      }
    },
  },
};
</script>