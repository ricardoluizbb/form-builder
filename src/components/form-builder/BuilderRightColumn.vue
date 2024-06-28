<template>
  <div>
    <div v-if="selectedForm">
      <h3>{{ selectedForm.name }}</h3>
      <p>Descrição: {{ selectedForm.description }}</p>
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
