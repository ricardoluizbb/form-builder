<template>
    <v-text-field dense outlined type="text" label="Texto curto" :rules="rules"></v-text-field>
  </template>

<script>
  export default {
    name: 'TextField',
    data: () => ({
      rules: [
        value => (value || '').length <= 20 || 'Max 20 characters',
      ],
    }),
  }
</script>