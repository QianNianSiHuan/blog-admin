import type {baseResponse, listResponse, paramsType} from "@/api/index.ts";
import {useAxios} from "@/api/index.ts";

export interface articleListType{
    "id": number
    "CreatedAt":string
    "UpdatedAt": string
    "title": string
    "abstract": string
    "content":string
    "categoryTitle"?: string,
    "categoryID"?: number
    "tagList": string[]
    "cover": string
    "userID": number
    "lookCount": number
    "diggCount": number
    "commentCount": number
    "collectCount": number
    "openComment": boolean
    "status": number
    "userTop": boolean
    "adminTop": boolean
    "userNickname": string
    "userAvatar": string
}

export interface articleListRequest extends paramsType{
    type:1|2|3
    userID?:number
    collectID?:number
    status?:number
}

export function articleListApi(params:articleListRequest):Promise<baseResponse<listResponse<articleListRequest>>> {
return useAxios.get("/api/article", {params})
}

export interface articleDetailType{
    "id": number
    "CreatedAt":string
    "UpdatedAt": string
    "title": string
    "abstract": string
    "content":string
    "categoryTitle"?: string,
    "categoryID"?: number
    "tagList": string[]
    "cover": string
    "userID": number
    "lookCount": number
    "diggCount": number
    "commentCount": number
    "collectCount": number
    "openComment": boolean
    "status": number
    "username":string
    "nickname": string
    "userAvatar": string
}

export function articleDetailApi(id:number):Promise<baseResponse<articleDetailType>>{
    return useAxios.get("/api/article/"+id.toString())
}

export interface articleExamineRequest{
    articleID:number
    status:number //3.审核通过 4.不通过
    msg:string //不通过原因
}

export function articleExamineApi(data:articleExamineRequest):Promise<baseResponse<string>>{
    return useAxios.post("/api/article/examine",data)
}



