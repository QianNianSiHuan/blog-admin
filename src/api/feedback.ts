import {type baseResponse, useAxios} from "@/api/index.ts";

export interface feedbackCreateType {
    email: string
    content: string
}

export function feedbackCreateApi(data: feedbackCreateType): Promise<baseResponse<string>> {
    return useAxios.post("/api/feedback/", data)
}