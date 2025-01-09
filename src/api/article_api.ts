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