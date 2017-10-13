//Params: database_name, callback(err,data);
class Sqlite {
    constructor(database_name){
        this.tableify = require('tableify');
        this.database_name = database_name;
        this.knex = require('knex')({
            client: 'sqlite3',
            connection: {
                filename: "./"+database_name+".sqlite"
            },
            useNullAsDefault: true
        });
    }


    // tables() passa o JSON com as tabelas da base para o CALLBACK
    tables(callback) {
        this.knex('sqlite_master').where({
            'type': 'table'
        })
        .select('name')
        .then((res) => {
            var html = this.tableify(res);
            callback(res, html);
        });
        return this;
    }
    // meta() RETORNA o JSON com os metadados de uma data tabela, e passa para o CALLBACK
    meta(table_name, callback){
        this.knex.schema.raw("PRAGMA table_info("+table_name+")")
        .then((res) => {
            var html = this.tableify(res);
            if (callback) callback(res, html);
        });
        return this;
    }
    // constructView() passa o JSON com a view de uma dada nome_tabela+parametros para o CALLBACK
    constructView(table_name, attributes, where, orderBy, callback){
        var query = this.knex(table_name).select(attributes).where(where);
        if (orderBy.mode){
            var view = query.orderBy(orderBy.columns, orderBy.mode);
            view.then((res) => {
                var html = this.tableify(res);
                callback(res, html);
            });
        }
        else {
            var view = query;
            view.then((res) => {
                var html = this.tableify(res);
                callback(res, html);
            });
        }
        return this;
    }
}


module.exports = Sqlite;