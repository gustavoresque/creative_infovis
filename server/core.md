# Core

- Sqlite
  - [__new__ Sqlite(database_name)](#Sqlite)
  - [base.__tables__](#sqlite.tables)
  - [base.__meta__(table_name)](#sqlite.meta)
  - [base.__select__(table_name, args)](#sqlite.select)


## Sqlite

<br/>
<br/>

<a href="#Sqlite" name="Sqlite">#</a> **new** Sqlite(database_name)

Construtor de uma conexão com um banco de dados no SGBD Sqlite, cria um objeto que representa a base de dados com métodos para manipulação

Parâmetros:
- **string** `database_name` - Nome da base de dados que será conectada.

A seguir um exemplo de criação de uma conexão com a base 'my_database'

```javascript
//Instancia uma nova conexão.
var Sqlite = require("./databases/Sqlite.js");
var my_database = new Sqlite('my_database');
```

<br>
<br>

<a href="#base.tables" name="base.tables">#</a> base.__table__

Método getter para obter a lista de tabelas presentes na base de dados. O retorna uma **Promise** que faz uma requisição à base. Ao completar a requisição, a **Promise** resolve um array de objetos com o nome das tabelas e suas respectivas quantidades de colunas e entradas

A seguir um exemplo onde se obtém a lista de tabelas de presentes em 'my_database'

```javascript
//Atribui à promessa à uma variável table_list
var table_list = my_database.tables;
table_list.then( (list) => {
  //Quando a lista estiver pronta, pode-se realizar ações com ela
  console.log(list);
});
```

A saída ```list``` neste código é, por exemplo:
```JSON
[
  {
    "Nome": "tabela_A",
    "Colunas": 100,
    "Entradas": 1000
  },
  {
    "Nome": "tabela_B",
    "Colunas": 5,
    "Entradas": 90
  },
  {
    "Nome": "tabela_C",
    "Colunas": 25,
    "Entradas": 130
  }
]
```
<br>
<br>

<a href="#base.meta" name="base.meta">#</a> base.__meta__(table_name)

Método para obtenção dos metadados, ou seja, informações gerais sobre as colunas de uma dada tabela. O método retorna uma **Promise** que requisita os metadados à conexão. Quando a requisição se completa, a **Promise** resolve em um objeto contendo os metadados da tabela

Parâmetros:
- **string** `table_name` - Nome da tabela a qual serão obtido os metadados

Os metadados gerados são:
- ```Name```- Nome da coluna
- ```Type```- Tipo de dado na coluna (VARCHAR, INT, etc.)
- ```Minimum```- Valor numérico mínimo entre os valores da coluna.
- ```Maximum```- Valor numérico máximo entre os valores da coluna.
- ```Mean```- A média dos valores numéricos presentes entre os valores da coluna.
- ```Std```-  O desvio padrão dos valores numéricos presentes entre os valores da coluna.
- ```Distribution```- O tipo de distribuição dos dados na coluna, podendo ser-
  - ```CONTINUOUS``` se a coluna possuir valores contínuos
  - ```DISCRETE``` se a coluna possuir valores discretos com mais de 20 valores únicos
  - ```CATEGORICAL(X)``` se a coluna possuir valores discretos com menos de 20 valores únicos, onde o ```X``` indica número de valores únicos;
  - ```ALL NULL```- a coluna não possui nenhum valor

Nos metadados que envolvem comparações entre números, apenas valores numéricos são considerados, incluindo strings puramente numéricas. Se não houver valores numéricos na coluna, atribui-se ```NaN``` ao metadado.

A seguir um exemplo onde se obtém os metadados da tabela 'Tabela_A' da base 'my_database'

```javascript
// Atribui a promessa à uma variável metadados
var table_name = 'Tabela_A';
var metadados = my_database.meta(table_name);
metadados.then( (metadata) => {
  // Quando os metadados estiverem prontos, pode-se realizar ações com ele
  console.log(metadata);
});
```
A saída ```metadata``` neste código é, por exemplo:
```JSON
[
  {
  "Name": "Coluna_1",
    "Type": "INT",
    "Minimum": 1,
    "Maximum": 5,
    "Mean": 2.5,
    "Std": 1,
    "Distribution": "CATEGORICAL(5)"
  },
  {
    "Name": "Coluna_2",
    "Type": "VARCHAR(50)",
    "Minimum": "NaN",
    "Maximum": "NaN",
    "Mean": "NaN",
    "Std": "NaN",
    "Distribution": "CONTINUOUS"
  },
  {
    "Name": "Coluna_3",
    "Type": "DECIMAL(3,1)",
    "Minimum": 16.1,
    "Maximum": 40.7,
    "Mean": 28.13,
    "Std": 6.94,
    "Distribution": "CONTINUOUS"
  },
]
```

<br>
<br>

<a href="#base.select" name="base.select">#</a> base.__select__(table_name, args)

Realiza uma seleção em uma dada tabela, de acordo com o argumentos escolhidos. O método retorna uma **Promise** que resolve no objeto contendo as entradas selecionadas.

Parâmetros:
- **string** `table_name` - Nome da tabela onde será feita a seleção
- **object** `args` - Objeto que contém as especificações da seleção. As propriedades deste objeto são
  - **array** `columns` - Array de strings que contém as colunas que serão selecionadas.
  - **objects** - `filters` - Array de objetos que contém regras para a seleção. A seleção será formada pelas entradas que passarem nas regras de seleção. As propriedades do objeto são:
    - **string** `attribute` - o atributo à ser testado na seleção
    - **string** `operator` - o operador da regra (ex.: = ,  > , <)
    - **string | number** `value` - o valor que será testado na regra.
  - **objects** `order` - Array de objetos que contém as regras para a ordenação. A prioridade da ordenação é escolhida pela posição do objeto no array. O resultado será ordenado de acordo com as propriedades dos objetos:
    - **string** `column` - O nome da coluna que será ordenada.
    - **string** `mode`- O modo como a ordenação será feita, pode ser `'ASC'` para ordenar de forma ascendente e `'DESC'` para descendente.



A seguir um exemplo de uma seleção na 'Tabela_A'
```javascript
var table_name = 'Tabela_A';
// Detalhes da seleção
var args = {
  // Colunas selecionadas
  columns: ['Coluna_1', 'Coluna_3'],
  filters: [
  {// Regra de seleção 1
    "attribute": "Coluna_1",
    "operator": "=",
    "value": 3
  },
  {// Regra de seleção 2
    "attribute": "Coluna_3",
    "operator": "<",
    "value": 35.6
  }]
  order: [
    {// Regra de ordenação 1
    "column": "Coluna_3",
    "mode": "DESC"
  }];
}
// Atribui a Promise à variavel selecao
var selecao = my_database.select(table_name, args)
selecao.then( (resultado) => {
  //Quando a seleção estiver pronta, pode-se realizar coisas com ela
  console.log(resultado);
});
```

O ```resultado``` dessa seleção é, por exemplo:

```JSON
[
  {
    "Coluna_1": 3,
    "Coluna_3": 30.2
  },
  {
    "Coluna_1": 3,
    "Coluna_3": 28.5
  },
  {
    "Coluna_1": 3,
    "Coluna_3": 24.7
  }
]
```
