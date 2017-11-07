const fs = require('fs');
const math = require('mathjs');
const tableify = require('tableify');
const Sqlite = require('./Sqlite');
let database_name = 'sample'
const base = new Sqlite(database_name);

let tbl_name1 = 'hearthstone';
let args1 = {
    columns: ['name', 'artist', 'text'],
    filters: [['rarity', '=', 'RARE'], ['cardClass', '=', 'WARLOCK']],
    order: {
        columns: [],
        mode: []
    }
}
// ARRUMAR ESSE BANDO DE ARRAY SOLTO
let tbl_name2 = 'imaginary_sells';


let newArgs2 = {
  columns: [],
  filters: [{
    attribute: 'product_A_sells',
    operator: '>',
    value: 900
  },
  { attribute: 'product_A_sells',
    operator: '<',
    value: 920
  }
  ],
  order: [{
    column: 'product_A_sells',
    mode: 'ASC'
  },
  {
    column: 'product_B_sells',
    mode: 'DESC'
  }
],
}

let args2 = {
  columns: [],
  filters: [['product_A_sells', '>', '900'], ['product_A_sells', '<', '910']],
  order: {
    columns: [],
    mode: []
  }
}



let tbl_name3 = 'imaginary_climate'
let args3 = {
  columns: [],
  filters: [],
  order: {
    columns: [],
    mode: []
  }
}


//let tables = base.tables.then( (list) => {output(tableify(list));});
let table_list = base.tables.then( (json_list) => {

})

let view  = base.select(tbl_name2, newArgs2).then( (view) => {
  output(tableify(view));
})
let meta = base.meta(tbl_name3).then( (meta) => {

});

//OUTPUT
function output(html){
    var string = `
    <!DOCTYPE html>
    <html>

    <body>
    ${html}
    </body>

    </html>

    `


    fs.writeFile("./debug.html",string,function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("\nTabela disponível em debug.html");
    });
}
