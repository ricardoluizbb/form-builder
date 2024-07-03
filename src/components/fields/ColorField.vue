<template>
  <v-color-picker
    class="mb-4"
    id="color-field"
    :disabled="disabled"
    hide-inputs
    show-swatches
  ></v-color-picker>
</template>

<script>
export default {
  name: "ColorField",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
