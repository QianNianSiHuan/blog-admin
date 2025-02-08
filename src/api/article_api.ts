import type {baseResponse, listResponse, optionsType, paramsType} from "@/api/index.ts";
import {useAxios} from "@/api/index.ts";

export interface articleListType {
    "id": number
    "CreatedAt": string
    "UpdatedAt": string
    "title": string
    "abstract": string
    "content": string
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

export interface articleListRequest extends paramsType {
    type: 1 | 2 | 3
    userID?: number
    collectID?: number
    status?: number
    categoryID?: number
}

export function articleListApi(params: articleListRequest): Promise<baseResponse<listResponse<articleListType>>> {
    return useAxios.get("/api/article", {params})
}

export interface articleDetailType {
    "id": number
    "CreatedAt": string
    "UpdatedAt": string
    "title": string
    "abstract": string
    "content": string
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
    "username": string
    "nickname": string
    "userAvatar": string
    "isDigg"?: boolean
    "isCollect"?: boolean
}

export function articleDetailApi(id: number): Promise<baseResponse<articleDetailType>> {
    return useAxios.get("/api/article/" + id.toString())
}

export interface articleExamineRequest {
    articleID: number
    status: number //3.审核通过 4.不通过
    msg: string //不通过原因
}

export function articleExamineApi(data: articleExamineRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/article/examine", data)
}

export interface articleHistoryListType {
    id: number,
    lookDate: string,
    title: string,
    cover: string
    nickname: string
    avatar: string
    userID: number
    articleID: number
}

export interface articleHistoryListRequest extends paramsType {
    type: 1 | 2
}

export function articleHistoryListApi(params: articleHistoryListRequest): Promise<baseResponse<listResponse<articleHistoryListType>>> {
    return useAxios.get("/api/article/history", {params})
}

export function articleHistoryRemoveApi(idList: number[]): Promise<baseResponse<string>> {
    return useAxios.delete("/api/article/history", {data: {idList}})
}

export interface articleAddType {
    title: string
    status: 1 | 2
    content: string
    abstract: string
    categoryID?: number
    cover: string
    tagList: string[]
    openComment: boolean
}

export function articleAddApi(data: articleAddType): Promise<baseResponse<string>> {
    return useAxios.post("/api/article", data)
}


export function articleCategoryOptionsApi(): Promise<baseResponse<optionsType[]>> {
    return useAxios.get("/api/category/options")
}

export function articleTagOptionsApi(): Promise<baseResponse<optionsType[]>> {
    return useAxios.get("/api/article/tag/options")
}


export interface articleEditType extends articleAddType {
    id: number
}


export function articleUpdateApi(data: articleEditType): Promise<baseResponse<string>> {
    return useAxios.put("/api/article", data)
}

export function articleRemoveApi(id: number): Promise<baseResponse<string>> {
    return useAxios.delete("/api/article/" + id.toString())
}


export function articleDiggApi(id: number): Promise<baseResponse<string>> {
    return useAxios.get("/api/article/digg/" + id.toString())
}

export interface articleCollectRequest {
    articleID: number
    collectID?: number
}

export function articleCollectApi(data: articleCollectRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/article/collect", data)
}


export function articleLookApi(articleID: number): Promise<baseResponse<string>> {
    return useAxios.post("/api/article/history", {articleID: articleID})
}

export interface authRecommendListType {
    userID: number
    userNickname: string
    userAvatar: string
    userAbstract: string
}


export function authRecommendListApi(params: paramsType): Promise<baseResponse<listResponse<authRecommendListType>>> {
    return useAxios.get("/api/article/auth_recommend", {params})
}

export interface articleRecommendListType {
    "id": number,
    "title": string,
    "lookCount": number
}

export function articleRecommendListApi(params: paramsType): Promise<baseResponse<listResponse<articleRecommendListType>>> {
    return useAxios.get("/api/article/article_recommend", {params})
}