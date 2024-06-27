<template>
  <v-select
    :items="items"
    label="Outlined style"
    outlined
    dense
  ></v-select>
</template>

<script>
  export default {
    data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }),
  }
</script>