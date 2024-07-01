<template>
  <v-select :disabled="disabled" dense :items="items" :label="label" outlined v-model="selectedValue"></v-select>
</template>

<script>
export default {
  name: 'SelectionField',
  props: {
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: this.options,
      selectedValue: this.value
    };
  },
  watch: {
    value(newValue) {
      this.selectedValue = newValue;
    },
    selectedValue(newValue) {
      this.$emit('input', newValue);
    }
  }
};
</script>
