import {type baseResponse, type paramsType, useAxios} from "@/api/index.ts";

export interface logListType{
    "id": number
    "CreatedAt": string
    "UpdatedAt": string
    "logType": number
    "title": string
    "content": string
    "level":number
    "userID": number
    "method":string
    "ip": string
    "addr": string
    "isRead": boolean,
    "loginStatus": boolean,
    "username": string
    "pwd": string
    "loginType": number
    "serviceName": string
    "userNickName": string
    "userAvatar": string
}

export interface logListParams extends paramsType{
    logType:1|2|3
}

export function logListApi(params:logListParams){
return useAxios.get("/api/logs",{params})
}
export function logReadApi(id:number):Promise<baseResponse<string>>{
    return useAxios.get("/api/logs/"+id.toString())
}