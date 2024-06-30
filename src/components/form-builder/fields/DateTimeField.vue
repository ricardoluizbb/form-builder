<template>
  <v-text-field dense outlined type="datetime-local" :label="label"></v-text-field>
</template>

<script>
export default {
  name: 'DateTimeField',
  props: {
    label: {
      type: String,
      default: "Data e hora",
    },
  },
}
</script>
