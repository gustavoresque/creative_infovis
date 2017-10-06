//Params: database_name, callback(err,data);
var Sqlite = function() {}


Sqlite.prototype.getTables = function(database_name, callback){
    var sqlite3 = require('sqlite3');
    var data;
    var sql = '';

    var db = new sqlite3.Database(database_name + '.db', function(err){
        if (err) callback(err);
        console.log('[ * ] Conectado à base de dados', database_name);
        sql = "SELECT name FROM sqlite_master WHERE type='table'"
        db.all(sql,function(err,rows){
            data = rows;   
            db.close(function(err){
                if (err) callback(err);
                console.log('[ * ] Conexão fechada', database_name);
                callback(err, data);
            });
        });
    });


}

Sqlite.prototype.viewTable = function(database_name, table_name, callback){
}
Sqlite.prototype.constructView = function(){

}
Sqlite.prototype.meta = function(){

}
Sqlite.prototype.constructMetaView = function(){

}
module.exports = Sqlite;