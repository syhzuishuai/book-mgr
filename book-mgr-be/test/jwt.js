var jwt = require('jsonwebtoken');
var token = jwt.sign({
    account:'a.cc.com',
    _id:'123123',
}, 'aaaa');  //第二个参数是密钥(signature)

console.log(token);

//header
//加密的算法


// payload
//加密的内容

//signature


//第一个参数是生成的token值 第二个参数为密钥(signature) 第三个参数为回调函数(err 错误信息,payload:加密的内容)
jwt.verify(token,'aaaa',(err,payload)=>{
    console.log(err,payload)
})