<template>
    <v-text-field dense outlined type="time" :label="label"></v-text-field>
  </template>
  
  <script>
  export default {
    name: 'TimeField',
    props: {
    label: {
      type: String,
      default: "Horas",
    },
  },
  }
  </script>