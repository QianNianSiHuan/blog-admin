import { defineStore } from 'pinia'
import {userDetailApi, type userDetailType} from "@/api/user_api.ts";
import {Message} from "@arco-design/web-vue";

interface userInfoType{
    userID:number
    userName:string
    nickName:string
    avatar:string
    role:number
    token:string
    "codeAge": number,
    "lookCount": number,
    "articleCount": number,
    "fansCount": number,
    "followCount": number,
    "place": string
}



interface userStoreType{
    userDetail:userDetailType
}


export const userCenterStores = defineStore('userCenterStore', {
    state:(): userStoreType =>{
        return{
            userDetail:{
                "id": 0,
                "createdAt": "",
                "username": "",
                "nickname": "",
                "avatar": "",
                "abstract": "",
                "registerSource": 0,
                "codeAge": 0,
                "role": 0,
                "userID": 0,
                "likeTags": [],
                "updateUsernameTime": "",
                "openCollect": false,
                "openFollow": false,
                "openFans": false,
                "homeStyleID": 0,
                usePassword:false,
                email:"",
            }
        }
    },
    actions:{
        async getUserDetail(){
           const res = await userDetailApi()
            if (res.code){
                Message.error(res.msg)
                return
            }
            Object.assign(this.userDetail,res.data)
        }
    },
    getters:{

    }
})
