<template>
  <v-menu offset-y ref="menu">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on" @click="openMenu">
        Adicionar campo
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        @click="selectField(item)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Resposta curta", type: "text" }, // parágrafo ou resposta curta
      { title: "Numérico", type: "text" },
      { title: "Caixa de seleção", type: "text" }, // permitir multipla escolha ou não
      { title: "Anexo", type: "text" },
      { title: "Data/hora", type: "text" }, // somente data, somente hora ou data e hora
      { title: "Cor", type: "text" },
      { title: "Valor monetário", type: "text" },
    ],
  }),
  methods: {
    openMenu() {
      this.$refs.menu.saveActivator();
      this.$refs.menu.isActive = true;
    },
    selectField(field) {
      this.$emit("field-selected", field);
      this.$refs.menu.isActive = false;
    },
  },
};
</script>
