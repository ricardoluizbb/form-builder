<template>
  <v-select dense :items="items" label="Outlined style" outlined></v-select>
</template>

<script>
export default {
  data: () => ({
    items: ["Foo", "Bar", "Fizz", "Buzz"],
  }),
};
</script>
