<template>
  <v-select
    id="multi-selection"
    outlined
    dense
    v-model="selectedValues"
    :items="items"
    attach
    chips
    :label="label"
    multiple
    :disabled="disabled"
  ></v-select>
</template>

<script>
export default {
  name: 'MultiSelectionField',
  props: {
    label: {
      type: String,
      default: "Múltipla escolha",
    },
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false,
    },
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
    },
    options(newOptions) {
      this.items = newOptions;
    }
  },
};
</script>
