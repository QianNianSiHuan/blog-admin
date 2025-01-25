import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index.ts";

export interface collectListType {
    "id": number,
    "CreatedAt": string,
    "UpdatedAt": string,
    "title": string,
    "abstract": string,
    "cover": string,
    "userID": number,
    "isDefault": boolean,
    "articleCount": number
    "articleUse": boolean
}

export interface collectListRequest extends paramsType {
    type: 1 | 2 | 3
    userID?: number,
    ArticleID?: number,
}


export function collectListApi(params: collectListRequest): Promise<baseResponse<listResponse<collectListType>>> {
    return useAxios.get("/api/collect", {params})
}


export interface collectCreatRequest {
    id: number,
    title: string,
    abstract: string,
}

export function collectCreatApi(data: collectCreatRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/collect", data)
}

export function collectRemoveApi(idList: number[]): Promise<baseResponse<string>> {
    return useAxios.delete("/api/collect", {data: {idList}})
}

export function collectArticleRemoveApi(idList: number[]): Promise<baseResponse<string>> {
    return useAxios.delete("/api/article/collect", {data: {idList}})
}