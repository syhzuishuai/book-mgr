const mongoose = require('mongoose')

//1.给哪个数据库的
// 哪个集合
//添加什么格式的文档

//Schema(设置集合中每个属性是什么类型 )
//Modal 可以理解为根据Schema生成的一套方法，这套方法用来操作MongDB下的集合下的文档
const UserSchema = new mongoose.Schema({
    nickname:String,
    password:String,
    age:Number
})

const UserModal = mongoose.model('User',UserSchema) //根据UserSchema生成user集合

const connect = ()=>{
    //连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/book-mgr'); //book-mgr要添加的数据库

    //当数据库被打开时做事情
    mongoose.connection.on('open',()=>{
        console.log('连接成功');

        //每次new就是向集合中添加数据
        const user = new UserModal({
            nickname:'小红',
            password:'123123123',
            age:12
        })
        //修改本次加入数据库中的值
        user.age = 99

        //保存数据到mongodb
        user.save();
    })
}
connect()