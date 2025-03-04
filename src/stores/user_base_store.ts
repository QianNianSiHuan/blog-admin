import {defineStore} from 'pinia'
import {userInfoApi, type userInfoType} from "@/api/user_api.ts";
import {Message} from "@arco-design/web-vue";
import {userStores} from "@/stores/user_store.ts";

const userStore = userStores()

interface userBaseType {
    userBase: userInfoType
}


export const userBaseStores = defineStore('userBaseStore', {
    state: (): userBaseType => {
        return {
            userBase: {
                "userID": 0,
                "codeAge": 0,
                "avatar": "",
                "nickname": "",
                "lookCount": 0,
                "articleCount": 0,
                "fansCount": 0,
                "followCount": 0,
                "place": "",
                openCollect: false,
                openFollow: false,
                openFans: false,
                homeStyleID: 0,
            }
        }
    },
    actions: {
        async getUserBaseInfo(id: number) {
            const res = await userInfoApi(id)
            if (res.code) {
                Message.error(res.msg)
                return
            }
            Object.assign(this.userBase, res.data)
        }
    },
    getters: {
        isMe(): boolean {
            return this.userBase.userID === userStore.userInfo.userID
        }
    }
})
