import {type baseResponse, type listResponse, type optionsType, type paramsType, useAxios} from "@/api/index.ts";

export interface emailLoginRequest {
    val: string
    password: string
    captchaID: string,
    captchaCode: string
}

export function emailLoginApi(data: emailLoginRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/user/login", data)
}

export interface userInfoType {
    "userID": number,
    "codeAge": number,
    "avatar": string,
    "nickname": string,
    "lookCount": number,
    "articleCount": number,
    "fansCount": number,
    "followCount": number,
    "place": string
    openCollect: boolean,
    openFollow: boolean,
    openFans: boolean,
    homeStyleID: number,
}

export function userInfoApi(userID: number): Promise<baseResponse<userInfoType>> {
    return useAxios.get("/api/user/base", {params: {id: userID}})
}

export function userLogoutApi(): Promise<baseResponse<string>> {
    return useAxios.post("/api/user/logout")
}

export function articleCategoryOptionsApi(params?: paramsType): Promise<baseResponse<optionsType[]>> {
    return useAxios.get("/api/categorys")
}

export interface userArticleTopRequest {
    articleID: number
    type: number
}

export function userArticleTopApi(data: userArticleTopRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/user/article/top", data)
}


export interface userListType {
    "id": number,
    "CreatedAt": string
    "UpdatedAt": string
    "username": string,
    "nickname": string,
    "avatar": string,
    "abstract": string,
    "registerSource": number,
    "email": string,
    "openID": string,
    "role": number,
    "ip": string,
    "addr": string
}

export function userListApi(params: paramsType): Promise<baseResponse<listResponse<userListType>>> {
    return useAxios.get("/api/user/user_list", {params})
}


export interface userUpdateAdminRequest {
    userID: number
    username: string
    nickname: string
    avatar: string
    abstract: string
    role: number
}

export function userUpdateAdminApi(data: userUpdateAdminRequest): Promise<baseResponse<string>> {
    return useAxios.put("/api/user/admin", data)
}

export interface userCreateByAdminRequest {
    username: string
    pwd: string
}

export function userCreateByAdminApi(data: userCreateByAdminRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/user/admin", data)
}

export interface sendEmailType {
    type: 3
    email: string
    captchaID: string
    captchaCode: string
}

export interface sendEmailResponse {
    emailID: string
}

export function sendEmail(data: sendEmailType): Promise<baseResponse<sendEmailResponse>> {
    return useAxios.post("/api/user/send_email", data)
}

export interface emailRegisterType {
    "emailID": string
    "emailCode": string
    "pwd": string
    rePwd: string
}

export function emailRegisterApi(data: emailRegisterType): Promise<baseResponse<string>> {
    return useAxios.post("/api/user/email", data)
}


export interface userDetailType {
    "id": number,
    "createdAt": string,
    "username": string,
    "nickname": string,
    "avatar": string,
    "abstract": string,
    "registerSource": number,
    "codeAge": number,
    "role": number,
    "userID": number,
    "likeTags"?: string[],
    "updateUsernameTime"?: string,
    "openCollect": boolean,
    "openFollow": boolean,
    "openFans": boolean,
    "homeStyleID": number
    "email": string,
    usePassword: boolean,
}

export function userDetailApi(): Promise<baseResponse<userDetailType>> {
    return useAxios.get("/api/user/detail")
}

export interface userDetailUpdateRequest {
    "username"?: string,
    "nickname"?: string,
    "avatar"?: string,
    "abstract"?: string,
    "likeTags"?: string[],
    "openCollect"?: boolean,
    "openFollow"?: boolean,
    "openFans"?: boolean,
    "homeStyleID"?: number
}

export function userDetailUpdateApi(data: userDetailUpdateRequest): Promise<baseResponse<string>> {
    return useAxios.put("/api/user", data)
}

export interface userPwdUpdateType {
    oldPwd: string,
    pwd: string
    rePwd: string
}

export function userPwdUpdateApi(data: userPwdUpdateType): Promise<baseResponse<string>> {
    return useAxios.put("/api/user/password", data)
}

export interface userEmailUpdateType {
    emailID: string
    emailCode: string
}

export function userEmailUpdateApi(data: userEmailUpdateType): Promise<baseResponse<string>> {
    return useAxios.put("/api/user/email/bind", data)
}

export interface loginRecordType {
    "id": number
    "CreatedAt": string
    "UpdatedAt": string
    "userID": number
    "IP": string
    "addr": string
    "ua": string
}

export interface loginRecordRequest extends paramsType {
    type: 1 | 2
}


export function loginRecordApi(params: loginRecordRequest): Promise<baseResponse<string>> {
    return useAxios.get("/api/user/login", {params})
}