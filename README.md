# Pré-requisitos

O único pré-requisito para rodar o projeto é ter o Node.js instalado no computador. Portanto, assegure que ele esteja devidamente instalado.

# Como Rodar o projeto

Após clonar o projeto, navegue até a pasta que ele se encontra e siga os dois passos abaixo:

## Instalação de dependências
```
npm install
```

## Executando o projeto
```
npm run serve
```

# Decisões de arquitetura e design

## Estrutura de pastas

A estrutura de pastas foi feita dessa forma para que ficasse clara a separação de responsabilidades, facilitando a manutenção do código e o tornasse mais escalável.

## Componentização

O projeto foi separado em três tipos de componentes, sendo eles:

  - form-builder: responsável pela parte de criação do formulário.
  - fill-form: responsável pelo preenchimento do formulário escolhido
  - fields: todos os campos que o formulário pode conter.
  - shared: componentes utilizados ou aparecem em diversos lugares diferentes do projeto.

Dessa maneira, fica mais simples de implementar novas funcionalidades ou alterar qualquer regra de negócio de cada um dos campos.

## Vuetify

O Vuetify foi escolhido por possuir uma vasta biblioteca de UI customizáveis. 
Importante destacar que a aplicação também é funcional no modo mobile.

## Testes

O projeto possui testes unitários que asseguram que os componentes estão funcionando conforme o esperado.
