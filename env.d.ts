/// <reference types="vite/client" />
export interface EnvMeta extends  Record<string, string>{
    VITE_SERVER_URL: string
}

export interface ImportMetaEnv {
    VITE_SERVER_URL: string
}
declare module "vue-router"{
    interface RouteMeta {
        title:string
        role?:number[]
    }
}