import axios from "axios";
import {Message} from "@arco-design/web-vue";
import {userStores} from "@/stores/user_store.ts"
export interface baseResponse<T>{
    code:number
    msg:string
    data:T
}

export interface listResponse<T>{
        list:T[]
        count:number
}

export interface paramsType{
    limit?:number
    page?:number
    key?:string
    type?:number
}

export const useAxios =axios.create(
    {
        timeout:6000,
        baseURL: "", //在使用前端代理的情况下，必须留空，不然会跨域
    }
)

useAxios.interceptors.request.use((config)=> {
    const userStore = userStores()
    config.headers.set("token",userStore.userInfo.token)
    return config
})

useAxios.interceptors.response.use((res) =>{
    if (res.status===200){
        return  res.data
    }
    return res
},(res)=>{
    Message.error(res.message)
})

export function defaultDeleteApi(url:string,idList:number[]):Promise<baseResponse<string>>{
    return useAxios.delete(url,{data: {idList}})
}