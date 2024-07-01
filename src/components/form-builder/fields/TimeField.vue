<template>
  <v-text-field
    :disabled="disabled"
    dense
    outlined
    type="time"
    :label="label"
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
