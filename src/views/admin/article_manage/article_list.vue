<script lang="ts" setup>
import Q_list, {type columnType} from "@/components/admin/q_list.vue";
import {reactive, ref} from "vue";
import {
  articleDetailApi,
  type articleDetailType,
  articleExamineApi,
  type articleExamineRequest,
  articleListApi,
  type articleListType
} from "@/api/article_api.ts";
import {articleStatusOptions} from "@/options/options.ts";
import {Message} from "@arco-design/web-vue";
import Q_user from "@/components/common/q_user.vue";
import {userArticleTopApi} from "@/api/user_api.ts";
import {theme} from "@/components/common/q_theme.ts";
import {MdPreview} from "md-editor-v3";
import "md-editor-v3/lib/preview.css"

const columns: columnType[] = [
  {title: "ID", dataIndex: 'id'},
  {title: "文章标题", dataIndex: 'title'},
  {title: "发布用户", slotName: 'user'},
  {title: "文章封面", slotName: 'cover'},
  {title: "浏览量", dataIndex: 'lookCount'},
  {title: "评论数", dataIndex: 'commentCount'},
  {title: "点赞", dataIndex: 'diggCount'},
  {title: "收藏", dataIndex: 'collectCount'},
  {title: "是否开启评论", dataIndex: 'openComment', type: "switch"},
  {title: "状态", dataIndex: 'status', type: "options", options: articleStatusOptions},
  {title: "分类", slotName: 'category'},
  {title: "文章置顶", slotName: 'adminTop'},
  {title: "发布时间", dataIndex: 'CreatedAt', type: "date"},
  {title: "最后更新时间", dataIndex: 'updateAt', type: "date", dateFormat: "current"},
  {title: "操作", slotName: 'action'},
]

const fListRef = ref()

const visible = ref(false)

const data = reactive<articleDetailType>({
  "id": 0,
  "CreatedAt": "",
  "UpdatedAt": "",
  "title": "",
  "abstract": "",
  "content": "",
  "tagList": [],
  "cover": "",
  "userID": 0,
  "lookCount": 0,
  "diggCount": 0,
  "commentCount": 0,
  "collectCount": 0,
  "openComment": false,
  "status": 0,
  "username": "",
  "nickname": "",
  "userAvatar": ""
})

async function edit(record: articleListType) {
  if (record.id !== data.id) {
    const res = await articleDetailApi(record.id)
    if (res.code) {
      Message.error(res.msg)
      return
    }
    Object.assign(data, res.data)
  }
  visible.value = true
}


const form = reactive<articleExamineRequest>({
  articleID: 0,
  status: 3,
  msg: "",
})

async function handler() {
  if (data.status != 2) {
    return true
  }
  form.articleID = data.id
  const res = await articleExamineApi(form)
  if (res.code) {
    Message.error(res.msg)
    return false
  }
  Message.success(res.msg)
  fListRef.value.getList()
  return true
}

async function adminArticleTop(record: articleListType) {
  if (record.status !== 3) {
    Message.warning("只能置顶已发布的文章")
    record.adminTop = !record.adminTop
    return
  }
  const res = await userArticleTopApi({articleID: record.id, type: 2})
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}

</script>

<template>
  <div>
    <a-modal v-model:visible="visible" :on-before-ok="handler" modal-class="article_examine_modal" title="文章审核">
      <a-form :model="data" class="article_examine_form">
        <a-form-item label="文章标题">{{ data.title }}</a-form-item>
        <a-form-item label="文章简介">{{ data.abstract }}</a-form-item>
        <a-form-item label="文章用户">
          <q_user :avatar="data.userAvatar" :nickname="data.nickname"></q_user>
        </a-form-item>
        <a-form-item label="文章分类">{{ data.categoryTitle }}</a-form-item>
        <a-form-item label="文章标签">
          <a-tag v-for="tag in data.tagList" color="blue" style="margin-right: 10px">{{ tag }}</a-tag>
        </a-form-item>
        <MdPreview :id="`md_${data.id}`" :model-value="data.content" :theme="theme as 'light'|'dark'"></MdPreview>
        <a-form-item v-if="data.status===2" label="审核">
          <a-radio-group v-model="form.status">
            <a-radio :value="3">审核通过</a-radio>
            <a-radio :value="4">审核不通过</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-if="form.status===4" label="拒绝原因">
          <a-textarea v-model="form.msg" placeholder="拒绝原因"></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
    <q_list ref="fListRef"
            :columns="columns"
            :default-params="{type:3}"
            :url="articleListApi"
            no-add
            @edit="edit"
    >
      <template #cover="{record}:{record:articleListType}">
        <a-image v-if="record.cover" :src="record.cover" height="50px"></a-image>
        <span v-else>-</span>
      </template>
      <template #user="{record}:{record:articleListType}">
        <q_user :avatar="record.userAvatar" :nickname="record.userNickname"></q_user>
      </template>
      <template #category="{record}:{record:articleListType}">
        <span>{{ record.categoryTitle ? record.categoryTitle : "-" }}</span>
      </template>
      <template #adminTop="{record}:{record:articleListType}">
        <a-switch v-model="record.adminTop" @change="adminArticleTop(record)"></a-switch>
      </template>
    </q_list>
  </div>
</template>

<style lang="less">
.article_examine_modal {
  width: 30%;

  .arco-modal-body {
    .arco-form-item-label-col {
      justify-content: center;
    }
  }
}

</style>