/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Verifica se uma string termina com outra string
 * @param {type} suffix
 * @returns {Boolean}
 */
String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var ServerSocket  = function(){
    var WebSocketServer = require('ws').Server;
    this.wss = new WebSocketServer({port: 6661});
    var callbacks = {};
    
    this.callbacks = callbacks;

    this.wss.on('connection', function (socket) {


        socket.on('message', function (message, flags) {
            if (!flags.binary) {
                var objMsg = JSON.parse(message);
                if (callbacks[objMsg.act])
                    callbacks[objMsg.act](socket, objMsg.msg);
            }
        });
        
        socket.on('close', function(err){
            console.log("closed");
            console.log(err);
        });
        
    });
    
    this.wss.on("close", function(err){console.log("closed");console.log(err);});
    this.wss.on("error", function(err){console.log("error");console.log(err);});

    this.wss.broadcast = function (data) {
        wss.clients.forEach(function (client) {
            client.send(data);
        });
    };
    
    
};

ServerSocket.prototype.send = function(client, act, msg){
    client.send(JSON.stringify({act: act, msg: msg}));
};

ServerSocket.prototype.sendBroadcast = function(act, msg){
    this.wss.broadcast(JSON.stringify({act: act, msg: msg}));
};

ServerSocket.prototype.on = function(act, callback){
    this.callbacks[act] = callback;
};