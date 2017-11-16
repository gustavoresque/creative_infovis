let connection;
const mysocket = new AppSocket();

mysocket.on("open", function(){
    console.log("deu certo");
    mysocket.send("tools", "olá")
});

mysocket.on("connect", (c) => {
    console.log(c);
    connection = c;
});
mysocket.on('metadata', (m) => {
    //console.log(m);
});






$(document).ready(function(){
    let partition = new PartitionLayout();
    partition.onselectednode = function(a,b){
        console.log(a,b);
    };
    $("#connect").click(()=>{
        mysocket.send('connect', {base_path: '../server/test_unity/sqlite_files/tests.sqlite'});
    });
    $("#meta").click(()=>{
        mysocket.send('metadata', {connection: connection, table_name:"imaginary_sells"});
    });
});


