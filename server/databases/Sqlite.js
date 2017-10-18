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

    get tables() {
        let me = this;


          return new Promise( (resolve, reject) => {
            this.knex('sqlite_master').where({
                'type': 'table'
            })
            .select('name')
            .map( (row)=>{return {
                'Nome': row.name,
                'Colunas': null,
                'Entradas': null
            }})
            .then( (result) => {
                let columnCount = _getColumnsCount.call(me, result);
                let entryCount = _getEntryCount.call(me, result);
                Promise.all([columnCount, entryCount])
                .then( (values) => {
                  resolve(_insertCount(result, values));
                });
            });
          });


    }


    // meta() RETORNA o JSON com os metadados de uma data tabela, e passa para o CALLBACK
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
      return new Promise( (resolve, reject) => {
        // Inicia a query
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

// Private functions
function _insertCount(result, values){
  let columnCount = values[0];
  let entryCount = values[1];
  result.forEach(function(val_i, index){
    val_i.Colunas = columnCount[index];
    val_i.Entradas = columnCount[index];
  });
  return result;

}

function _getColumnsCount(result){
  return new Promise( (resolve, reject) => {
    let columnCount = []
    result.forEach( (val_i) => {
      this.knex.schema.raw("PRAGMA table_info("+val_i.Nome+")").then(function(pragma){
        columnCount.push(pragma.length);
        if (columnCount.length === result.length) resolve(columnCount);
      });
    });
  });
}

function _getEntryCount(result){
  return new Promise( (resolve, reject) => {
    let entryCount = [];
    result.forEach( (val_i) => {
      this.knex(val_i.Nome).select().count().then(function(res){
          entryCount.push((res[0]['count(*)']));
          if (entryCount.length === result.length) resolve(entryCount);
      });
    });

  });
}
