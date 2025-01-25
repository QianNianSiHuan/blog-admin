import {createApp} from 'vue'
import {createPinia} from 'pinia'
import "@/assets/base.css"
import App from './App.vue'
import router from './router'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import "@/assets/public.less";
import "nprogress/nprogress.css";
import "@/assets/iconfont.css"
import {apiMock} from "@/mocks";

const app = createApp(App)

apiMock()
app.use(createPinia())
app.use(router)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.mount('#app')

function initVersion() {
    const gitInfo = import.meta.env.VITE_GIT_INFO;
    const gitInfoObj = gitInfo && JSON.parse(gitInfo);

    if (document.visibilityState === 'hidden') return;

    fetch(`/versionInfo.json?v=${Date.now()}`)
        .then(res => res.json())
        .then(data => {
            if (data.version !== gitInfoObj.version) {
                location.reload();
            }
        });
}

initVersion()