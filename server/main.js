const socket = new (require("./communication/ServerSocket.js"))();

//Controller
socket.on("tools.a", function(socket, msg){
    console.log(msg);

});

socket.on("db.webservice.open", function(socket, msg){
  //  console.log(msg);
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
/*
socket.on('menu', (client, msg) => {
    console.log("entrou", msg);
    //socket.send(client, 'menu', "agora vai");
});
*/

socket.on('menu', (client, msg) => {

socket.send(client, 'menu',data = [{
        name: "View",
        sub: [
            {
                name: "Data",
                sub:[
                    {
                        name :"SGBD",sub:[]
                    },
                    {
                        name:"Webservice",sub:[]
                    },
                    {
                        name:"Source",sub:[]
                    },
                    {
                        name:"Raw File",sub:[]
                    },
                    {
                        name:"Machine Learn"
                    }],

            },{
                name:"Visualizations",sub:[

                ]
            }]
    },{
        name:"About",
        sub:[
            {name:"Uma ferramenta de Visualização da informação"}
        ]
}
    ]



);







});
console.log(socket.callbacks);



//Demais


