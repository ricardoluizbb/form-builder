<template>
  <v-select
    outlined
    dense
    v-model="value"
    :items="items"
    attach
    chips
    label="Chips"
    multiple
  ></v-select>
</template>
<script>
  export default {
    data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz'],
      value: ['foo', 'bar', 'fizz', 'buzz'],
    }),
  }
</script>
