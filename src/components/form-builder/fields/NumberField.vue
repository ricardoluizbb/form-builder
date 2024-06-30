<template>
  <v-text-field 
    dense 
    outlined 
    type="number" 
    :label="label" 
    :value="value" 
    @input="onInput"
  ></v-text-field>
</template>

<script>
export default {
  name: 'NumberField',
  props: {
    label: {
      type: String,
      default: "Numérico",
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    onInput(event) {
      const value = parseFloat(event.target.value);
      this.$emit('update:value', isNaN(value) ? 0 : value);
    }
  }
};
</script>
