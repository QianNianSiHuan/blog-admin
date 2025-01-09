<script setup lang="ts">

import {siteApi, type siteName, siteUpdateApi} from "@/api/site_api.ts";
import {reactive} from "vue";
import {Message} from "@arco-design/web-vue";

interface Props {
  name:siteName
}
const props =defineProps<Props>()

const data = reactive<any>({})

async function getData(){
  const res =await  siteApi(props.name)
  if(res.code){
    Message.error(res.msg)
    return
  }
  Object.assign(data,res.data)
}
getData()


async function updateData(){
  const res =await  siteUpdateApi(props.name,data)
  if(res.code){
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}
</script>

<template>
<div class="q_site">
  <slot :data="data"></slot>
</div>
</template>

<style lang="less">

</style>