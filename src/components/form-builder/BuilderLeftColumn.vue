<template>
  <div>
    <v-btn width="100%" outlined @click="$emit('new-form')" color="primary">Novo Formulário</v-btn>
    <v-list dense>
      <v-list-item
        v-for="(form, index) in forms"
        :key="index"
        @click="selectForm(form)"
        :class="{ 'active-form': form === selectedForm }"
      >
        <v-list-item-title>{{ form.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { useFormStore } from '@/stores/formStore';

export default {
  name: 'BuilderLeftColumn',
  props: {
    forms: Array,
    selectedForm: Object,
  },
  computed: {
    formStore() {
      return useFormStore();
    },
  },
  methods: {
    selectForm(form) {
      this.formStore.selectForm(form);
      this.$emit('form-selected', form);
    },
  },
};
</script>

<style scoped>
.active-form {
  background-color: #f0f0f0;
}
</style>
