import Q_login_modal from "@/components/web/q_login_modal.vue";
import {createApp, defineComponent, h, ref} from "vue";

const visible = ref<boolean | undefined>(undefined)

interface options {
    to?: string
    reload?: boolean//是否刷新页面
}

export function showLogin(options?: options) {
    if (visible.value === undefined) {
        // 生成虚拟dom
        visible.value = true
        const component = defineComponent({
            render: () => h(Q_login_modal, {
                visible: visible.value as boolean,
                to: options?.to,
                reload: options?.reload,
                "onUpdate:visible": () => {
                    visible.value = false
                },
                onDestruction() {
                    // 销毁组件
                    app.unmount()
                    document.getElementById("login_100")?.remove()
                    visible.value = undefined
                }
            })
        })
        // 生成app
        const app = createApp(component)

        // 挂载到真实dom上
        const div = document.createElement("div")
        div.id = "login_100"
        app.mount(div)

        document.body.append(div)
    }

    visible.value = true
}