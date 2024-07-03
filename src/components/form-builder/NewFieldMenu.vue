<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Adicionar campo
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="openNewFieldDialog(item.type)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <NewFieldDialog ref="newFieldDialog" @field-saved="onFieldSaved" />
  </div>
</template>

<script>
import NewFieldDialog from './NewFieldDialog.vue';

export default {
  name: 'NewFieldMenu',
  components: {
    NewFieldDialog
  },
  data() {
    return {
      items: [
        { title: "Campo de texto", type: "text" },
        { title: "Numérico", type: "numeric" },
        { title: "Caixa de seleção", type: "selection" },
        { title: "Anexo", type: "file" },
        { title: "Data/hora", type: "datetime" },
        { title: "Cor", type: "color" },
        { title: "Valor monetário", type: "currency" },
      ],
    };
  },
  methods: {
    openNewFieldDialog(type) {
      this.$refs.newFieldDialog.open(type);
    },
    onFieldSaved(field) {
      this.$emit('field-selected', field);
    }
  }
};
</script>
