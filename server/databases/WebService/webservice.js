
//var postData = querystring.stringify({
//  'msg': 'Hello World!'
//});

//TODO: refatorar para sintaxe de classes.
var WebService = function (url, method, headers, callback) {
    this.url = url;
    this.method = method;
    this.headers = headers;

    var result = /^(https?)\:\/\/((\w+((\-\w+)|(\.\w+))*)(\:(\d+))?)(\/([\w\-\/\_\.]+))?(\?([\w\-\/\_\.\+\=\&\:\%]+))?$/g.exec(url);
    
    if(!result){
        callback("URL inválida");
        return undefined;
    }
        
    
    if(result[8]){
        this.port = parseInt(result[7]);
    }
    
    if(result[1] === "http"){
        this.http = require('http');
        this.port = this.port || 80;
    }else{
        this.http = require('https');
        this.port = this.port || 443;
    }
    
    this.host = result[3];
    this.path = (result[9]||"")+(result[11]||"");
 
    return this;
};

WebService.prototype.send = function (callback) {
    var self = this;
    

    var options = {
        hostname: self.host,
        port: self.port,
        path: self.path,
        method: self.method,
        headers: self.headers
    };

    var req = self.http.request(options, function (res) {
        console.log("STATUS: " + res.statusCode);
        console.log("HEADERS: " + JSON.stringify(res.headers));
        
        var data="";
        
        
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log("INICIO do BODY");
            console.log("BODY: " + chunk);
            data += chunk;
        });
        res.on('end', function () {
            console.log('No more data in response.');
            if(res.statusCode === 200){
                callback(undefined, data);
            }else{
                callback({message: "problema", statusCode: res.statusCode}, data);
            }
            
        });
    });

    req.on('error', function (e) {
        callback(e);
    });

// write data to request body
//req.write('');
    req.end();
};


module.exports = WebService;
