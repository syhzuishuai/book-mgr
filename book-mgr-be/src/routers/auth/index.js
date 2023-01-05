const Router = require('@koa/router')
const mongoose = require('mongoose')

//创建数据模型
const User =  mongoose.model('User')
const InviteCode = mongoose.model('InviteCode')

const {getBody} = require('../../helpers/utils/index')
const jwt = require('jsonwebtoken')
const router = new Router({
    prefix:'/auth'
})

router.post('/register',async (ctx)=>{
    const {account,password,inviteCode} = getBody(ctx)

    // 有无邀请码
    const findCode = await InviteCode.findOne({
        code:inviteCode,
    }).exec()
    // 如果没找到邀请码或(邀请码已经被使用)返回不存在
    if(!findCode || findCode.user){
        ctx.body = {
            code:0,
            msg:'邀请码不存在',
            data:null
        }
        return
    }
    

    //首先去查找改账户是否存在
    const findUser = await User.findOne({
        account,
    }).exec()
    // 如果存在就返回错误信息
    if(findUser){
        ctx.body = {
            code:0,
            msg:'已经存在该用户',
            data:null
        }
        return
    }
    // 创建用户
    const user = new User({
        account,
        password
    })
    // 保存用户信息到数据库 返回一个_id
    const res = await user.save()
    // 将邀请码中的user字段与新注册的用户_id进行绑定
    findCode.user = res._id
    // 更新下  updateAt 字段
    findCode.meta.updateAt = new Date().getTime()
    // 然后将更新后的邀请码信息存储到数据库
    await findCode.save()
    ctx.body = {
        code:1,
        msg:'注册成功',
        data:res
    }
})

router.post('/login',async (ctx)=>{
    const {account,password} = getBody(ctx)
    // 根据输入的账号向数据库中寻找对应的数据
    const one = await User.findOne({
        account
    }).exec()
    // 如果没有找到提示用户名或密码错误
    if(!one){
        ctx.body = {
            code:0,
            msg:'用户名或密码错误',
            data:null
        }
        return
    }
    //如果找到了判断输入的密码是否相同 如果相同则登录成功并且签发密钥
    const user = {
        account:one.account,
        _id:one._id
    }
    if(one.password === password){
        ctx.body = {
            code:1,
            msg:'登录成功',
            data:{
                user,
                token:jwt.sign(user,'book-mgr')
            }
        }
        return
    }
    // 如果输入的密码不相同 则提示用户名或者密码错误
    ctx.body = {
        code:0,
        msg:'用户名或密码错误',
        data:null
    }
})

module.exports = router