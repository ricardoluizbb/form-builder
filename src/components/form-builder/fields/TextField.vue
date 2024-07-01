<template>
  <v-text-field
    dense
    outlined
    :maxlength="100"
    counter="100"
    :type="fieldType"
    :label="label"
    :value="value"
    @input="$emit('update:value', $event)"
    :disabled="disabled"
  ></v-text-field>
</template>

<script>
export default {
  name: "TextField",
  props: {
    label: {
      type: String,
      default: "Texto",
    },
    fieldType: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
