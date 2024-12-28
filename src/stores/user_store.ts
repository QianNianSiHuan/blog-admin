import { defineStore } from 'pinia'
import {userInfoApi, userLogoutApi} from "@/api/user_api.ts";
import {Message} from "@arco-design/web-vue";
import {parseToken} from "@/utils/parse_token.ts";
import router from '@/router';

interface userInfoType{
  userID:number
  userName:string
  nickName:string
  avatar:string
  role:number
  token:string
}



interface userStoreType{
  userInfo:userInfoType
}


export const userStores = defineStore('userStore', {
  state:(): userStoreType =>{
    return{
      userInfo:{
        userID:0,
        userName:"",
        nickName:"",
        avatar:"",
        role:0,
        token:"",
      }
    }
  },
  actions:{
     saveUserInfo(token:string){
      //传token，然后调用户信息
      this.userInfo.token= token
      const payload = parseToken(token)
      this.userInfo.userID = payload.userID
      this.userInfo.role =payload.role

      userInfoApi().then(res =>{
        if(res.code){
          Message.error(res.msg)
          return
        }
        this.userInfo={
          userID:res.data.userID,
          userName:res.data.username,
          nickName:res.data.nickname,
          avatar:res.data.avatar,
          role:res.data.role,
          token: token
        }
        //持久化
        localStorage.setItem("userInfo",JSON.stringify(this.userInfo))
          }
      )

    },
    loadUserInfo() {
      const val = localStorage.getItem("userInfo")
      if (!val) {

        return
      }
      try {
        this.userInfo = JSON.parse(val)
      } catch (e) {
        console.log(e)
        return;
      }
      const payload = parseToken(this.userInfo.token)
      const nowTime = new Date().getTime()
      console.log(payload.exp * 1000)
      console.log(nowTime)
      if(payload.exp * 1000-nowTime<0){
        Message.warning("登录过期,请重新登录")
        localStorage.removeItem("userInfo")
        router.push({
          name:"login"
        })
        return;
      }
    },
    async userLogout(){
      const res =await userLogoutApi()
      localStorage.removeItem("userInfo")
      this.userInfo={
          userID:0,
          userName:"",
          nickName:"",
          avatar:"",
          role:0,
          token:"",
      }
      router.push({
        name:"web"
      })
    }
  },
  getters:{
    isLogin():boolean{
      return this.userInfo.userID !=0
    },
    isAdmin():boolean{
      return this.userInfo.role ==1
    }
  }
})
