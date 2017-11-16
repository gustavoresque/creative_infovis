const fs = require('fs');
const math = require('mathjs');
const tableify = require('tableify');
const Sqlite = require('./SGBD/Sqlite');
const ServerSocket = require('../communication/ServerSocket.js');
const socket = new ServerSocket();

socket.on('connect', (client, msg) => {
    /*
    Objeto msg {
        str base_path diz o caminho onde a base sqlite está guardada
    }
     */
    console.log('socket.on(connect)');
    let connection = new Sqlite(msg.base_path);
    socket.send(client, 'connect', connection);
});

socket.on('tables', (client, msg) => {
    /*
    Objeto msg {
        object connection contém a conexão recebida pelo act connect TODO implementar
    }
     */
    msg.connection.tables().then(table_list => {
        socket.send(client, 'tables', table_list);
    });
});
socket.on('metadata', (client, msg) => {
    /* Objeto metadata {
        object connection contém a conexão recebida pelo act connect TODO implementar
        str table_name contém a tabela que deseja receber os metadados
    }
     */
    if (!msg.connection) {console.log(new Error('conectar primeiro'));}
    else {
        console.log(msg.connection.);
        // msg.connection.meta(msg.table_name).then(metadata => {
        //     socket.send(client, 'metadata', metadata);
        // });
    }
});
socket.on('select', (client, msg) => {
    /* Objeto search {
        object connection contém a conexão recebida pelo act connect TODO implementar
        str table_name contém a tabela que será relizada a busca
        args objeto que contém os demais parâmetros de busca (Detalhes na documentação)
     */
    msg.connection.select(msg.table_name, msg.args).then(result => {
        socket.send(client, 'select', result);
    });
});
