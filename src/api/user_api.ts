import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index.ts";

export interface emailLoginRequest {
    val:string
    password:string
}
export  function emailLoginApi(data:emailLoginRequest):Promise<baseResponse<string>>{
    return   useAxios.post("api/user/login",data)
}
export interface userInfoType{
    "userID": number,
    "createdAt": string,
    "username": string,
    "nickname": string,
    "avatar": string,
    "abstract": string,
    "registerSource": number,
    "codeAge": number,
    "role": 1,
    "likeTags": string[],
    "updateUsernameTime": string,
    "openCollect": boolean,
    "openFollow": boolean,
    "openFans": boolean,
    "homeStyleID": number
}
export function userInfoApi():Promise<baseResponse<userInfoType>>{
return useAxios.get("/api/user/detail")
}
export function userLogoutApi():Promise<baseResponse<string>> {
    return useAxios.post("/api/user/logout")
}

export interface userListType{
    "id": number,
    "CreatedAt": string,
    "UpdatedAt": string,
    "userID": number,
    "IP": string,
    "addr": string,
    "ua":string,
    "userNickname": string,
    "userAvatar": string
}
export function  userListApi(params?:paramsType):Promise<baseResponse<listResponse<userListType>>>{
    return useAxios.get("/api/user/login",{params})
}