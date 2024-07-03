<template>
  <v-textarea
    outlined
    dense
    :maxlength="500"
    counter="500"
    :label="label"
    :value="value"
    @input="$emit('update:value', $event)"
    :disabled="disabled"
    id="textarea-field"
  />
</template>

<script>
export default {
  name: "TextareaField",
  props: {
    label: {
      type: String,
      default: "Parágrafo",
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
