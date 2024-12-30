<script setup lang="ts">

import Q_list, {type filterGroupType} from "@/components/admin/q_list.vue";
import {articleCategoryOptionsApi, userListApi, type userListType} from "@/api/user_api.ts";
import type {columnType} from "@/components/admin/q_list.vue";
import {ref} from "vue";
const columns:columnType[] =[
  {title:"ID",dataIndex:"id"},
  {title:"IP",dataIndex:"IP"},
  {title:"ADDR",dataIndex:"addr"},
  {title:"UA",slotName:"ua"},
  {title:"日期",slotName:"created_at",dateFormat:"current"},
  {title:"操作",slotName:"action",},
]

const fListRef =ref()

const filters:filterGroupType[]=[
  {
    label:"角色过滤",
    source:[
      {label:"管理员",value:1},
      {label:"用户",value:2},
      {label:"游客",value:3},
    ],
    column:"role",
    // callback:(value)=>{
    //   console.log("fu")
    // }
  },
  {
    label:"ip过滤",
    source:[
      {label:"内网",value:1},
      {label:"外网",value:2},
    ],
    column:"ip",
    callback:(value)=>{
      console.log(fListRef.value.data )
       fListRef.value?.getList({role:value})
      console.log("fu")
    }
  },
  {
    label:"ip过滤",
    source:articleCategoryOptionsApi,
    column:"ip",
    // callback:(value)=>{
    //   console.log("fu")
    // }
  },
]


const actionGroup=[{
  label:"批量升级",
  callback:function (keyList:number[]) {
    console.log(keyList)
  }
}]

function RowClick(record:any){
  console.log(record)
}

</script>

<template>
<div>
  <q_list ref="fListRef" :url="userListApi" @row-click="RowClick"  :columns="columns" :filter-group="filters" :actionGroup="actionGroup" >
    <template #ua="{ record }:{record:userListType}"}>
      {{record.ua}}
    </template>
  </q_list>
</div>
</template>

<style lang="less">

</style>