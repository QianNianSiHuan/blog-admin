import {type baseResponse, useAxios} from "@/api/index.ts";


export interface aiType {
    title: string,
    abstract: string
    category: string
    tag: string[]
}


export function aiAnalysisApi(content: string): Promise<baseResponse<aiType>> {
    return useAxios.post("/api/ai/analysis", {content})
}