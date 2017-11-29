let key;
const mysocket = new AppSocket();

mysocket.on("open", function(){
    console.log("deu certo");
    mysocket.send("tools", "olá")
});

mysocket.on("connect", (res) => {
    console.log('oq o cliente recebe:', res.connection_key);
key = res.connection_key;
});
mysocket.on('metadata', (res) => {
    console.log(res.result);
});

$(document).ready(function(){
    let partition = new PartitionLayout();
    partition.onselectednode = function(a,b){
        console.log(a,b);
    };
    $("#connect").click(()=>{
        mysocket.send('connect', {base_name: 'tests.sqlite'});
    });
    $("#meta").click(()=>{
        mysocket.send('metadata', {connection_key: key, table_name:"imaginary_sells"});
    });

    mysocket.send('menu',{});

    mysocket.on('menu', (data) => {
        dataMenu = data;
        createMenu(data);

        console.log(dataMenu);
    });

});






