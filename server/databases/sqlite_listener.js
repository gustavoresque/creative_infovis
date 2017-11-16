const fs = require('fs');
const math = require('mathjs');
const tableify = require('tableify');
const Sqlite = require('./SGBD/Sqlite');
const ServerSocket = require('../communication/ServerSocket.js');
const socket = new ServerSocket();
const keygen = require('keygenerator');
let connections = new Map();

socket.on('connect', (client, msg) => {
    /*
    Objeto msg {
        str base_name diz o nome da base que devera ser conectada
    }
     */
    let base_path = `../test_unity/sqlite_files/${msg.base_name}`;
    let key = keygen._();
    console.log('Mandando chave para o cliente: ', key);
    connections.set(key, new Sqlite(base_path));
    socket.send(client, 'connect', {connection_key: key});
});

socket.on('tables', (client, msg) => {
    /*
    Objeto msg {
        str connection_key contém a conexão recebida pelo act connect TODO implementar
    }
     */
    msg.connection.tables().then(table_list => {
        socket.send(client, 'tables', table_list);
    });
});
socket.on('metadata', (client, msg) => {
    /* Objeto metadata {
        str connection_key contém a conexão recebida pelo act connect TODO implementar
        str table_name contém a tabela que deseja receber os metadados
    }
     */
    if (!connections.has(msg.connection_key)) {console.log(new Error('Conectar Primeiro'));}
    else {
        console.log('Realizando conexão com a chave: ', msg.connection_key);
         let connection = connections.get(msg.connection_key);
         connection.meta(msg.table_name).then( (result) => {
            socket.send(client, 'metadata', {result: result});
         });
    }
});
socket.on('select', (client, msg) => {
    /* Objeto search {
        str connection_key contém a conexão recebida pelo act connect TODO implementar
        str table_name contém a tabela que será relizada a busca
        args objeto que contém os demais parâmetros de busca (Detalhes na documentação)
     */
    msg.connection.select(msg.table_name, msg.args).then(result => {
        socket.send(client, 'select', result);
    });
});
