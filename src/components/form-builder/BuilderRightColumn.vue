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
      <FieldsMenu @field-selected="addField" />
    </div>
    <div v-else>
      <p>Selecione um formulário para visualizar aqui.</p>
    </div>

    <NewFieldDialog ref="newFieldDialog" />
  </div>
</template>

<script>
import FieldsMenu from '@/components/form-builder/FieldsMenu.vue';
import NewFieldDialog from '@/components/form-builder/NewFieldDialog.vue';
import { useFormStore } from '@/stores/formStore';

export default {
  name: 'BuilderRightColumn',
  components: {
    FieldsMenu,
    NewFieldDialog,
  },
  data() {
    return {
      formStore: useFormStore(),
    };
  },
  computed: {
    selectedForm() {
      return this.formStore.selectedForm;
    },
  },
  methods: {
    addField(field) {
      if (this.selectedForm) {
        this.selectedForm.fields.push({
          label: field.title,
          type: field.type,
          value: '',
        });
        this.formStore.saveForms();
      }
    },
  },
};
</script>

<style scoped>
.active-form {
  background-color: #f0f0f0;
}
</style>
