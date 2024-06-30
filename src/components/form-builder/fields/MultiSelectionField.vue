<template>
  <v-select
    outlined
    dense
    v-model="selectedValues"
    :items="items"
    attach
    chips
    label="Seleção Múltipla"
    multiple
  ></v-select>
</template>

<script>
export default {
  name: 'MultiSelectionField',
  props: {
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      items: this.options,
      selectedValues: this.value
    };
  },
  watch: {
    value(newValue) {
      this.selectedValues = newValue;
    },
    selectedValues(newValue) {
      this.$emit('input', newValue);
    }
  },
};
</script>
