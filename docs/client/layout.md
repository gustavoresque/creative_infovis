# Layout

- [PartitionLayout](#partitionlayout)
  - [**new** PartitionLayout([root])](#PartitionLayout)
  - [partition.**addNode**(node)](#partition.addNode)
  - [partition.**removeNode**(node)](#partition.removeNode)
  - [partition.**onselectednode**](#partition.onselectednode)
  - [partition.**onnodecreated**](#partition.onnodecreated)
  - [partition.**onnoderesized**](#partition.onnoderesized)
  - [partition.**onnoderemoved**](#partition.onnoderemoved)


## PartitionLayout

<br/>
<br/>

<a href="#PartitionLayout" name="PartitionLayout">#</a> **new** PartitionLayout([root])

Construtor de um novo layout de partição. Pode ser especificado um nó HMTL para ser a raiz do layout ou pode ser declarado um `class="partition-root"` diretamente em um nó da página HTML. 

Parâmetros:
- **NodeElement** `root` - Elemento HTML que será utilizado como nó raiz para o novo layout.

A seguir os dois exemplos de código criando o layout de partição das duas formas possíveis.

Forma 1:
```javascript
//main.js
$(document).ready(function(){
    var rootnode = document.getElementById("root");
    var partition = new PartitionLayout(rootnode);
});


```


```html
<!-- main.html -->
<html>
    <head>
        <title>Title</title>
        <script src="libs/jquery-3.2.1.min.js"></script>
        <script src="layout/partition_layout.js"></script>
        <script src="main.js"></script>
        
        <link rel="stylesheet" href="layout/partition_layout.css">
        <!-- É importante que o root tenha tamanho -->
        <style>
            #main-area, #main-menu{
                position: absolute;
                left: 0px;
                right: 0px;
            }
            #main-menu{
                height: 35px;
                top: 0px;
                border-bottom: 1px solid gray;
            }
            #main-area{
                bottom: 0px;
                top: 36px;
            }
        </style>
    </head>
    <body>
        <div id="main-menu">Menu</div>
        <div id="main-area">
            <div id="root"></div>
        </div>
        
    </body>
</html>

```



Forma 2:
```javascript
//main.js
$(document).ready(function(){
     let partition = new PartitionLayout();
     partition.onselectednode = function(a,b){
         console.log(a,b);
     };
});

```


```html
<!-- main.html -->
<html>
    <head>
        <title>Title</title>
        <script src="libs/jquery-3.2.1.min.js"></script>
        <script src="layout/partition_layout.js"></script>
        <script src="main.js"></script>
        
        <link rel="stylesheet" href="layout/partition_layout.css">
        <style>
            #main-area, #main-menu{
                position: absolute;
                left: 0px;
                right: 0px;
            }
            #main-menu{
                height: 35px;
                top: 0px;
                border-bottom: 1px solid gray;
            }
            #main-area{
                bottom: 0px;
                top: 36px;
            }
        </style>
    </head>
    <body>
        <div id="main-menu">Menu</div>
        <div id="main-area">
            <div class="partition-root"></div>
        </div>
        
    </body>
</html>

```



<br>
<br>

<a href="#partition.addNode" name="partition.addNode">#</a> partition.__addNode__(node) ![code|notworking](https://img.shields.io/badge/code-notworking-red.svg)



Adiciona um node via javascript na tela do usuário.

Parâmetros:
- **object** `node` - um novo objeto de node a ser adicionado na hierarquia de partição.


<br>
<br>

<a href="#partition.removeNode" name="partition.removeNode">#</a> partition.__removeNode__(node) ![code|notworking](https://img.shields.io/badge/code-notworking-red.svg)

![code|notworking](https://img.shields.io/badge/code-notworking-red.svg)

Remove um node da hierarquia via javascript.

Parâmetros:
- **object** `node` - um nó pertencente a hierarquia de partição que será removido.



<br>
<br>

<a href="#partition.onselectednode" name="partition.onselectednode">#</a> partition.__onselectednode__

O objeto chama essa função toda vez que o usuário seleciona um nó diferente.

Tipo:
- **function**

Parâmetros:
- **object** `node` - Nó selecionado.
- **object** `html_node` - DOM html associado ao nó selecionado.

Exemplo:
```javascript

partition.onselectednode = (node, html_node) => {
    //Essa função será executada toda vez que um nó diferente for selecionado pelo usuário.
    console.log(node);
}
```


<br>
<br>

<a href="#partition.onnodecreated" name="partition.onnodecreated">#</a> partition.__onnodecreated__

O objeto chama essa função toda vez que um novo nó é criado.

Tipo:
- **function**

Parâmetros:
- **object** `node` - Nó criado.
- **object** `html_node` - DOM html associado ao nó criado.

Exemplo:
```javascript

partition.onnodecreated = (node, html_node) => {
    //Essa função será executada toda vez que um nó for criado.
    console.log(node);
}
```

  
  
  
<br>
<br>

<a href="#partition.onnoderesized" name="partition.onnoderesized">#</a> partition.__onnoderesized__

O objeto chama essa função toda vez que um novo é redimensionado pelo usuário. Pode ser utilizado para atualizar o tamanho do conteúdo interno caso esse não se atualize automaticamente.

Tipo:
- **function**

Parâmetros:
- **object** `node` - Nó redimensionado.
- **object** `html_node` - DOM html associado ao nó redimensionado.

Exemplo:
```javascript

partition.onnoderesized = (node, html_node) => {
    //Essa função será executada toda vez que um nó for redimensionado pelo usuário.
    console.log(node);
}
```
  
  
  
<br>
<br>

<a href="#partition.onnoderemoved" name="partition.onnoderemoved">#</a> partition.__onnoderemoved__

O objeto chama essa função toda vez que um nó é removido da hierarquia.

Tipo:
- **function**

Parâmetros:
- **object** `node` - Nó removido.
- **object** `html_node` - DOM html associado ao nó removido.

Exemplo:
```javascript

partition.onnoderemoved = (node, html_node) => {
    //Essa função será executada toda vez que um nó for removido.
    console.log(node);
}
```

