import type {optionsType} from "@/api";

export interface optionsColorType extends optionsType{
    color?:string
}

export const articleStatusOptions:optionsColorType[] = [
    {label:"草稿",value:1,color:"green"},
    {label:"审核中",value:2,color:"yellow"},
    {label:"已发布",value:3,color:"blue"},
    {label:"已拒绝",value:4,color:"red"},
]

export const roleOptions:optionsColorType[]=[
    {label:"管理员",value:1,color:"blue"},
    {label:"用户",value:2,color:"green"},
    {label:"访客",value:3,color:"yellow"},
]

export const logLevelOptions:optionsColorType[]=[
    {label:"info",value:1,color:"blue"},
    {label:"warn",value:2,color:"yellow"},
    {label:"error",value:3,color:"red"},
]