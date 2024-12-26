import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import {loadEnv} from "vite";
import {EnvMeta} from "./env";

const envDir:string ="./"//env文件的目录
// https://vite.dev/config/
export default defineConfig((config)=>{
  const env =  loadEnv(config.mode,envDir) as  EnvMeta
    return{
        plugins: [
            vue(),
            vueDevTools(),
        ],
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        //'primary-6': "red",
                    },
                    additionalData: '@import "@/assets/var.less";',
                    javascriptEnabled: true,
                }
            }
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
        },
        envDir: envDir,
        server: {
            host: "0.0.0.0",
            port: 80,
            proxy:{
                "/api":{
                    target:env.VITE_SERVER_URL
                }
            }
        }
    }
})
