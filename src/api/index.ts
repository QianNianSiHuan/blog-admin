import axios from "axios";
import {Message} from "@arco-design/web-vue";

export const useAxios =axios.create(
    {
        timeout:6000,
        baseURL: "", //在使用前段代理的情况下，必须留空，不然会跨域
    }
)

useAxios.interceptors.request.use((config)=> {
    config.headers.set("token","测试token")
    return config
})

useAxios.interceptors.response.use((res) =>{
    if (res.status===200){
        return  res.data
    }
    return res
},(res)=>{
    Message.error(res.error)
})