<template>
  <v-dialog persistent dense v-model="dialog" height="300px" width="400px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ dialogTitle }}</span>
      </v-card-title>
      <v-card-text>
        <span class="text-subtitle-1 text-justify">{{ dialogDescription }}</span>
      </v-card-text>
      <v-card-text>
        <v-text-field dense outlined label="label"></v-text-field>
      </v-card-text>
      <v-card-text>
        <template v-if="selectedFieldType">
          <div v-if="selectedFieldType === 'text'">
            <v-radio-group v-model="selectedOption">
              <v-radio
                v-for="option in textFieldOptions"
                :key="option"
                :label="option"
                :value="option"
              ></v-radio>
            </v-radio-group>
          </div>
          <div v-if="selectedFieldType === 'selection'">
            <v-radio-group v-model="selectedOption">
              <v-radio
                v-for="option in selectionFieldOptions"
                :key="option"
                :label="option"
                :value="option"
              ></v-radio>
            </v-radio-group>
          </div>
          <div v-if="selectedFieldType === 'datetime'">
            <v-radio-group v-model="selectedOption">
              <v-radio
                v-for="option in datetimeFieldOptions"
                :key="option"
                :label="option"
                :value="option"
              ></v-radio>
            </v-radio-group>
          </div>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="primary" @click="saveField">Salvar</v-btn>
        <v-btn text color="negative" @click="closeDialog">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NewFieldDialog",
  data() {
    return {
      dialog: false,
      dialogTitle: "",
      dialogDescription: "",
      selectedFieldType: "",
      selectedOption: "",
      textFieldOptions: ["Texto curto", "Parágrafo"],
      selectionFieldOptions: ["Escolha única", "Múltipla escolha"],
      datetimeFieldOptions: ["Apenas data", "Apenas hora", "Data e hora"],
    };
  },
  methods: {
    open(type) {
      this.dialog = true;
      this.selectedOption = "";
      switch (type) {
        case "text":
          this.dialogTitle = "Campo de Texto";
          this.dialogDescription = "Um campo que o usuário pode digitar qualquer mensagem que desejar. Especifique o tipo do campo que deseja incluir:"
          this.selectedFieldType = "text";
          break;
        case "numeric":
          this.dialogTitle = "Campo Numérico";
          this.dialogDescription = "Um campo que o usuário pode digitar apenas números."
          this.selectedFieldType = "numeric";
          break;
        case "selection":
          this.dialogTitle = "Campo Caixa de Seleção";
          this.dialogDescription = "Um campo que o usuário pode selecionar uma ou mais respostas. Escolha qual tipo de campo deseja incluir:"
          this.selectedFieldType = "selection";
          break;
        case "datetime":
          this.dialogTitle = "Campo Data/Hora";
          this.dialogDescription = "Um campo que o usuário pode selecionar data, hora ou data e hora. Escolha qual tipo de campo deseja incluir:"
          this.selectedFieldType = "datetime";
          break;
        case "color":
          this.dialogTitle = "Campo Escolher Cor";
          this.dialogDescription = "Um campo que o usuário pode selecionar uma cor."
          this.selectedFieldType = "color";
          break;
        case "currency":
          this.dialogTitle = "Campo Valor Monetário";
          this.dialogDescription = "Um campo que o usuário pode digitar um valor monetário"
          this.selectedFieldType = "currency";
          break;
        case "file":
          this.dialogTitle = "Campo de Arquivo";
          this.dialogDescription = "Um campo que o usuário pode adicionar um arquivo."
          this.selectedFieldType = "file";
          break;
        default:
          this.selectedFieldType = null;
      }
    },
    closeDialog() {
      this.dialog = false;
      this.selectedFieldType = null;
    },
    saveField() {
      this.$emit('field-saved', {
        type: this.selectedFieldType,
        option: this.selectedOption
      });
      this.closeDialog();
    },
  },
};
</script>
