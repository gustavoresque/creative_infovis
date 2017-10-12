//Params: database_name, callback(err,data);
var Sqlite = function() {}

// Metodo que retorna as tabelas de uma base


//Método que obtem as tabelas de uma dada base
Sqlite.prototype.getTables = function(database_name, callback){
    var sqlite3 = require('sqlite3');
    var tableify = require('tableify');
    var knex = require('knex')({
        client: 'sqlite3',
        connection: {
            filename: "./"+database_name+".sqlite"
        },
        useNullAsDefault: true
    });
    knex('sqlite_master').where({
        'type': 'table'
    })
        .select('name')
        .then((res) => {
            var html = tableify(res);
            callback(res, html);
        });
}
//Método que obtem os metadados de uma dada tabela
Sqlite.prototype.getMeta = function(database_name, table_name, callback){
    var tableify = require('tableify');
    var knex = require('knex')({
        client: 'sqlite3',
        connection: {
            filename: "./"+database_name+".sqlite"
        },
        useNullAsDefault: true
    });
    knex.schema.raw("PRAGMA table_info("+table_name+")")
    .then((res) => {
        var html = tableify(res);
        callback(res, html);
    });
}
//Método que constroi uma view dado os parametros passados
Sqlite.prototype.constructView = function(database_name, table_name, attributes, where, orderBy, callback){

    var tableify = require('tableify');
    var knex = require('knex')({
        client: 'sqlite3',
        connection: {
            filename: "./"+database_name+".sqlite"
        },
        useNullAsDefault: true
    });

    var query = knex(table_name).select(attributes).where(where);
    if (!orderBy.mode){
        query.then((res) => {
            var html = tableify(res);
            callback(res, html);
        });
    }
    else {
        query.orderBy(orderBy.columns, orderBy.mode)
        .then((res) => {
            var html = tableify(res);
            callback(res, html);
        });
    }
}
module.exports = Sqlite;