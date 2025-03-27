<script lang="ts" setup>

import type {columnType} from "@/components/admin/q_list.vue";
import Q_list from "@/components/admin/q_list.vue";
import {
  userCreateByAdminApi,
  type userCreateByAdminRequest,
  userListApi,
  type userListType,
  userUpdateAdminApi,
  type userUpdateAdminRequest
} from "@/api/user_api.ts";
import {reactive, ref} from "vue";
import Q_user from "@/components/common/q_user.vue";
import Q_image_upload from "@/components/common/q_image_upload.vue";
import {Message} from "@arco-design/web-vue";
import {roleOptions} from "@/options/options.ts";

const columns: columnType[] = [
  {title: "ID", dataIndex: "id"},
  {title: "头像", slotName: "avatar"},
  {title: "用户名", dataIndex: "username"},
  {title: "角色", dataIndex: "role", type: "options", options: roleOptions},
  {title: "发文数", dataIndex: "action",},
  {title: "地址", slotName: "addr",},
  {title: "注册时间", dataIndex: "CreatedAt", type: "date"},
  {title: "操作", slotName: "action",},
]

const fListRef = ref()
const visible = ref(false)
const visibleCreate = ref(false)
const form = reactive<userUpdateAdminRequest>({
  userID: 0,
  username: "",
  nickname: "",
  avatar: "",
  abstract: "",
  role: 0,
})

const createForm = reactive<userCreateByAdminRequest>({
  username: "",
  pwd: ""
})


function add() {
  form.userID = 0
  createForm.username = ""
  createForm.pwd = ""
  visibleCreate.value = true
}

function edit(record: userListType) {
  form.userID = record.id
  form.username = record.username
  form.nickname = record.nickname
  form.avatar = record.avatar
  form.abstract = record.abstract
  form.role = record.role
  visible.value = true
}

const refCreateForm = ref()

async function handler() {
  if (form.userID === 0) {
    const val = await refCreateForm.value.validate()
    if (val) {
      Message.warning("请输入正确的账号或密码")
      return
    }
    const res = await userCreateByAdminApi(createForm)
    if (res.code) {
      Message.error(res.msg)
      return
    }
    Message.success(res.msg)
  } else {
    const res = await userUpdateAdminApi(form)
    if (res.code) {
      Message.error(res.msg)
      return
    }
    Message.success(res.msg)
  }
  fListRef.value.getList()
  return
}
</script>

<template>
  <div>
    <a-modal v-model:visible="visibleCreate" :on-before-ok="handler" title="创建">
      <a-form ref="refCreateForm" :model="createForm">
        <a-form-item
            :rules="[{required:true,message:'请输入用户名'},{minLength:5,maxLength:16,message:'用户名长度为5-16个字符'}]"
            field="username"
            label="用户名"
        >
          <a-input v-model="createForm.username" placeholder="用户名"></a-input>
        </a-form-item>
        <a-form-item
            :rules="[{required:true,message:'请输入密码'},{minLength:5,maxLength:16,message:'密码长度为5-16个字符'}]"
            field="pwd"
            label="密码"
        >
          <a-input-password v-model="createForm.pwd" placeholder="密码">密码</a-input-password>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal v-model:visible="visible" :on-before-ok="handler" title="更新用户">
      <a-form :model="form">
        <a-form-item label="昵称">
          <a-input v-model="form.nickname" placeholder="昵称"></a-input>
        </a-form-item>
        <a-form-item label="用户名">
          <a-input v-model="form.username" placeholder="用户名"></a-input>
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
        ref="fListRef"
        :columns="columns"
        :url="userListApi"
        @add="add"
        @edit="edit">
      <template #avatar="{ record }:{record:userListType}">
        <q_user :avatar="record.avatar" :nickname="record.nickname"></q_user>
      </template>
      <template #addr="{ record }:{record:userListType}">
        {{ record.ip }}({{ record.addr }})
      </template>
    </q_list>
  </div>
</template>

<style lang="less">

</style>