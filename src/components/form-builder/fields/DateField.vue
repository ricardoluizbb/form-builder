<template>
  <v-text-field :disabled="disabled" dense outlined type="date" :label="label"></v-text-field>
</template>

<script>
export default {
  name: 'DateField',
  props: {
    label: {
      type: String,
      default: "Data",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>