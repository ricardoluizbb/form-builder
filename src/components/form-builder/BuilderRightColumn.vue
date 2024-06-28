<template>
  <div>
    <div v-if="selectedForm">
      <h3>{{ selectedForm.title }}</h3>
      <div v-for="(field, index) in selectedForm.fields" :key="index">
        <label :for="'field-' + index">{{ field.label }}</label>
        <input
          :type="field.type"
          :id="'field-' + index"
          v-model="field.value"
        />
      </div>
      <v-btn dense color="primary">Adicionar campo</v-btn>
    </div>
    <div v-else>
      <p>Selecione um formulário para visualizar aqui.</p>
    </div>
  </div>
</template>

<script>
import { useFormStore } from '@/stores/formStore';

export default {
  name: 'BuilderRightColumn',
  computed: {
    formStore() {
      return useFormStore();
    },
    selectedForm() {
      return this.formStore.selectedForm;
    },
  },
};
</script>
