<script lang="ts" setup>
import Q_list, {type columnType} from "@/components/admin/q_list.vue";
import {reactive, ref} from "vue";
import {commentStatusOptions} from "@/options/options.ts";
import Q_user from "@/components/common/q_user.vue";
import "md-editor-v3/lib/preview.css"
import {
  commentExamineApi,
  type commentExamineType,
  commentListApi,
  type commentListRequest,
  type commentListType
} from "@/api/comment_api.ts";
import {Message} from "@arco-design/web-vue";

const columns: columnType[] = [
  {title: "ID", dataIndex: 'id'},
  {title: "发布用户", slotName: 'user', width: 200},
  {title: "评论内容", slotName: 'content', width: 600},
  {title: "状态", dataIndex: 'status', type: "options", options: commentStatusOptions},
  {title: "创建时间", dataIndex: 'createdAt', type: "date"},
  {title: "操作", slotName: 'action'},
]

const params = reactive<commentListRequest>({
  type: 3,
  status: 0
})


const fListRef = ref()

const visible = ref(false)

const data = reactive<commentListType>({
  "id": 0,
  "createdAt": "",
  "content": "",
  "userID": 0,
  "userNickname": "",
  "userAvatar": "",
  "articleID": 0,
  "articleTitle": "",
  "articleCover": "",
  "diggCount": 0,
  "relation": 1,
  "isMe": false,
  visible: false,
  status: 1,
})

function commentStatusChange() {
  fListRef.value.getList(params)
}

async function commentExamine(record: commentListType) {
  form.commentID = record.id
  form.status = record.status as 2 | 3
  const res = await commentExamineApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}


const form = reactive<commentExamineType>({
  commentID: 0,
  status: 2,
})


</script>

<template>
  <div>
    <q_list ref="fListRef"
            :columns="columns"
            :default-params="params"
            :url="commentListApi"
            no-add
            no-delete
            no-edit
    >
      <template #search_other>
        <a-radio-group v-model="params.status" @change="commentStatusChange">
          <a-radio :value="0">全部</a-radio>
          <a-radio :value="1">待审核</a-radio>
          <a-radio :value="2">已发布</a-radio>
          <a-radio :value="3">未通过</a-radio>
        </a-radio-group>
      </template>
      <template #user="{record}:{record:commentListType}">
        <q_user :avatar="record.userAvatar" :nickname="record.userNickname"></q_user>
      </template>
      <template #content="{record}:{record:commentListType}">
        <a-typography-text :ellipsis="{
          rows: 4,
        showTooltip: true,
      }">
          {{ record.content }}
        </a-typography-text>
      </template>
      <template #action="{record}:{record:commentListType}">
        <a-radio-group v-model="record.status" @change="commentExamine(record)">
          <a-radio :value="2">PASS</a-radio>
          <a-radio :value="3">FAIL</a-radio>
        </a-radio-group>
      </template>
    </q_list>
  </div>
</template>

<style lang="less">
</style>