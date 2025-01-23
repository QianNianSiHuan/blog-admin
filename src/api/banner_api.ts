import type {baseResponse, listResponse, paramsType} from "@/api/index.ts";
import {useAxios} from "@/api/index.ts";

export interface bannerListType {
    "id": number
    "CreatedAt": string
    "UpdatedAt": string
    "show": boolean
    "cover": string
    "href": string
    type: 1 | 2
}

export interface bannerListParams extends paramsType {
    type?: 1 | 2
}

export function bannerListApi(params?: bannerListParams): Promise<baseResponse<listResponse<bannerListType>>> {
    return useAxios.get("/api/banner", {params})
}

export interface bannerType {
    "id"?: number
    "show": boolean
    "cover": string
    "href": string
    type?: 1 | 2
}

export function bannerUpdateApi(data: bannerType): Promise<baseResponse<string>> {
    if (data.id) {
        return useAxios.put("/api/banner/" + data.id.toString(), data)
    }
    return useAxios.post("/api/banner", data)
}