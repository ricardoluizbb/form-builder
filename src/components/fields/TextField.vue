<template>
  <div>
    <v-text-field
      v-if="type === 'text'"
      dense
      outlined
      type="text"
      label="Texto curto"
      :rules="rules"
      :value="internalValue"
      @input="updateInternalValue($event)"
    ></v-text-field>
    <v-textarea
      v-else-if="type === 'textarea'"
      dense
      outlined
      label="Parágrafo"
      :rules="rules"
      :value="internalValue"
      @input="updateInternalValue($event)"
    ></v-textarea>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    type: {
      type: String,
      default: 'text',
      validator: value => ['text', 'textarea'].includes(value),
    },
    value: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      rules: [
        value => (value || '').length <= 20 || 'Max 20 characters',
      ],
      internalValue: this.value, // Utiliza uma variável interna para armazenar o valor
    };
  },
  watch: {
    value(newValue) {
      this.internalValue = newValue;
    }
  },
  methods: {
    updateInternalValue(newValue) {
      this.internalValue = newValue;
      this.$emit('input', newValue);
    }
  }
};
</script>
