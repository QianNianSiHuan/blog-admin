<script setup lang="ts">
import {userStores} from "@/stores/user_store.ts";
import {type FileItem, Message} from "@arco-design/web-vue";
import type {baseResponse} from "@/api";

interface Props{
  modelValue: string
  placeholder?: string
  shape?:string
}

const props =defineProps<Props>()
const emits =defineEmits(["update:modelValue"])
const {shape="circle"} = props
function inputHandler(val:string){
  emits("update:modelValue",val)
}

const userStore = userStores()

function fileUploadCallBack(file:FileItem) {
const res=JSON.parse(file.response)as baseResponse<string>
if(res.code){
  Message.error(res.msg)
  return
}
console.log(res.data)
Message.success(res.msg)
  emits("update:modelValue","http://localhost:8080"+res.data)
}
</script>

<template>
<div class="f_image_upload">
  <a-input :model-value="props.modelValue" @input="inputHandler" :placeholder="props.placeholder"></a-input>
  <a-upload action="/api/images" :show-file-list="false" name="fileTool" :headers="{token:userStore.userInfo.token}" @success="fileUploadCallBack">
    <template #upload-button>
      <a-image :src="props.modelValue" :shape="shape" :height="60" :width="60" ></a-image>
    </template>
  </a-upload>
</div>
</template>

<style lang="less">
.f_image_upload{
  width: 100%;
  .arco-input-wrapper{
    display: flex;
    margin-bottom: 10px;
  }
  .arco-image{
   &.circle{
     border-radius: 50%;
   }
  }
}
</style>