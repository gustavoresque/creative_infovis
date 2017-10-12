# Communication

- [AppSocket](#appsocket)
  - [**new** AppSocket([port])](#AppSocket)
  - [appSocket.**status**](#appSocket.status)
  - [appSocket.**send**(client, act, msg)](#appSocket.send)
  - [appSocket.**on**(act, callback)](#appSocket.on)


## AppSocket

<br/>
<br/>

<a href="#AppSocket" name="AppSocket">#</a> **new** AppSocket(\[port\])

Construtor de um webSocket da aplicação. Uma porta pode ser especificada, caso contrário o padrão é `6661`.

Parâmetros:
- **integer** `port` - Porta para se comunicar com o servidor.

A seguir um exemplo de código criando um novo socket e registrando um callback para receber mensagem com o propósito `"open"`. Essa função é chamada quando a conexão é aberta. Em seguida é enviada uma mensagem para o servidor com o propósito `"tools"`.

```javascript
//Instancia um novo socket para comunicação com o servidor.
var mysocket = new AppSocket();

mysocket.on("open", function(){
    mysocket.send("tools", "olá");
});

```

<br>
<br>

<a href="#appSocket.status" name="appSocket.status">#</a> appSocket.__status__

Status do socket.

Tipo:
- **object**

Atributos:
- **boolean** `appSocket.status.open` - indica se o socket está aberto `true` ou fechado `false`.


<br>
<br>

<a href="#appSocket.send" name="appSocket.send">#</a> appSocket.__send__(act, msg)

Envia uma mensagem `msg` para o servidor com um determinado propósito `act`.

Parâmetros:
- **string** `act` - Propósito da mensagem, será utilizado para direcionar a mensagem.
- **object** `msg` - Mensagem propriamente dita, pode ser uma string ou um objeto.



<br>
<br>

<a href="#appSocket.on" name="appSocket.on">#</a> appSocket.__on__(act, callback)

Registra uma função `callback` para receber mensagens com um propósito `act`. Utilizado para receber mensagens do servidor.

Parâmetros:
- **string** `act` - Propósito da mensagem, será utilizado para direcionar a mensagem.
- **function** `callback` - Função que será chamada quando uma mensagem com o propósito especificado for recebida. O parâmetro enviado para a função é o seguinte:
  - **object** `msg` - Mensagem enviada pelo servidor.
