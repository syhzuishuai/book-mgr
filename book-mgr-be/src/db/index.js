require('./Schemas/User')
const mongoose = require('mongoose')
const connect = ()=>{
    return new Promise((resolve)=>{
        //连接数据库
        mongoose.connect('mongodb://127.0.0.1:27017/book-mgr'); //book-mgr要添加的数据库

        //当数据库被打开时做事情
        mongoose.connection.on('open',()=>{
            console.log('连接数据库成功');
            resolve()
        })
    })
}
module.exports = {
    connect,
}