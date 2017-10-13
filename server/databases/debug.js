var Sqlite = require('./Sqlite');
var sqliteconn = new Sqlite();
var fs = require('fs');

/* Debug getTables
base_name = 'sample';
sqliteconn.getTables(base_name, (data, html) => {
    console.log(data);
    console.log(html);
    output(html);
});
*/
/* Debug getMeta
base_name = 'sample';
table_name = 'hearthstone';
sqliteconn.getMeta(base_name, table_name, (data, html) => {
    console.log(html);
    output(html);
});
*/
//Debug constructView
base_name = 'sample';
table_name = 'hearthstone';
attributes = ['name', 'cardClass', 'type', 'set', 'rarity'];
where = {
    'rarity': 'LEGENDARY',
    'cardClass': 'PRIEST'
};
orderBy = {columns:['set', 'name'], mode:'ASC'}; //Mode ASC DESC
sqliteconn.constructView(base_name, table_name, attributes, where, orderBy, (data, html) =>{
    console.log(data);
    console.log(html);
    output(html);
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
