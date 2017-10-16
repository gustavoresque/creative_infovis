var fs = require('fs');
var Sqlite = require('./Sqlite');
var database_name = 'sample'

var base = new Sqlite(database_name);


var table_name = 'hearthstone';



/* Debug tables()
base.tables((data, html) => {
    console.log(data);
    console.log(html);
    output(html);
});
//*/




/* Debug meta(table_name, callback(data, html))
base.meta(table_name, (data, html) => {
    //console.log(html);
    output(html);
});
//*/



// Debug constructView(table_name, attributes, where, orderBy, callback(data, html, view))
config1 = {
    columns: ['name', 'cardClass', 'type'],
    filters: [['rarity', '=', 'LEGENDARY'], ['cardClass', '=', 'PRIEST']],
    order: {
        columns: ['type', 'name'],
        mode: ['ASC', 'DESC']
    }
}

config2 = {
    columns: ['name', 'artist', 'text'],
    filters: [['rarity', '=', 'RARE'], ['cardClass', '=', 'WARLOCK']],
    order: {
        columns: [],
        mode: []
    }
}

var view  = base.select(table_name, config1);
var view2  = base.select(table_name, config2);
Promise.all([view, view2]).then( (results) => {
  console.log(results[0]);
  console.log(results[1]);
});
/*view.then((data, html) =>{
    output(html)
    console.log(html);
    console.log(data);
});
//*/




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
