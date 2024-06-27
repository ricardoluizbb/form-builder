<template>
  <div>
    <v-btn @click="createNewForm" color="primary">Novo Formulário</v-btn>
    <v-list dense>
      <v-list-item
        v-for="(form, index) in forms"
        :key="index"
        @click="selectForm(form)"
        :class="{ 'active-form': form === selectedForm }"
      >
        <v-list-item-title>{{ form.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    forms: Array,
    selectedForm: Object,
  },
  methods: {
    selectForm(form) {
      this.$emit("form-selected", form);
    },
    createNewForm() {
      this.$emit("new-form");
    },
  },
};
</script>

<style scoped>
.active-form {
  background-color: #f0f0f0;
}
</style>
