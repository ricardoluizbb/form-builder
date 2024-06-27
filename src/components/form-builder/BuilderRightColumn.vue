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
export default {
  props: {
    selectedForm: Object, 
  },
};
</script>
