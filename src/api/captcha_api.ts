import {type baseResponse, useAxios} from "@/api/index.ts";

export interface captchaType {
    "captchaID": string
    "captcha":string
}
export function captchaApi():Promise<baseResponse<string>>{
    return useAxios.get("/api/captcha")
}