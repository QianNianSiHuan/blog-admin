import {type baseResponse, type listResponse, type optionsType, type paramsType, useAxios} from "@/api/index.ts";

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

export function articleCategoryOptionsApi(params?:paramsType):Promise<baseResponse<optionsType[]>>{
    return useAxios.get("/api/categorys")
}

export  interface userArticleTopRequest{
    articleID: number
    type:number
}
export function userArticleTopApi(data:userArticleTopRequest):Promise<baseResponse<string>>{
    return useAxios.post("/api/user/article/top",data)
}


export interface userListType{
    "id": number,
    "CreatedAt": string
    "UpdatedAt": string
    "username": string,
    "nickname": string,
    "avatar": string,
    "abstract": string,
    "registerSource": number,
    "email": string,
    "openID": string,
    "role": number,
    "ip": string,
    "addr": string
}
export function userListApi(params:paramsType):Promise<baseResponse<listResponse<userListType>>>{
    return useAxios.get("/api/user/user_list",{params})
}


export interface userUpdateAdminRequest{
    userID:number
    username:string
    nickname:string
    avatar:string
    abstract:string
    role:number
}

export function userUpdateAdminApi(data:userUpdateAdminRequest):Promise<baseResponse<string>> {
    return useAxios.put("/api/user/admin",data)
}