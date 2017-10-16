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
        var me = this;
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
                me.getColumnsCount(val_i.Nome,function(count){
                    aux_arr.push(0);
                    val_i.Colunas = count;
                    if(aux_arr.length === res.length){
                        _entryCount(res, me, callback);
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


    // select() passa o JSON com a view de uma dada nome_tabela+parametros para o CALLBACK
    select(tbl_name, config){
      let me = this;
      return new Promise(function(resolve, reject) {
        //Inicia a query
        let query = me.knex(tbl_name).select(config.columns);

        // Adiciona os filtros WHERE
        config.filters.forEach( (filter) => {
          query = query.clone().where(filter[0], filter[1], filter[2]);
        });

        // Adiciona ordenação ORDERBY
        config.order.columns.forEach( (column, i) => {
          query = query.clone().orderBy(column, config.order.mode[i]);
        });

        // Resolve a query
        resolve(query);

      });
    };



}


module.exports = Sqlite;







function _entryCount(res, me, callback){
    var aux_arr = [];
    res.forEach(function(val_i){
        me.getEntryCount(val_i.Nome,function(count){
            aux_arr.push(0);
            val_i.Entradas = count;
            if(aux_arr.length === res.length){
                callback(res, me.tableify(res));
            }
        });
    })
}
