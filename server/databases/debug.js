var Sqlite = require('./Sqlite');
var sqliteconn = new Sqlite();

/* Debug getTables
base_name = 'sample';
sqliteconn.getTables(base_name, (data, html) => {
    console.log(data);
    console.log(html);
});
*/


/* Debug getMeta
base_name = 'sample';
table_name = 'hearthstone';
sqliteconn.getMeta(base_name, table_name, (data, html) => {
    console.log(html);
});
*/

// Debug constructView
base_name = 'sample';
table_name = 'hearthstone';
attributes = ['name', 'artist', 'type', 'set'];
where = {
    'cardClass':'MAGE',
    'rarity': 'EPIC'
}
orderBy = {columns:['name', 'artist'], mode:'ASC'}; //Mode ASC DESC
sqliteconn.constructView(base_name, table_name, attributes, where, orderBy, (data, html) =>{
    console.log(data);
    console.log(html);
});
