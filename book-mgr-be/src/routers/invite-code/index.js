const Router = require('@koa/router')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
//创建数据模型
const InviteCode =  mongoose.model('InviteCode')
const {getBody} = require('../../helpers/utils/index')


const router = new Router({
    prefix:'/invite'
})

router.get('/add',async (ctx)=>{
    const code = new InviteCode({
        code:uuidv4(),
        user:''
    })

    const saved = await code.save()

    ctx.body = {
        code:1,
        data:saved,
        msg:'创建成功'
    }
})

module.exports = router