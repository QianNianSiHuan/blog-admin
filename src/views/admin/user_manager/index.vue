<script setup lang="ts">

import Q_list from "@/components/admin/q_list.vue";
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
function remove(keyList:number[]|string[]){
  console.log(keyList)
}
</script>

<template>
<div>
  <q_list :url="userListApi" :columns="columns" >
    <template #ua="{ record }:{record:userListType}"}>
      {{record.ua}}
    </template>
  </q_list>
</div>
</template>

<style lang="less">

</style>