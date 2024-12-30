<script setup lang="ts">

import Q_list, {type filterGroupType} from "@/components/admin/q_list.vue";
import {userListApi, type userListType} from "@/api/user_api.ts";
import type {columnType} from "@/components/admin/q_list.vue";
const columns:columnType[] =[
  {title:"ID",dataIndex:"id"},
  {title:"IP",dataIndex:"IP"},
  {title:"ADDR",dataIndex:"addr"},
  {title:"UA",slotName:"ua"},
  {title:"日期",slotName:"created_at",dateFormat:"current"},
  {title:"操作",slotName:"action",},
]

const filters:filterGroupType[]=[
  {
    label:"角色过滤",
    source:[
      {label:"管理员",value:1},
      {label:"用户",value:2},
      {label:"游客",value:3},
    ],
    column:"role"
  }
]


const actionGroup=[{
  label:"批量升级",
  callback:function (keyList:number[]) {
    console.log(keyList)
  }
}]

</script>

<template>
<div>
  <q_list :url="userListApi" :columns="columns" :filter-group="filters" :actionGroup="actionGroup" >
    <template #ua="{ record }:{record:userListType}"}>
      {{record.ua}}
    </template>
  </q_list>
</div>
</template>

<style lang="less">

</style>