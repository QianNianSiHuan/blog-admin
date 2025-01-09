import type {baseResponse} from "@/api/index.ts";
import {useAxios} from "@/api/index.ts";

export interface siteResponse {

}
export interface emailResponse {

}

export interface qqResponse {

}

export interface qiNiuResponse {

}

export interface aiResponse {

}

interface siteBaseResponse {
    site: siteResponse
    email: emailResponse
    qq: qqResponse
    qiNiu: qiNiuResponse
    ai: aiResponse
}


export type siteName = "site" | "email" | "qq" | "qiNiu" | "ai"


export function siteApi<T extends siteName>(name: T): Promise<baseResponse<siteBaseResponse[T]>> {
    return useAxios.get("/api/site/" + name)
}

export function siteUpdateApi<T extends siteName>(name: T, data: siteBaseResponse[T]):Promise<baseResponse<string>>{
    return useAxios.put("/api/site/" + name, data)
}