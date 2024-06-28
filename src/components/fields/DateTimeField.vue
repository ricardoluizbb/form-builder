<template>
  <v-text-field
    dense
    outlined
    :type="computedType"
    :label="labelText"
  ></v-text-field>
</template>

<script>
export default {
  name: 'DateField',
  props: {
    type: {
      type: String,
      default: 'date',
      validator: value => ['date', 'time', 'datetime-local'].includes(value),
    },
  },
  computed: {
    computedType() {
      return this.type === 'datetime-local' ? 'datetime-local' : this.type;
    },
    labelText() {
      return this.type === 'time' ? 'Hora' : 'Data';
    }
  }
};
</script>
