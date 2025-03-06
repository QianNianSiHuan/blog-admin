<script lang="ts" setup>
import {nextTick, reactive, ref} from "vue";
import {Message} from "@arco-design/web-vue";
import {userStores} from "@/stores/user_store";
import type {baseResponse} from "@/api";
import {aiSiteInfoApi} from "@/api/site_api.ts";
import {showLogin} from "@/components/web/q_login.ts";
import {theme} from "@/components/common/q_theme.ts";
import {MdPreview} from "md-editor-v3";
import "md-editor-v3/lib/preview.css"
import {useRoute} from "vue-router";

const route = useRoute()
const store = userStores()

interface Props {
  visible: boolean
  type: number //1.文章推荐2.文章分析
}

interface chatResponse {
  isMe: boolean
  nickname: string
  avatar: string
  content: string
}

const chatList = ref<chatResponse[]>([])

const props = defineProps<Props>()
const emits = defineEmits(["update:visible"])

function cancel() {
  chatList.value = []
  emits("update:visible", false)
}

async function send() {
  if (!store.isLogin) {
    Message.warning("请登录")
    showLogin()
    return
  }
  if (key.value.trim() === "") {
    return
  }
  chatList.value.push({
    isMe: true,
    nickname: store.userInfo.nickName,
    avatar: store.userInfo.avatar,
    content: key.value,
  })
  const item = reactive<chatResponse>({
    isMe: false,
    nickname: aiData.nickname,
    avatar: aiData.avatar,
    content: "",
  })
  let articleID = ""
  if (route.name === "articleDetail") {
    articleID = route.params.id as string
  }
  const eventSource = new EventSource(`/api/ai/article?content=${key.value}&token=${store.userInfo.token}&articleID=${articleID}&type=${props.type}`)
  key.value = ""
  eventSource.onmessage = (e) => {
    const message = JSON.parse(e.data) as baseResponse<string>;
    item.content += message.data
  };
  eventSource.onerror = (e) => {
    // console.log(e)
    Message.error("ai调用出错")
    eventSource.close()
    return
  };
  //处理服务器响应报文中的自定义事件
  eventSource.addEventListener("close", function (e) {
    console.log(e)
  });
  chatList.value.push(item)
  key.value = ""
}

const textareaRef = ref()
const aiData = reactive<chatResponse>({
  isMe: false,
  nickname: "",
  avatar: "",
  content: "",
})

async function beforeOpen() {
  if (props.type === 2) {
    return
  }
  chatList.value = []
  aiData.content = ""
  const res = await aiSiteInfoApi()
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(aiData, res.data)
  chatList.value.push(aiData)
  const list = res.data.abstract.split("")
  for (let i = 0; i < list.length; i++) {
    setTimeout(() => {
      aiData.content += list[i]
    }, 40 * i)
  }

  nextTick(() => {
    textareaRef.value.focus()
  })
}

const key = ref("")


</script>

<template>
  <a-modal :footer="false" :visible="props.visible" modal-class="q_ai_modal"
           @cancel="cancel" @before-open="beforeOpen">
    <div class="body scrollbar">
      <div v-for="item in chatList" :class="{isMe: item.isMe}" class="item">
        <a-avatar :image-url="item.avatar"></a-avatar>
        <div v-if="!item.isMe" class="chat">
          <a-spin v-if="item.content===''" :loading="true"></a-spin>
          <MdPreview v-else :codeFoldable="false" :modelValue="item.content"
                     :theme="theme as 'light'|'dark'">
          </MdPreview>
        </div>
        <div v-else class="chat">
          <MdPreview :codeFoldable="false" :modelValue="item.content"
                     :theme="theme as 'light'|'dark'">
          </MdPreview>
        </div>
      </div>
    </div>
    <div class="menu">
      <a-textarea ref="textareaRef" v-model="key" :auto-size="{minRows: 1, maxRows: 4}"
                  placeholder="请输入你感兴趣的内容"
                  @keyup.enter="send"></a-textarea>
      <div class="info">
        <span>按Enter发送，按Ctrl+Enter换行</span>
        <a-button size="mini" type="primary" @click="send">发送</a-button>
      </div>
    </div>
  </a-modal>
</template>
<style lang="less">
.q_ai_modal {
  width: 600px;

  .arco-modal-header {
    display: none;
  }

  .arco-modal-body {
    padding: 0;
  }

  .body {
    min-height: 40vh;
    max-height: 50vh;
    overflow-y: auto;
    padding: 20px;

    .item {
      display: flex;
      margin-bottom: 10px;

      .arco-avatar {
        flex-shrink: 0;
        margin-right: 10px;
      }

      .chat {
        background-color: var(--color-fill-2);
        padding: 10px;
        border-radius: 5px;
        color: var(--color-text-1);
        position: relative;
        max-width: 460px;

        .arco-spin {
          .arco-spin-icon {
            height: 22px;
          }
        }

        .md-editor {
          background-color: var(--color-fill-2);
          color: var(--color-text-1);

          .md-editor-preview-wrapper {
            padding: 0;

            p {
              font-size: 14px;
              margin: 0;
            }
          }
        }

        &::after {
          position: absolute;
          left: -15px;
          top: 10px;
          width: 0;
          height: 0;
          border-width: 8px;
          border-style: solid;
          border-color: transparent;
          border-right-color: var(--color-fill-2);
          content: "";
          display: block;
        }
      }

      &.isMe {
        justify-content: end;
        flex-direction: row-reverse;

        .arco-avatar {
          margin-right: 0;
          margin-left: 10px;
        }

        .chat {
          &::after {
            position: absolute;
            left: inherit;
            right: -15px;
            top: 10px;
            width: 0;
            height: 0;
            border-width: 8px;
            border-style: solid;
            border-color: transparent;
            border-left-color: var(--color-fill-2);
            content: "";
            display: block;
          }
        }
      }
    }

  }

  .menu {
    padding: 10px 20px;
    border-top: @q_border;
    position: relative;

    .info {
      position: absolute;
      right: 30px;
      bottom: 20px;
      z-index: 2;

      > span {
        font-size: 12px;
        margin-right: 10px;
        color: var(--color-text-2);
      }
    }
  }
}
</style>