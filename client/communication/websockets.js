/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var AppSocket = function () {
    
    var myappsocket = {};
    var socket = new WebSocket("ws://" + (location.host.split(":")[0]) + ":6661");

    myappsocket.status = {
        open: false
    };
    
    socket.onopen = function () {
        myappsocket.status.open = true;
        //socket.send(JSON.stringify({email: "email", password: "id"}));
        console.log("connection open!");
        if(myappsocket.callbacks.open) myappsocket.callbacks.open();
    };

    //método chamado quando ocorre um erro no socket de comunicação com servidor.
    socket.onerror = function (e) {
        console.log('ERROR');
        console.log(e);
    };

    socket.onclose = function () {
        console.log('CLOSED');
        myappsocket.status.open = false;
    };

    socket.onmessage = function (e) {
        var objMsg = JSON.parse(e.data);
        myappsocket.callbacks[objMsg.act](objMsg.msg);
    };

    myappsocket.socket = socket;
};

//Enviando requisições e recencendo no callback.
AppSocket.prototype.send = function (act, msg) {
    this.socket.send(JSON.stringify({act: act, msg: msg}));
};

AppSocket.prototype.callbacks = {};

AppSocket.prototype.on = function(eventName, callback_func){
    AppSocket.callbacks[eventName] = callback_func;
};

