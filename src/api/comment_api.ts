import type {baseResponse, listResponse, paramsType} from "@/api/index.ts";
import {useAxios} from "@/api/index.ts";

export interface commentListType {
    "id": number,
    "createdAt": string
    "content": string
    "userID": number,
    "userNickname": string
    "userAvatar": string
    "articleID": number
    "articleTitle": string
    "articleCover": string
    "diggCount": number
    "relation"?: 1 | 2 | 3 | 4
    "isMe": boolean
    visible?: boolean
}

export interface commentListRequest extends paramsType {
    type: 1 | 2 | 3
}


export function commentListApi(params: commentListRequest): Promise<baseResponse<listResponse<commentListType>>> {
    return useAxios("/api/comment", {params})
}

export function commentRemoveApi(id: number): Promise<baseResponse<string>> {
    return useAxios.delete("/api/comment/" + id.toString())
}

export interface commentCreateRequest {
    content: string
    articleID: number
    parentID: number
}

export function commentCreateApi(data: commentCreateRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/comment", data)
}