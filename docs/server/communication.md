# Communication

- ServerSocket
  - [**new** ServerSocket([port])](#ServerSocket)
  - [serverSocket.**send**(client, act, msg)](#serverSocket.send)
  - [serverSocket.**sendBroadcast**(act, msg)](#serverSocket.sendBroadcast)
  - [serverSocket.**on**(act, callback)](#serverSocket.on)


## ServerSocket

<br/>
<br/>

<a href="#ServerSocket" name="ServerSocket">#</a> **new** ServerSocket(\[port\])

Construtor de um servidor de WebSockets. Uma porta pode ser especificada para o servidor, caso contrário o padrão é `6661`.

Parâmetros:
- **integer** `port` - Porta que o servidor ficará disponível.

A seguir um exemplo de código criando um novo servidor e registrando um callback para receber mensagem com o propósito `"tools"`:

```javascript
//Instancia um novo servidor.
var ServerSocket = require("./communication/ServerSocket.js");
var serverSocket = new ServerSocket();

//o método registra a intenção de receber mensagens de clientes com o act="tools".
serverSocket.on("tools", function(socket, msg){
    console.log(msg);
});

```

<br>
<br>

<a href="#serverSocket.send" name="serverSocket.send">#</a> serverSocket.__send__(client, act, msg)

Envia uma mensagem `msg` para o cliente `client` especificado com um determinado propósito `act`. O cliente geralmente é recebido quando uma mensagem é recebida pelo mesmo. Quando quiser enviar uma mensagem para todos os clientes atualmente conectados use o método [serverSocket.sendBroadcast()](#serverSocket.sendBroadcast).

Parâmetros:
- **Socket** `client` - Cliente para o qual a mensagem será enviada.
- **string** `act` - Propósito da mensagem, será utilizado para direcionar a mensagem.
- **object** `msg` - Mensagem propriamente dita, pode ser uma string ou um objeto.

<br>
<br>

<a href="#serverSocket.sendBroadcast" name="serverSocket.sendBroadcast">#</a> serverSocket.__sendBroadcast__(act, msg)

Envia uma mensagem `msg` para todos os clientes atualmente conectados com um propósito `act`.

Parâmetros:
- **string** `act` - Propósito da mensagem, será utilizado para direcionar a mensagem.
- **string|object** `msg` - Mensagem propriamente dita, pode ser uma string ou um objeto.


<br>
<br>

<a href="#serverSocket.on" name="serverSocket.on">#</a> serverSocket.__on__(act, callback)

Registra uma função `callback` para um propósito `act`. Utilizado para receber mensagens dos clientes.

Parâmetros:
- **string** `act` - Propósito da mensagem, será utilizado para direcionar a mensagem.
- **function** `callback` - Função que será chamada quando uma mensagem com o propósito especificado for recebida. Os parâmetros enviados para a função são os seguintes:
  - **Socket** `client` - Cliente que enviou a mensagem. Pode ser utilizada para mandar uma resposta direta através da função [serverSocket.**send**(client, act, msg)](#serverSocket.send).
  - **object** `msg` - Mensagem enviada pelo cliente.

