<template>
  <v-text-field
    :disabled="disabled"
    dense
    outlined
    type="time"
    :label="label"
    id="time-field"
  ></v-text-field>
</template>

<script>
export default {
  name: "TimeField",
  props: {
    label: {
      type: String,
      default: "Horas",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
