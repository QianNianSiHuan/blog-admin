import {defineStore} from 'pinia'
import {userInfoApi, userLogoutApi} from "@/api/user_api.ts";
import {Message} from "@arco-design/web-vue";
import {parseToken} from "@/utils/parse_token.ts";
import router from '@/router';
import {siteApi, type siteResponse} from "@/api/site_api.ts";

interface userInfoType {
    userID: number
    userName: string
    nickName: string
    avatar: string
    role: number
    token: string
    "codeAge": number,
    "lookCount": number,
    "articleCount": number,
    "fansCount": number,
    "followCount": number,
    "place": string
}


interface userStoreType {
    userInfo: userInfoType
    siteInfo: siteResponse
}


export const userStores = defineStore('userStore', {
    state: (): userStoreType => {
        return {
            userInfo: {
                userID: 0,
                userName: "",
                nickName: "",
                avatar: "",
                role: 0,
                token: "",
                codeAge: 0,
                lookCount: 0,
                articleCount: 0,
                fansCount: 0,
                followCount: 0,
                place: "",
            },
            siteInfo: {
                ai: {
                    enable: false
                },
                qiNiu: {
                    enable: false
                },
                siteInfo: {
                    title: "",
                    logo: "",
                    beian: "",
                    mode: 1
                },
                project: {
                    title: "",
                    icon: "",
                    webPath: ""
                },
                seo: {
                    keywords: "",
                    description: ""
                },
                about: {
                    siteDate: "",
                    QQ: "",
                    wechat: "",
                    version: "10.0.1",
                    gitee: "",
                    bilibili: "",
                    gitHub: ""
                },
                login: {
                    qqLogin: false,
                    usernamePwdLogin: true,
                    emailLogin: false,
                    captcha: false
                },
                indexRight: {
                    List: []
                },
                article: {
                    noExamine: false,
                    commentLine: 3
                }
            }
        }
    },
    actions: {
        saveUserInfo(token: string) {
            //传token，然后调用户信息
            this.userInfo.token = token
            const payload = parseToken(token)
            this.userInfo.userID = payload.user_id
            this.userInfo.role = payload.role

            userInfoApi(payload.user_id).then(res => {
                    if (res.code) {
                        Message.error(res.msg)
                        return
                    }
                    this.userInfo = {
                        userID: res.data.userID,
                        userName: res.data.nickname,
                        nickName: res.data.nickname,
                        avatar: res.data.avatar,
                        role: payload.role,
                        token: token,
                        codeAge: res.data.codeAge,
                        lookCount: res.data.lookCount,
                        articleCount: res.data.articleCount,
                        fansCount: res.data.fansCount,
                        followCount: res.data.followCount,
                        place: res.data.place
                    }
                    //持久化
                    localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
                }
            )

        },
        loadUserInfo() {
            const val = localStorage.getItem("userInfo")
            if (!val) {
                return
            }
            try {
                this.userInfo = JSON.parse(val)
            } catch (e) {
                console.log(e)
                return;
            }
            const payload = parseToken(this.userInfo.token)
            const nowTime = new Date().getTime()
            if (payload.exp * 1000 - nowTime < 0) {
                Message.warning("登录过期,请重新登录")
                localStorage.removeItem("userInfo")
                router.push({
                    name: "login"
                })
                return;
            }
        },
        async userLogout() {
            const res = await userLogoutApi()
            localStorage.removeItem("userInfo")
            this.userInfo = {
                userID: 0,
                userName: "",
                nickName: "",
                avatar: "",
                role: 0,
                token: "",
                codeAge: 0,
                lookCount: 0,
                articleCount: 0,
                fansCount: 0,
                followCount: 0,
                place: ""
            }
            router.push({
                name: "web"
            })
        },
        async loadSiteInfo() {
            const res = await siteApi("site")
            if (res.code) {
                Message.error(res.msg)
                return
            }
            Object.assign(this.siteInfo, res.data)
        }
    },
    getters: {
        isLogin(): boolean {
            return this.userInfo.userID != 0
        },
        isAdmin(): boolean {
            return this.userInfo.role == 1
        }
    }
})
