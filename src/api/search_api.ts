import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index.ts";

export interface articleSearchType {
    "id": number,
    "CreatedAt": string,
    "UpdatedAt": string,
    "title": string,
    "abstract": string,
    "content": string,
    "categoryID": number,
    "tagList": string[],
    "cover": string,
    "userID": number,
    "lookCount": number,
    "diggCount": number,
    "commentCount": number,
    "collectCount": number,
    "openComment": boolean,
    "status": number,
    "adminTop": boolean,
    "categoryTitle": string,
    "userNickname": string,
    "userAvatar": string
}

export interface articleSearchRequest extends paramsType {
    tag?: string,
}

export function articleSearchApi(params: articleSearchRequest): Promise<baseResponse<listResponse<articleSearchType>>> {
    return useAxios.get("/api/search/article", {params})
}

export interface tagListType {
    tag: string,
    articleCount: number,
}

export interface tagListRequest extends paramsType {

}

export function tagListApi(params: tagListRequest): Promise<baseResponse<listResponse<tagListType>>> {
    return useAxios.get("/api/search/tags", {params})
}

export interface textSearchType {
    articleID: number,
    head: string,
    body: string,
    flag: string
}

export function textSearchApi(params: paramsType): Promise<baseResponse<listResponse<textSearchType>>> {
    return useAxios.get("/api/search/text", {params})
}