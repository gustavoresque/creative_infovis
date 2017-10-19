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
            .then( (tbl_list) => {
                let columnCount = _getColumnsCount.call(me, tbl_list);
                let lineCount = _getLineCount.call(me, tbl_list);
                Promise.all([columnCount, lineCount])
                .then( (values) => {
                  resolve(_insertCount(tbl_list, values));
                });
            });
          });


    }


    // meta() RETORNA o JSON com os metadados de uma data tabela, e passa para o CALLBACK
    meta(table_name){
      let me = this

      return new Promise((resolve, reject) => {
        this.knex.schema.raw("PRAGMA table_info("+table_name+")")
        .map((row)=>{return {
            'Name': row.name,
            'Type': row.type,
            'Minimum': null,
            'Maximum': null,
            'Mode': null

        }})
        .then((meta_list) => {
            let maxValues = _getMaximum.call(me, table_name);
            let minValues = _getMinimum.call(me, table_name);
            let modeValues = _getMode.call(me, table_name);
            let ready = Promise.all([maxValues, minValues, modeValues]);
            ready.then( (values) => {
              resolve(_insertMeta(meta_list, values));
            });
        });
      });
    }


    // select() passa o JSON com a view de uma dada nome_tabela+parametros para o CALLBACK
    select(tbl_name, args){
      let me = this;
      return new Promise( (resolve, reject) => {
        // Inicia a query
        me.knex(tbl_name).select(args.columns)
        // Adiciona os filtros WHERE
        .modify( (queryBuilder) => {
          args.filters.forEach( (filter) => {
            queryBuilder.where(filter[0], filter[1], filter[2]);
          });
        })
        // Adiciona ordenação ORDERBY
        .modify( (queryBuilder) => {
          args.order.columns.forEach( (column, i) => {
            queryBuilder.orderBy(column, args.order.mode[i]);
          });
        })
        // Resolve a query
        .then( (result) => {
          resolve(result);
        });
      });
    };


}

module.exports = Sqlite;

// Private functions
function _insertCount(tbl_list, values){
  let columnCount = values[0];
  let lineCount = values[1];
  tbl_list.forEach( (table_obj, index) => {
    table_obj.Colunas = columnCount[index];
    table_obj.Entradas = lineCount[index];
  });
  return tbl_list;

}
function _insertMeta(meta_list, values){
  let max = values[0];
  let min = values[1];
  let mode = values[2];
  // let meta = values[i]...
  meta_list.forEach( (attr_obj, index) => {
    attr_obj.Maximum = max[index];
    attr_obj.Minimum = min[index];
    attr_obj.Mode = mode[index];
    //attr_obj.Meta = meta[index]...
  });
  return meta_list;
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

function _getLineCount(result){
  return new Promise( (resolve, reject) => {
    let lineCount = [];
    result.forEach( (val_i) => {
      this.knex(val_i.Nome).select().count().then(function(obj){
          let value = obj[0]['count(*)'];
          lineCount.push(value);
          if (lineCount.length === result.length) resolve(lineCount);
      });
    });
  });
}

function _getMaximum(tbl_name){
  return new Promise((resolve, reject) => {
    let maximumValues = [];
    this.knex.schema.raw("PRAGMA table_info("+tbl_name+")")
    .then( (pragma) => {
      pragma.forEach( (pragmaLine, index) => {
        this.knex(tbl_name).max(pragmaLine.name).then( (obj) => {
          let value = obj[0]['max("'+pragmaLine.name+'")']
          if (_isNumeric(value)) maximumValues.push(value);
          else maximumValues.push('NaN');
          if (maximumValues.length === pragma.length) resolve(maximumValues);
        });
      });
    });
  });
}

function _getMinimum(tbl_name){
  return new Promise((resolve, reject) => {
    let minimumValues = [];
    this.knex.schema.raw("PRAGMA table_info("+tbl_name+")")
    .then( (pragma) => {
      pragma.forEach( (pragmaLine, index) => {
        this.knex(tbl_name).min(pragmaLine.name).then( (obj) => {
          let value = obj[0]['min("'+pragmaLine.name+'")']
          if (_isNumeric(value)) minimumValues.push(value);
          else minimumValues.push('NaN');
          if (minimumValues.length === pragma.length) resolve(minimumValues);
        });
      });
    });
  });
}
function _getMode(tbl_name){
  // função que retorna o modo de um array
  let mode = (arr) => {
      return arr.sort((a,b) =>
            arr.filter(v => v===a).length
          - arr.filter(v => v===b).length
      ).pop();
  }
  // função que extrai os arrays
  return new Promise((resolve, reject) => {
    let modeValues = [];
    this.knex.schema.raw("PRAGMA table_info("+tbl_name+")")
    .then( (pragma) => {
      pragma.forEach( (pragmaLine) => {
        this.knex(tbl_name).select(pragmaLine.name)
        .map( (obj) => {
          return obj[pragmaLine.name];
        })
        .then( (array) =>{
          modeValues.push(mode(array));
          debugger;
          if (modeValues.length === pragma.length) resolve(modeValues);
        })
      })
    })
  })
}



  function _isNumeric(n) {
    return (n - 0) == n && (''+n).trim().length > 0;
  }
