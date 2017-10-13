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
    /* as colunas de tables são:
        nome | Ncolunas | Nentidades
    */
    getColumnsCount(tbl_name, callback){
        this.knex.schema.raw("PRAGMA table_info("+tbl_name+")").then(function(res){
            console.log('\n\n\nOOOOOWOWWWWW\n\n\n');
            console.log(res.length);
            callback(res.length);
        });
    }

    getEntryCount(tbl_name, callback){
        this.knex(tbl_name).select().count().then(function(res){
            console.log('\n\n\nYAYAYAYAYAYAYAYAYAY\n\n\n');
            console.log(res[0]['count(*)']);
            callback(res[0]['count(*)']);
        })
    }


    tables(callback) {
        var self = this;
        var arr = this.knex('sqlite_master').where({
            'type': 'table'
        })
        .select('name')
        .map((row)=>{return {
            'Nome': row.name,
            'Colunas': 0,
            'Entradas': 0
        }})
        .then((res) => {
            var html = this.tableify(res);
            console.log(res);
            var aux_arr = [];
            res.forEach(function(val_i){
                self.getColumnsCount(val_i.Nome,function(count){
                    aux_arr.push(0);
                    val_i.Colunas = count;
                    if(aux_arr.length === res.length){
                        private_entryCount(res, self, callback);
                    }
                });
            })

        });
        return this;
    }

    

    // meta() RETORNA o JSON com os metadados de uma data tabela, e passa para o CALLBACK
    /* as colunas de meta são:
        coluna | tipo | nulo | prikey | defaultValue | Min | Max | Moda
             */
    meta(table_name, callback){
        this.knex.schema.raw("PRAGMA table_info("+table_name+")")
        .map((row)=>{return {
            'Name': row.name,
            'Type': row.type,
            'Valor Maximo': null,
            'Valor Minimo': null,
            'Moda': null
            
        }})
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







function private_entryCount(res, self, callback){
    var aux_arr = [];
    res.forEach(function(val_i){
        self.getEntryCount(val_i.Nome,function(count){
            aux_arr.push(0);
            val_i.Entradas = count;
            if(aux_arr.length === res.length){
                callback(res, self.tableify(res));
            }
        });
    })
}