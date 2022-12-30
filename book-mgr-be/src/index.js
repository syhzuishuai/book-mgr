const Koa = require('koa')
const app = new Koa()


// 通过app.use 注册中间件
//中间件的本质上是一个函数
//context 上下文 当前请求的相关信息都在里面
app.use((context)=>{
    const {request:req } = context
    const {url} = req
    if(url === '/user'){
        context.body = 'abcde'
        return
    }
    context.body = '???';
})



app.listen(3000,()=>{
    console.log('启动成功')
})