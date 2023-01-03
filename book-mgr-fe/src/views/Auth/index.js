import { defineComponent,reactive} from "vue" 
import { UserOutlined,LockOutlined,UsergroupAddOutlined } from '@ant-design/icons-vue'
import {auth} from "@/service"
export default defineComponent({
    components:{
        UserOutlined,
        LockOutlined,
        UsergroupAddOutlined
    },
    setup(){
        const regForm = reactive({
            account:'',
            password:''
        })
        const register = ()=>{
            auth.register(regForm.account,regForm.password)
        }
        return {
            regForm,
            register
        }
    },
})