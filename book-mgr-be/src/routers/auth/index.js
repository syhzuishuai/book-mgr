const Router = require('@koa/router')
const mongoose = require('mongoose')

//创建数据模型
const User =  mongoose.model('User')

const router = new Router({
    prefix:'/auth'
})

router.post('/register',async (ctx)=>{
    const {account,password} = ctx.request.body
    //首先去查找改账户是否存在
    const one = await User.findOne({
        account,
    }).exec()
    // 如果存在就返回错误信息
    if(one){
        ctx.body = {
            code:0,
            msg:'已经存在该用户',
            data:null
        }
        return
    }
    
    const user = new User({
        account,
        password
    })
    console.log(user)
    const res = await user.save()
    ctx.body = {
        code:1,
        msg:'注册成功',
        data:res
    }
})

router.post('/login',async (ctx)=>{
    ctx.body = '登录成功'
})

module.exports = router