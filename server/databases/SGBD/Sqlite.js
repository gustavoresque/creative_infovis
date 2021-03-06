const math = require('mathjs');

class Sqlite {
    constructor(database_path){
        this.database = database_path;
        this.knex = require('knex')({
            client: 'sqlite3',
            connection: {
                filename: this.database
            },
            useNullAsDefault: true
        });
    }


    // tables() passa o JSON com as tabelas da base para o CALLBACK
    /* as colunas de tables são:
        nome | Ncolunas | Nentidades
    */


    tables() {
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
            'Mean': null,
            'Std': null,
            'Distribution': null,
            'Uniques': null

        }})
        .then((meta_list) => {
          let promises = [];
            promises.push(_getMax.call(me, table_name));
            promises.push(_getMin.call(me, table_name));
            promises.push(_getMean.call(me, table_name));
            promises.push(_getSTD.call(me, table_name));
            promises.push(_getDistributionType.call(me, table_name));

            let ready = Promise.all(promises);
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
            queryBuilder.where(filter.attribute, filter.operator, filter.value);
          });
        })
        // Adiciona ordenação ORDERBY
        .modify( (queryBuilder) => {
          args.order.forEach( (order) => {
            queryBuilder.orderBy(order.column, order.mode);
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

          // XXX: Private functions

// NOTE: rotina para filtragem de arrays e obtenção de numeros
var _filt = (a)=>{
  return a.filter( (n) => {
    return !(n===null) && _isNumeric(n);
  })
}

// NOTE: rotina para checagem de valores numéricos
var _isNumeric = (n)=>{
  return (n - 0) == n && (''+n).trim().length > 0;
}

// NOTE: rotina para checar se um array contem somente inteiros
var _hasOnlyInts = (a) => { [2,3]
  let isInt = (n) => {
    return (n % 1) === 0;
  }
  let notInts = a.filter( (n)=>{
    return !isInt(n);
  });
  return !Boolean(notInts.length);
}


      // XXX: Inserts



// NOTE: função que insere as contagens na lista de tabelas
function _insertCount(tbl_list, values){
  let columnCount = values[0];
  let lineCount = values[1];
  tbl_list.forEach( (table_obj, index) => {
    table_obj.Colunas = columnCount[index];
    table_obj.Entradas = lineCount[index];
  });
  return tbl_list;
}

// NOTE: função que insere as contagens na lista de atributos (metadados)
function _insertMeta(meta_list, values){
  let max = values[0];
  let min = values[1];
  let mean = values[2];
  let std = values[3];
  let distribution = values[4];
  // let meta = values[i]...
  meta_list.forEach( (attr_obj, index) => {
    debugger;
    attr_obj.Maximum = max[index];
    attr_obj.Minimum = min[index];
    attr_obj.Mean = mean[index];
    attr_obj.Std = std[index];
    attr_obj.Distribution = distribution[index];
    //attr_obj.Meta = meta[index]...
  });
  return meta_list;
}



          // XXX: Promises


// NOTE: função que obtem a contagem de colunas de todas as tabelas
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

// NOTE: função que obtem a contagem de linhas de todas as tabelas
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

// NOTE: função que obtem os atributos de uma dada tabela
function _getAttributes(tbl_name){
  return new Promise((resolve, reject) => {
    let attributes = [];
    this.knex.schema.raw("PRAGMA table_info("+tbl_name+")")
    .then( (pragma) =>{
      pragma.forEach( (pragmaLine) => {
        attributes.push(pragmaLine.name);
        if (attributes.length === pragma.length) resolve(attributes);
      });
    });
  });
}

// NOTE: função que obtem os valores máximos de cada coluna da tabela
function _getMax(tbl_name){
  return new Promise((resolve, reject) => {
    let maxValues = [];
    _getAttributes.call(this, tbl_name).then( (attributes) => {
      attributes.forEach( (attr) => {
        this.knex(tbl_name).pluck(attr)
        .then( (array) => {
          let filtered = _filt(array);
          if (filtered.length === 0) maxValues.push(NaN);
          else maxValues.push(math.max(filtered));
          if (maxValues.length === attributes.length) resolve(maxValues);
        });
      });
    });
  });
}

// NOTE: função que obtem os valores minimos de cada coluna da tabela
function _getMin(tbl_name){
  return new Promise((resolve, reject) => {
    let minValues = [];
    _getAttributes.call(this, tbl_name).then( (attributes) => {
      attributes.forEach( (attr) => {
        this.knex(tbl_name).pluck(attr).then( (array) => {
          let filtered = _filt(array);
          if (filtered.length === 0) minValues.push(NaN);
          else minValues.push(math.min(filtered));
          if (minValues.length === attributes.length) resolve(minValues);
        });
      });
    });
  });
}

// NOTE: função que obtem os valores médios de cada coluna da tabela
function _getMean(tbl_name){
  return new Promise((resolve, reject) => {
    let meanValues = [];
    _getAttributes.call(this, tbl_name).then( (attributes) => {
      attributes.forEach( (attr) => {
        this.knex(tbl_name).pluck(attr).then( (array) => {
          let filtered = _filt(array);
          if (filtered.length === 0) meanValues.push(NaN);
          else meanValues.push(math.round(math.mean(filtered),2));
          if (meanValues.length === attributes.length) resolve(meanValues);
        });
      });
    });
  });
}

// NOTE: função que obtem os valores de desvio padrão de cada coluna da tabela
function _getSTD(tbl_name){
  return new Promise((resolve, reject) => {
    let stdValues = [];
    _getAttributes.call(this, tbl_name).then( (attributes) =>{
      attributes.forEach( (attr) => {
        this.knex(tbl_name).pluck(attr).then( (array) => {
          let filtered = _filt(array);
          if (filtered.length === 0) stdValues.push(NaN);
          else stdValues.push(math.round(math.std(filtered),2));
          if (stdValues.length === attributes.length) resolve(stdValues)
        });
      });
    });
  });
}

// NOTE:
function _getDistributionType(tbl_name){
  return new Promise((resolve, reject) => {
    let distributionTypes = [];
    _getAttributes.call(this, tbl_name).then( (attributes) => {
      attributes.forEach( (attr) => {
        this.knex(tbl_name).pluck(attr).groupBy(attr)
        .then( (uniques) => {
          if (uniques[0] === null || uniques[0] === '') uniques.shift();
          if (uniques.length === 0) distributionTypes.push('ALL NULL');
          else if (uniques.length < 20) distributionTypes.push('CATEGORICAL('+uniques.length+')');
          else if (_hasOnlyInts(uniques)) distributionTypes.push('DISCRETE');
          else distributionTypes.push('CONTINUOUS');
          if (distributionTypes.length === attributes.length) resolve(distributionTypes);
        });
      });
    });
  });
};
