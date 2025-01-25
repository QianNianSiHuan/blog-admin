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
    "isMe"?: boolean
    visible?: boolean
    status: 0 | 1 | 2 | 3
}

export interface commentListRequest extends paramsType {
    type: 1 | 2 | 3
    status?: 0 | 1 | 2 | 3
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
    parentID?: number
}

export function commentCreateApi(data: commentCreateRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/comment", data)
}


export interface commentTreeType {
    "id": number,
    "createdAt": string,
    "content": string,
    "userID": number,
    "userNickname": string,
    "userAvatar": string,
    "articleID": number,
    "parentID": null,
    "diggCount": number,
    "applyCount": number,
    "subComments": commentTreeType[]
    isApply?: boolean
    isDigg: boolean
    applyContent?: string
}

export interface commentTreeRequest extends paramsType {
    id: number
}

export function commentTreeApi(params: commentTreeRequest): Promise<baseResponse<listResponse<commentTreeType>>> {
    return useAxios.get("/api/comment/tree/" + params.id.toString(), {params})
}

export function commentDiggApi(id: number): Promise<baseResponse<string>> {
    return useAxios.get("/api/comment/digg/" + id.toString())
}

export interface commentExamineType {
    commentID: number
    status: 2 | 3
}

export function commentExamineApi(data: commentExamineType): Promise<baseResponse<string>> {
    return useAxios.post("/api/comment/examine", data)

}