<script setup lang="ts">
import Q_list from "@/components/admin/q_list.vue";
import {createApp, h, nextTick, reactive, ref} from "vue";
import {logListApi, type logListParams, type logListType, logReadApi} from "@/api/log_api.ts";
import Q_user from "@/components/common/q_user.vue";
import {logLevelOptions} from "@/options/options.ts";
import {Message} from "@arco-design/web-vue";
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import {theme} from "@/components/common/q_theme.ts";

const params =reactive<logListParams>({
  logType:2,
})


const columnsDict = reactive({
      1: [
        {title: "ID", dataIndex: 'id'},
        {title: "地址", slotName: 'addr'},
        {title: "用户名", dataIndex: 'username'},
        {title: "状态", slotName: 'loginStatus'},
        {title: "标题", dataIndex: 'title'},
        {title: "时间", dataIndex: 'createdAt', type: "date"},
        {title: "操作", slotName: 'action'},
      ],
      2: [
        {title: "ID", dataIndex: 'id'},
        {title: "地址", slotName: 'addr'},
        {title: "用户", slotName: 'user'},
        {title: "方法", slotName: 'method'},
        {title: "等级", dataIndex: 'level', type:"options",options:logLevelOptions},
        {title: "标题", slotName: 'title'},
        {title: "时间", dataIndex: 'createdAt', type: "date"},
        {title: "操作", slotName: 'action'},
      ],
      3: [
        {title: "ID", dataIndex: 'id'},
        {title: "服务", dataIndex: 'serviceName'},
        {title: "标题", slotName: 'title'},
        {title: "等级", dataIndex: 'level', },
        {title: "时间", dataIndex: 'createdAt', type: "date"},
        {title: "操作", slotName: 'action'},
      ]
}
)



const fListRef =ref()

const visible = ref(false)


function edit(record:logListType) {
  visible.value=true
}

function logTypeChange(){
  fListRef.value.getList(params)
}

const content =ref("")

async function logRead(record:logListType){
if(!record.isRead){
  const res =await logReadApi(record.id)
  if (res.code){
    Message.error(res.msg)
    return
  }
  record.isRead = true
}
  content.value =record.content
  visible.value=true
  await nextTick(()=>{
    const dom =document.querySelector(".log_modal_body")
    if(dom){
      dom.classList.add("scrollbar")
    }
    jsonParse()
  })
}

function jsonParse() {
  const jsonList = document.querySelectorAll(".log_json_body")
  jsonList.forEach(value => {
    const jsonData = (value as HTMLPreElement).innerText
    const data = JSON.parse(jsonData)
    // 生成虚拟dom
    const vNode = h(VueJsonPretty, {data: data, deep:1 ,theme:theme.value})
    // 创建app
    const app = createApp({
      render: ()=>vNode
    })
    // 挂载app
    app.mount(value)
  })
}
</script>

<template>
  <div class="log_list_view">
    <a-modal v-model:visible="visible" width="35%" title="日志详情" body-class="log_modal_body" :footer="false">
      <div class="log_body" :class="`log_type_${params.logType}`" v-html="content"></div>
    </a-modal>

    <q_list ref="fListRef"
            :url="logListApi"
            no-add
            :default-params="params"
            :columns="columnsDict[params.logType]"
            @edit="edit"
    >
      <template #search_other>
        <a-radio-group v-model="params.logType" @change="logTypeChange">
          <a-radio :value="1">登录日志</a-radio>
          <a-radio :value="2">操作日志</a-radio>
          <a-radio :value="3">运行日志</a-radio>
        </a-radio-group>
      </template>
      <template #addr="{record}:{record:logListType}">
        {{record.ip}}({{record.addr}})
      </template>
      <template #user="{record}:{record:logListType}">
        <q_user v-if="record.userID" :avatar="record.userAvatar" :nickname="record.userNickName"></q_user>
        <div v-else>-</div>
      </template>
      <template #loginStatus="{record}:{record:logListType}">
        <a-tag v-if="record.loginStatus" color="blue">登陆成功</a-tag>
        <a-tag v-else color="red">登录失败</a-tag>
      </template>
      <template #title="{record}:{record:logListType}">
        <a href="javascript:void 0" @click="logRead(record)" :class="{is_read:record.isRead}">{{record.title}}</a>
      </template>
      <template #method="{record}:{record:logListType}">
        <a-tag v-if="record.method === 'GET'" color="blue">{{ record.method }}</a-tag>
        <a-tag v-else-if="record.method==='POST'" color="orange">{{ record.method }}</a-tag>
        <a-tag v-else-if="record.method==='PUT'" color="yellow">{{ record.method }}</a-tag>
        <a-tag v-else color="red">{{ record.method }}</a-tag>
      </template>
    </q_list>
  </div>
</template>

<style lang="less">
.log_list_view {
  .is_read {
    color: var(--color-text-2);
  }
}

.text_color(@text,@color:rgb(var(--arcoblue-6))){
&::after {
  content: @text;
  display: block;
  position: absolute;
  right: 5px;
  top: 5px;
  color: @color;
  font-size: 12px;
}
}

.log_modal_body {
  padding: 10px;
  max-height: 60vh;
  overflow-y: auto;

  .log_body {
    > div {
      padding: 20px;
      border-radius: 5px;
      background: var(--color-fill-2);
      margin-bottom: 10px;
      position: relative;
    }

    .log_item {
      display: flex;

      .log_item_label {
        font-weight: 600;
        margin-right: 10px;
      }
    }

    .log_request_header{
      .text_color("请求头")
    }
    .log_request{
      .text_color("请求")
    }
    .log_response{
      .text_color("响应")
    }
    .log_response_header{
      .text_color("响应头")
    }

  }
  .log_type_2 {
    > div {
      padding: 20px;
      border-radius: 5px;
      background: var(--color-fill-2);
      margin-bottom: 10px;
      position: relative;
    }

    .log_item {
      display: flex;

      .log_item_label {
        font-weight: 600;
        margin-right: 10px;
      }

      &.info {
        .text_color("info");
      }

      &.warn {
        .text_color("warn", rgb(var(--orange-6)));
      }

      &.error {
        .text_color("error", rgb(var(--red-6)));
      }

      &.link {
        .text_color("链接");
      }

    }

    .log_image {
      .text_color("图片");

      img {
        width: 60%;
        object-fit: cover;
      }
    }

    .log_request_header {
      .text_color("请求头");
    }

    .log_request {
      .text_color("请求");

      .log_request_head {
        margin-bottom: 5px;

        .log_request_method {
          font-weight: 600;
          margin-right: 5px;
        }
      }
    }

    .log_error {
      .line {
        display: flex;

        .label {
          font-weight: 600;
          margin-right: 10px;
        }

        .type {
          position: absolute;
          right: 5px;
          top: 5px;
          color: rgb(var(--red-6));
          font-size: 12px;
        }
      }

      .stack {
        font-size: 12px;
        color: var(--color-text-2);
      }
    }

    .log_response {
      .text_color("响应");
    }

    .log_response_header {
      .text_color("响应头");
    }

    .log_json_body {
      //white-space: break-spaces;
      //word-break: break-all;

      .vjs-value-string {
        white-space: break-spaces;
        word-break: break-all;
      }
    }
  }

  .log_type_3 {
    color: var(--color-text-2);

    .log_item {
      display: flex;

      &.warn {
        color: rgb(var(--orange-6));
      }

      &.error {
        color: rgb(var(--red-6));
      }

      .log_item_label {
        font-weight: 600;
        margin-right: 5px;
      }
    }

    .log_time {
      text-align: center;
      font-size: 12px;
      margin-bottom: 20px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &::before {
        content: "";
        display: block;
        width: 40%;
        height: 1px;
        background: var(--color-fill-2);
      }

      &::after {
        content: "";
        display: block;
        width: 40%;
        height: 1px;
        background: var(--color-fill-2);
      }
    }
  }
}


</style>