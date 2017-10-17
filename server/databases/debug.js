var fs = require('fs');
var Sqlite = require('./Sqlite');
var database_name = 'sample'

var base = new Sqlite(database_name);


var table_name = 'hearthstone';

config= {
    columns: ['name', 'artist', 'text'],
    filters: [['rarity', '=', 'RARE'], ['cardClass', '=', 'WARLOCK']],
    order: {
        columns: [],
        mode: []
    }
}

var view  = base.select(table_name, config);

base.tables( (res, html) => {
  console.log(res);
})


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
