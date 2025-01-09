<script setup lang="ts">

import {siteApi, type siteName, siteUpdateApi} from "@/api/site_api.ts";
import {reactive, ref} from "vue";
import {Message} from "@arco-design/web-vue";

interface Props {
  name:siteName
}
const props =defineProps<Props>()

const data = reactive<any>({})

const isShow =ref(false)

async function getData(){
  const res =await  siteApi(props.name)
  if(res.code){
    Message.error(res.msg)
    return
  }
  Object.assign(data,res.data)
  isShow.value=true
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
  <a-spin  :loading="!isShow" style="width: 100%">
    <slot  v-if="isShow" :form="data"></slot>
  </a-spin>
  <teleport v-if="isShow" to=".site_update_btn">
    <a-button @click="updateData" type="primary">更新</a-button>
  </teleport>
</div>
</template>

<style lang="less">
.q_site{
  padding: 20px;
  .body{
    margin-top: 10px;
  }
}
</style>