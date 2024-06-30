<template>
  <v-file-input
    outlined
    dense
    chips
    multiple
    :label="label"
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
  },
};
</script>
