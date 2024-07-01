<template>
  <v-text-field
    outlined
    dense
    :label="label"
    value="0,00"
    prefix="R$"
    :disabled="disabled"
  ></v-text-field>
</template>
<script>
export default {
  name: "TimeField",
  props: {
    label: {
      type: String,
      default: "Campo monetário",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
