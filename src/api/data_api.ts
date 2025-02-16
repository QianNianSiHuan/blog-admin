import {type baseResponse, type listResponse, useAxios} from "@/api/index.ts";

export interface dataSumType {
    "flowCount": number,
    "userCount": number,
    "articleCount": number,
    "messageCount": number,
    "commentCount": number,
    "newLoginCount": number,
    "newSignCount": number
}


export function dataSumApi(): Promise<baseResponse<listResponse<dataSumType>>> {
    return useAxios.get("/api/data/sum")
}

export interface dataGrowthType {
    "growthRate": number,
    "growthNum": number,
    "countList": number[],
    "dateList": number[],
}


export function dataGrowthApi(type: 1 | 2 | 3): Promise<baseResponse<listResponse<dataGrowthType>>> {
    return useAxios.get("/api/data/growth", {params: {type}})
}


export function dataArticleGrowthApi(): Promise<baseResponse<listResponse<dataGrowthType>>> {
    return useAxios.get("/api/data/article/year")
}

export interface dataComputerType {
    "cpuPercent": number,
    "memPercent": number,
    "diskPercent": number
}


export function dataComputerApi(): Promise<baseResponse<listResponse<dataComputerType>>> {
    return useAxios.get("/api/data/computer")
}