<template>
  <v-select
    :items="items"
    v-model="selected"
    :label="labelText"
    :multiple="isMultiple"
    outlined
    dense
  ></v-select>
</template>

<script>
export default {
  props: {
    isMultiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      selected: this.isMultiple ? [] : null
    };
  },
  computed: {
    labelText() {
      return this.isMultiple ? 'Select multiple items' : 'Select an item';
    }
  }
};
</script>
