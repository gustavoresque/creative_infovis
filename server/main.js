const socket = new (require("./communication/ServerSocket.js"))();

//Controller
socket.on("tools.a", function(socket, msg){
    console.log(msg);

}).on("db.webservice.open", function(socket, msg){
    console.log(msg);
    // const WebService = require("./databases/WebService/webservice.js");
    // const webservice = new WebService(
    //     "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=PRECIP_15&stationid=COOP:010008&units=metric&startdate=2010-05-01&enddate=2010-05-31",
    //     "GET",
    //     {token: "lFsbmWuvzXdlFNfvdRnXdVzbtNakDnuO"},
    //     function(err){
    //         if(err){
    //             console.log(err);
    //         }
    //     });
    //
    //
    // webservice.send(function(err, data){
    //     if(err)
    //         console.log("deu erro> ", err);
    //
    //     console.log(data);
    // });

});
console.log(socket.callbacks);
//Demais


