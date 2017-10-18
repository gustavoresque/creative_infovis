const fs = require('fs');
const Sqlite = require('./Sqlite');

let database_name = 'sample'
const base = new Sqlite(database_name);

let table_name = 'hearthstone';

let args = {
    columns: ['name', 'artist', 'text'],
    filters: [['rarity', '=', 'RARE'], ['cardClass', '=', 'WARLOCK']],
    order: {
        columns: [],
        mode: []
    }
}

let view  = base.select(table_name, args);

let tables = base.tables
console.log('async 1');
tables.then( (list) => {console.log('acessando aqui opa', list);});
console.log('async 2');
tables.then( (list) => {console.log('acessando dnv aqui', list);});
console.log('async 3');
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
