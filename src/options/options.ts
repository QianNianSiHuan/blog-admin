import type {optionsType} from "@/api";

export interface optionsColorType extends optionsType {
    color?: string
}

export const articleStatusOptions: optionsColorType[] = [
    {label: "草稿", value: 1, color: "green"},
    {label: "审核中", value: 2, color: "yellow"},
    {label: "已发布", value: 3, color: "blue"},
    {label: "已拒绝", value: 4, color: "red"},
]

export const commentStatusOptions: optionsColorType[] = [
    {label: "待审核", value: 1, color: "green"},
    {label: "已发布", value: 2, color: "blue"},
    {label: "未通过", value: 3, color: "red"},
]


export const roleOptions: optionsColorType[] = [
    {label: "管理员", value: 1, color: "blue"},
    {label: "用户", value: 2, color: "green"},
    {label: "访客", value: 3, color: "yellow"},
]

export const logLevelOptions: optionsColorType[] = [
    {label: "info", value: 1, color: "blue"},
    {label: "warn", value: 2, color: "yellow"},
    {label: "error", value: 3, color: "red"},
]

export const registerSourceOptions: optionsColorType[] = [
    {label: "邮箱注册", value: 1, color: "#7FFFD4"},
    {label: "QQ注册", value: 2, color: "#FFFAFA"},
    {label: "命令行注册", value: 3, color: "#87CEEB"},
    {label: "管理员注册", value: 3, color: "#BEBEBE"},
]

export const relationOptions: optionsColorType[] = [
    {label: "陌生人", value: 1, color: "#7FFFD4"},
    {label: "已关注", value: 2, color: "#FFFAFA"},
    {label: "粉丝", value: 3, color: "#87CEEB"},
    {label: "好友", value: 3, color: "#BEBEBE"},
]