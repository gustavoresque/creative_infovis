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
var rootnode = document.getElementById("root");
var partition = new PartitionLayout(rootnode);

```


```html
<!-- main.html -->
<html>
    <head>
        <title>Title</title>
        <script src="libs/jquery-3.2.1.min.js"></script>
        <script src="layout/partition_layout.js"></script>
        
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

<a href="#partition.addNode" name="partition.addNode">#</a> partition.__addNode__(node)

Status do socket.

Tipo:
- **object**

Atributos:
- **boolean** `appSocket.status.open` - indica se o socket está aberto `true` ou fechado `false`.


<br>
<br>

<a href="#partition.removeNode" name="partition.removeNode">#</a> partition.__removeNode__(node)

Envia uma mensagem `msg` para o servidor com um determinado propósito `act`.

Parâmetros:
- **string** `act` - Propósito da mensagem, será utilizado para direcionar a mensagem.
- **object** `msg` - Mensagem propriamente dita, pode ser uma string ou um objeto.



<br>
<br>

<a href="#partition.onselectednode" name="partition.onselectednode">#</a> partition.__onselectednode__

Registra uma função `callback` para receber mensagens com um propósito `act`. Utilizado para receber mensagens do servidor.

Parâmetros:
- **string** `act` - Propósito da mensagem, será utilizado para direcionar a mensagem.
- **function** `callback` - Função que será chamada quando uma mensagem com o propósito especificado for recebida. O parâmetro enviado para a função é o seguinte:
  - **object** `msg` - Mensagem enviada pelo servidor.




<br>
<br>

<a href="#partition.onnodecreated" name="partition.onnodecreated">#</a> partition.__onnodecreated__

Registra uma função `callback` para receber mensagens com um propósito `act`. Utilizado para receber mensagens do servidor.

Parâmetros:
- **string** `act` - Propósito da mensagem, será utilizado para direcionar a mensagem.
- **function** `callback` - Função que será chamada quando uma mensagem com o propósito especificado for recebida. O parâmetro enviado para a função é o seguinte:
  - **object** `msg` - Mensagem enviada pelo servidor.
  
  
  
<br>
<br>

<a href="#partition.onnoderesized" name="partition.onnoderesized">#</a> partition.__onnoderesized__

Registra uma função `callback` para receber mensagens com um propósito `act`. Utilizado para receber mensagens do servidor.

Parâmetros:
- **string** `act` - Propósito da mensagem, será utilizado para direcionar a mensagem.
- **function** `callback` - Função que será chamada quando uma mensagem com o propósito especificado for recebida. O parâmetro enviado para a função é o seguinte:
  - **object** `msg` - Mensagem enviada pelo servidor.
  
  
  
<br>
<br>

<a href="#partition.onnoderemoved" name="partition.onnoderemoved">#</a> partition.__onnoderemoved__

Registra uma função `callback` para receber mensagens com um propósito `act`. Utilizado para receber mensagens do servidor.

Parâmetros:
- **string** `act` - Propósito da mensagem, será utilizado para direcionar a mensagem.
- **function** `callback` - Função que será chamada quando uma mensagem com o propósito especificado for recebida. O parâmetro enviado para a função é o seguinte:
  - **object** `msg` - Mensagem enviada pelo servidor.

