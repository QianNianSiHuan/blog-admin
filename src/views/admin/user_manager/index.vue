<script setup lang="ts">

import Q_list from "@/components/admin/q_list.vue";
import {userListApi} from "@/api/user_api.ts";
const columns =[
  {title:"ID",dataIndex:"id"},
  {title:"IP",dataIndex:"ip"},
  {title:"addr",dataIndex:"addr"},
  {title:"ua",dataIndex:"ua"},
]
</script>

<template>
<div>
  <q_list :url="userListApi" :columns="columns"></q_list>
</div>
</template>

<style lang="less">

</style>