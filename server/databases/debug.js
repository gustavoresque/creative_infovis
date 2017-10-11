var Sqlite = require('./Sqlite');
var sqliteconn = new Sqlite();

// Debug getTables
base_name = 'sample';
sqliteconn.getTables(base_name, (data, html) => {
    console.log(data);
    console.log(html);
});


/* Debug viewMeta
base_name = 'sample';
table_name = 'hearthstone';
sqliteconn.getMeta(base_name, table_name, (data, html) => {

});
*/