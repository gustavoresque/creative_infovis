const Sqlite = require('../databases/SGBD/Sqlite');
const connection = new Sqlite('sqlite_files/tests.sqlite');
const fs = require('fs');
const tableify = require('tableify');
let tbl_name = 'imaginary_sells';

connection.meta(tbl_name).then( (result) => {
   output(result);
});




//OUTPUT

function output(html){
    var string = `
   <!DOCTYPE html>
   <html>
<style>
 table {
   font: 85%/1.6 "Myriad Pro", Frutiger, "Lucida Grande", "Lucida Sans", "Lucida Sans Unicode", Verdana, sans-serif;
   border:inherit;
   width: 100%;
 }

 th {
   background: #333;
   color: white;
   font-weight: bold;
 }
 
 tr:hover {
   background-color:#ccc;
   color:#000;
 }
 thead tr:hover {
   background-color: #ccc;
   color: inherit;
}
   thead tr:hover {
   background-color: #ccc;
   color: inherit;
 }
 th {
   font-weight: normal;
   text-align: left;
 }
 th, td {
   padding: 0.2em 1em;
 }
</style>
   <body>
   ${tableify(html)}
   </body>

   </html>

   `


    fs.writeFile("./sqlite_meta.html",string,function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("\nTabela disponível em sqlite_meta.html");
    });
}