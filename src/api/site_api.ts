import type {baseResponse} from "@/api/index.ts";
import {useAxios} from "@/api/index.ts";

export interface siteResponse {
    "qiNiu": {
        "enable": boolean
    },
    ai: {
        "enable": boolean
    }
    "siteInfo": {
        "title": string,
        "logo": string,
        "icpBeian": string,
        "policeBeian": string,
        "mode": number
    },
    "project": {
        "title": string,
        "icon": string,
        "webPath": string,
    },
    "seo": {
        "keywords": string,
        "description": string
    },
    "about": {
        "siteDate": string,
        "QQ": string,
        "wechat": string,
        "version": "10.0.1",
        "gitee": string,
        "bilibili": string,
        "gitHub": string
    },
    "login": {
        "qqLogin": boolean,
        "usernamePwdLogin": boolean,
        "emailLogin": boolean,
        "captcha": boolean
    },
    "indexRight": {
        "List": indexRightType[]
    },
    "article": {
        "commentNoExamine": boolean,
        "noExamine": boolean,
        "commentLine": number
    }
}

export interface indexRightType {
    title: string,
    enable: boolean,
}

export interface emailResponse {
    "domain": string,
    "port": number,
    "sendEmail": string,
    "authCode": string,
    "sendNickName": string,
    "ssl": boolean,
    "tls": boolean
}

export interface qqResponse {
    "appID": string,
    "appKey": string,
    "redirect": string
}

export interface qiNiuResponse {
    "enable": boolean,
    "accessKey": string,
    "secretKey": string,
    "bucket": string,
    "uri": string,
    "region": string,
    "prefix": string,
    "size": number,
    "expiry": number
}

export interface aiResponse {
    "enable": boolean,
    "secretKey": string,
    "nickname": string,
    "avatar": string
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

export function siteUpdateApi<T extends siteName>(name: T, data: siteBaseResponse[T]): Promise<baseResponse<string>> {
    return useAxios.put("/api/site/" + name, data)
}

export interface qiniuUploadConfigType {
    "token": string
    "key": string
    "region": string
    "url": string
    "size": number
}

export function qiniuUploadConfigApi(): Promise<baseResponse<qiniuUploadConfigType>> {
    return useAxios.post("/api/images/qiniu")
}