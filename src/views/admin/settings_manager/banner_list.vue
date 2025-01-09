<script setup lang="ts">

import Q_list, {type filterGroupType} from "@/components/admin/q_list.vue";
import type {columnType} from "@/components/admin/q_list.vue";
import {reactive, ref} from "vue";
import {bannerListApi, type bannerLIstType, type bannerType, bannerUpdateApi} from "@/api/banner_api.ts";
import Q_image_upload from "@/components/common/q_image_upload.vue";
import {Message} from "@arco-design/web-vue";
const columns:columnType[] =[
  {title:"ID",dataIndex:"id"},
  {title:"图片",slotName:"cover"},
  {title:"跳转地址",slotName:"href"},
  {title:"是否显示",slotName:"show"},
  {title:"日期",slotName:"CreatedAt"},
  {title:"操作",slotName:"action",},
]

const fListRef =ref()

const data =reactive<bannerType>({
  show: true,
  cover:"",
  href: ""
})

const visible = ref(false)

function create(){
  data.id=undefined
  data.href=""
  data.cover=""
  data.show=true
  visible.value =true
}

function edit(record:bannerLIstType) {
  data.id=record.id
  data.show=record.show
  data.href=record.href
  data.cover=record.cover
  visible.value=true
}

async function handler() {
  const res =await bannerUpdateApi(data)
  if(res.code){
    Message.error(res.msg)
    return false
  }
  Message.success(res.msg)
  fListRef.value.getList()
  return true
}
</script>

<template>
  <div>
    <a-modal v-model:visible="visible"  :title="data.id ? '更新banner':'创建banner'" :on-before-ok="handler">
      <a-form :model="data">
        <a-form-item label="封面">
          <q_image_upload v-model="data.cover" shape="" placeholder="banner封面" :height="60"></q_image_upload>
        </a-form-item>
        <a-form-item label="跳转地址">
          <a-input placeholder="跳转地址" v-model="data.href"></a-input>
        </a-form-item>
        <a-form-item  label="是否显示">
          <a-switch v-model="data.show"></a-switch>
        </a-form-item>
      </a-form>
    </a-modal>
    <q_list ref="fListRef"
            :url="bannerListApi"
            :columns="columns"
            @add="create"
            @edit="edit"
    >
      <template #cover="{record}:{record:bannerLIstType}">
        <a-image :src="record.cover" height="50px"></a-image>
      </template>
      <template #show="{record}:{record:bannerLIstType}">
        <a-switch :model-value="record.show"></a-switch>
      </template>
      <template #href="{record}:{record:bannerLIstType}">
        <a :href="record.href" v-if="record.href" target="_blank">{{record.href}}</a>
        <span v-else>-</span>
      </template>
    </q_list>
  </div>
</template>

<style lang="less">

</style>