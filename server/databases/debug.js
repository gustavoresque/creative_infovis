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




*/
/* Debug meta(table_name, callback(data, html))
base.meta(table_name, (data, html) => {
    console.log(html);
    output(html);
});
*/



//Debug constructView(table_name, attributes, where, orderBy, callback(data, html, view))
attributes = ['name', 'cardClass', 'type', 'set', 'rarity'];
where = {
    'rarity': 'LEGENDARY',
    'cardClass': 'PRIEST'
};
orderBy = {columns:['set', 'name'], mode:'ASC'}; //Mode ASC DESC

base.constructView(table_name, attributes, where, orderBy, (data, html) =>{
    output(html)
    console.log(data);
    console.log(html);
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
