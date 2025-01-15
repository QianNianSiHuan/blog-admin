import {createApp, defineComponent, h, type Ref, ref} from "vue";
const visible:Ref = ref<boolean|undefined>(undefined)
import Q_update_email from "./q_update_email.vue";
export function showUpdateEmail() {
    if (visible.value === undefined){
        // 生成虚拟dom
        const component = defineComponent({
            render: ()=>h(Q_update_email, {
                visible: visible.value,
                "onUpdate:visible": ()=>{
                    visible.value = false
                },
                onDestruction(){
                    // 销毁组件
                    app.unmount()
                    document.getElementById("email_100")?.remove()
                    visible.value = undefined
                }
            })
        })
        // 生成app
        const app = createApp(component)

        // 挂载到真实dom上
        const div = document.createElement("div")
        div.id = "email_100"
        app.mount(div)
        document.body.append(div)
    }

    visible.value = true
}