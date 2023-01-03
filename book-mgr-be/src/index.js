const Koa = require('koa')
const koaBody = require('koa-body')

//数据库连接 使用promise对象返回 
const {connect} = require('./db/index')

//创建路由(路由中含有对数据库操作的的代码所以要先建立数据库连接在对数据库进行操作)
const registerRoutes = require('./routers/index')
const cors = require('@koa/cors')


const app = new Koa()
//连接上数据库后才会监听端口号
connect().then(()=>{
    app.use(cors())   
    app.use(koaBody())
    registerRoutes(app)
   
    app.listen(3000,()=>{
        console.log('启动成功')
    })
})

