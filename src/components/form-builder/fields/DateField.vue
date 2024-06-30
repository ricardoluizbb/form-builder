<template>
  <v-text-field dense outlined type="date" :label="label"></v-text-field>
</template>

<script>
export default {
  name: 'DateField',
  props: {
    label: {
      type: String,
      default: "Data",
    },
  },
}
</script>