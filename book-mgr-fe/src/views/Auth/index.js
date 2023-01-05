import { defineComponent,reactive} from "vue" 
import { UserOutlined,LockOutlined,UsergroupAddOutlined } from '@ant-design/icons-vue'
import {auth} from "@/service"
import { message } from "ant-design-vue"
import {result} from '@/helpers/utils/index'
export default defineComponent({
    components:{
        UserOutlined,
        LockOutlined,
        UsergroupAddOutlined
    },
    setup(){
        // 注册的表单
        const regForm = reactive({
            account:'',
            password:'',
            inviteCode:''
        })
        //登录的表单
        const loginForm = reactive({
            account:'',
            password:''
        })
        const register = async ()=>{
            if(regForm.account === ''){
                message.info('请输入用户名')
                return
            }
            if(regForm.password === ''){
                message.info('请输入密码')
                return
            }
            if(regForm.account.length < 6 || regForm.account.length > 16){
                message.info('账号为6~16位之间')
                return
            }
            if(regForm.password.length < 6 || regForm.password.length > 16){
                message.info('密码为6~16位之间')
                return
            }
            if(regForm.inviteCode === ''){
                message.info('请输入邀请码')
                return
            }
            const res = await auth.register(regForm.account,regForm.password,regForm.inviteCode)
            result(res)
                .success((data)=>{
                    message.success(data.msg)
                })
                .finally((data)=>{
                    if(data.code === 1){
                        regForm.account = ''
                        regForm.password = ''
                        regForm.inviteCode = ''
                    } 
                })

        }
        const login = async ()=>{
            if(loginForm.account === ''){
                message.info('请输入用户名')
                return
            }
            if(loginForm.password === ''){
                message.info('请输入密码')
                return
            }
            if(loginForm.account.length < 6 || regForm.account.length > 16){
                message.info('账号为6~16位之间')
                return
            }
            if(loginForm.password.length < 6 || regForm.password.length > 16){
                message.info('密码为6~16位之间')
                return
            }
            const res = await auth.login(loginForm.account,loginForm.password)
           result(res)
            // 登陆成功后显示提示
           .success((data)=>{
                message.success(data.msg)
           })
        //    登陆成功后跳转页面
           .finally((data)=>{
                if(data.code){
                    // 跳转页面
                    alert('跳准页面')
                }
           })
        }
        return {
            regForm,
            loginForm,
            register,
            login
        }
    },
})