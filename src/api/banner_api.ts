import type {baseResponse, listResponse, paramsType} from "@/api/index.ts";
import {useAxios} from "@/api/index.ts";

export interface bannerLIstType {
    "id": number
    "CreatedAt":string
    "UpdatedAt":string
    "show": boolean
    "cover":string
    "href": string
}

export function bannerListApi(params?:paramsType):Promise<baseResponse<listResponse<bannerLIstType>>> {
    return useAxios.get("/api/banner",{params})
}

export interface bannerType{
    "id"?:number
    "show": boolean
    "cover":string
    "href": string
}

export function bannerUpdateApi(data:bannerType):Promise<baseResponse<string>> {
    if (data.id){
        return useAxios.put("/api/banner/"+data.id.toString(),data)
    }
    return useAxios.post("/api/banner",data)
}