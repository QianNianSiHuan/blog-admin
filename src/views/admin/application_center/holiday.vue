<script lang="ts" setup>
import Q_list, {type columnType} from "@/components/admin/q_list.vue";
import {reactive, ref} from "vue";
import {applicationStatusOptions} from "@/options/options.ts";
import Q_user from "@/components/common/q_user.vue";
import "md-editor-v3/lib/preview.css"
import {
  applicationExamineApi,
  type applicationExamineType,
  applicationListApi,
  type applicationListRequest,
  type applicationListType,
} from "@/api/comment_api.ts";
import {Message} from "@arco-design/web-vue";

const columns: columnType[] = [
  {title: "ID", dataIndex: 'id'},
  {title: "发布用户", slotName: 'user', width: 200},
  {title: "申请原因", slotName: 'content', width: 600},
  {title: "状态", dataIndex: 'status', type: "options", options: applicationStatusOptions},
  {title: "创建时间", dataIndex: 'createdAt', type: "date"},
  {title: "操作", slotName: 'action'},
]

const params = reactive<applicationListRequest>({
  type: 1,
  status: 0
})


const fListRef = ref()

const visible = ref(false)

const data = reactive<applicationListType>({
  "id": 0,
  "dormitoryID": 0,
  avatar: "",
  "dormitoryName": "",
  "buildID": 0,
  "buildName": "",
  "userID": 0,
  "username": "",
  "name": "",
  "content": "",
  "type": 0,
  "status": 0
})

function applicationStatusChange() {
  fListRef.value.getList(params)
}

async function applicationExamine(record: applicationListType) {
  form.id = record.id
  form.status = record.status as 1 | 2
  const res = await applicationExamineApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}

const form = reactive<applicationExamineType>({
  id: 0,
  status: 2,
})


</script>

<template>
  <div>
    <q_list ref="fListRef"
            :columns="columns"
            :default-params="params"
            :url="applicationListApi"
            no-add
            no-delete
            no-edit
    >
      <template #search_other>
        <a-radio-group v-model="params.status" @change="applicationStatusChange">
          <a-radio :value="0">待审核</a-radio>
          <a-radio :value="1">已通过</a-radio>
          <a-radio :value="2">未通过</a-radio>
        </a-radio-group>
      </template>
      <template #user="{record}:{record:applicationListType}">
        <q_user :avatar="record.avatar?record.avatar:'/src/assets/image/default_avatar.jpg'"
                :nickname="record.name"></q_user>
      </template>
      <template #content="{record}:{record:applicationListType}">
        <a-typography-text :ellipsis="{
          rows: 4,
        showTooltip: true,
      }">
          {{ record.content }}
        </a-typography-text>
      </template>
      <template #action="{record}:{record:applicationListType}">
        <a-radio-group v-model="record.status"
                       @change="applicationExamineApi({id:record.id,status:record.status as 1|2})">
          <a-radio :value="1">PASS</a-radio>
          <a-radio :value="2">FAIL</a-radio>
        </a-radio-group>
      </template>
    </q_list>
  </div>
</template>

<style lang="less">
</style>