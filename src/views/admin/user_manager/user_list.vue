<script setup lang="ts">

import Q_list, {type filterGroupType} from "@/components/admin/q_list.vue";
import {
  articleCategoryOptionsApi,
  userListApi,
  type userListType, userUpdateAdminApi,
  type userUpdateAdminRequest
} from "@/api/user_api.ts";
import type {columnType} from "@/components/admin/q_list.vue";
import {reactive, ref} from "vue";
import Q_user from "@/components/common/q_user.vue";
import Q_image_upload from "@/components/common/q_image_upload.vue";
import {Message} from "@arco-design/web-vue";
import {roleOptions} from "@/options/options.ts";
const columns:columnType[] =[
  {title:"ID",dataIndex:"id"},
  {title:"头像",slotName:"avatar"},
  {title:"用户名",dataIndex:"username"},
  {title:"角色",dataIndex:"role",type:"options",options:roleOptions},
  {title:"发文数",dataIndex:"action",},
  {title:"地址",slotName:"addr",},
  {title:"注册时间",dataIndex:"CreatedAt",type:"date"},
  {title:"操作",slotName:"action",},
]

const fListRef =ref()
const visible = ref(false)
const form = reactive<userUpdateAdminRequest>({
  userID:0,
  username:"",
  nickname:"",
  avatar:"",
  abstract:"",
  role:0,
})
function edit(record:userListType){
  form.userID=record.id
  form.username=record.username
  form.nickname=record.nickname
  form.avatar=record.avatar
  form.abstract=record.abstract
  form.role=record.role
  visible.value=true
}
async function handler(){
  const res = await userUpdateAdminApi(form)
  if(res.code){
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  fListRef.value.getList()
  return
}
</script>

<template>
<div>
  <a-modal v-model:visible="visible" title="编辑用户信息" :on-before-ok="handler">
    <a-form :model="form">
      <a-form-item label="昵称">
        <a-input placeholder="昵称" v-model="form.nickname"></a-input>
      </a-form-item>
      <a-form-item label="用户名">
        <a-input placeholder="用户名" v-model="form.username"></a-input>
      </a-form-item>
      <a-form-item label="头像">
        <q_image_upload v-model="form.avatar"></q_image_upload>
      </a-form-item>
      <a-form-item label="简介">
       <a-textarea v-model="form.abstract" placeholder="角色简介"></a-textarea>
      </a-form-item>
      <a-form-item label="角色">
        <a-select v-model="form.role" :options="roleOptions" placeholder="角色"></a-select>
      </a-form-item>
    </a-form>
  </a-modal>
  <q_list
          @edit="edit"
          ref="fListRef"
          no-add
          :url="userListApi"
          :columns="columns">
    <template #avatar="{ record }:{record:userListType}"}>
      <q_user :avatar="record.avatar" :nickname="record.nickname"></q_user>
    </template>
    <template #addr="{ record }:{record:userListType}"}>
      {{record.ip}}({{record.addr}})
    </template>
  </q_list>
</div>
</template>

<style lang="less">

</style>