import {type baseResponse, type listResponse, type paramsType, useAxios} from "@/api/index.ts";

export interface categoryListType {
    "id": number,
    "CreatedAt": string,
    "UpdatedAt": string,
    "title": string,
    "abstract": string,
    "cover": string,
    "userID": number,
    "isDefault": boolean,
    "articleCount": number
}

export interface categoryListRequest extends paramsType {
    type: 1 | 2 | 3
    userID: number
}

export function categoryListApi(params: categoryListRequest): Promise<baseResponse<listResponse<categoryListType>>> {
    return useAxios.get("/api/collect", {params})
}


export interface categoryCreateRequest {
    id: number,
    title: string,
}

export function categoryCreateApi(data: categoryCreateRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/collect", data)
}

export function categoryRemoveApi(idList: number[]): Promise<baseResponse<string>> {
    return useAxios.delete("/api/collect", {data: {idList}})
}