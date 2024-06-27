<template>
    <v-checkbox
      v-model="selected"
      label="checkbox"
      value="checkbox"
      dense
    ></v-checkbox>
</template>
<script>
  export default {
    data () {
      return {
        selected: ['checkbox'],
      }
    },
  }
</script>