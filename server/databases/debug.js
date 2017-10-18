const fs = require('fs');
const Sqlite = require('./Sqlite');
const tableify = require('tableify');
let database_name = 'sample'
const base = new Sqlite(database_name);

let tbl_name = 'hearthstone';

let args = {
    columns: ['name', 'artist', 'text'],
    filters: [['rarity', '=', 'RARE'], ['cardClass', '=', 'WARLOCK']],
    order: {
        columns: [],
        mode: []
    }
}
let tables = base.tables;
let view  = base.select(tbl_name, args).then( (view) => { output(tableify(view)); });
let meta = base.meta(tbl_name);
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
