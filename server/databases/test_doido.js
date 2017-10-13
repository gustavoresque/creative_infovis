function sync(callback){
    for(var i=0;i<9999999;i++){}
    callback('alo1!');
    return 'terminou ssinc';
}


function async(callback){
    setTimeout(()=>{
        for(var i=0;i<9999999;i++){}
        callback('alo2!');
    },30);
    return 'terminou assinc';
}


console.log('começou.');
console.log(sync((str)=>{
    console.log(str);
}));

console.log('assinc.');
console.log(async((str)=>{
    console.log(str);
}));

console.log('terminou.');