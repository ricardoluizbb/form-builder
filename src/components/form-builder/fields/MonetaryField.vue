<template>
  <v-text-field
    id="monetary-field"
    outlined
    dense
    :label="label"
    v-model="value"
    v-mask="'#,##'"
    prefix="R$"
    :disabled="disabled"
  ></v-text-field>
</template>

<script>
import { VueMaskDirective } from 'v-mask'

export default {
  name: "MonetaryField",
  directives: {
    mask: VueMaskDirective
  },
  props: {
    label: {
      type: String,
      default: "Campo monetário",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: '0,00',
    }
  }
}
</script>
