

var socket = new (require("./communication/ServerSocket.js"))();


socket.on("tools", function(socket, msg){
    console.log(msg);
});


