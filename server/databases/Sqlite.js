//Params: database_name, callback(err,data);
var Sqlite = function() {}

// Metodo que retorna as tabelas de uma base



Sqlite.prototype.getTables = function(database_name, callback){
    var sqlite3 = require('sqlite3');
    var tableify = require('tableify');
    var knex = require('knex')({
        client: 'sqlite3',
        connection: {
            filename: "./sample.sqlite"
        },
        useNullAsDefault: true
    });
    knex('sqlite_master').select('name')
        .then((res) => {
            html = tableify(res);
            callback(res, html);
        });
}

Sqlite.prototype.getMeta = function(database_name, table_name, callback){
}
Sqlite.prototype.constructView = function(){

}
Sqlite.prototype.meta = function(){

}
Sqlite.prototype.constructMetaView = function(){

}
module.exports = Sqlite;