<template>
  <v-file-input
    outlined
    dense
    chips
    multiple
    :label="label"
    :disabled="disabled"
  ></v-file-input>
</template>
<script>
export default {
  name: "FileField",
  props: {
    label: {
      type: String,
      default: "Anexo",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
