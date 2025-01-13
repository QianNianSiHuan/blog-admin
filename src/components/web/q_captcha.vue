<script setup lang="ts">
import {reactive} from "vue";
import {captchaApi, type captchaType} from "@/api/captcha_api.ts";
import {Message} from "@arco-design/web-vue";
interface Props {
  modelValue:string
}
const props =defineProps<Props>()
const emits =defineEmits(["update:modelValue"])
const data =reactive<captchaType>({
  captcha:"",
  captchaID:"",
})

async function getData() {
  const res =await captchaApi()
  if(res.code){
    Message.error(res.msg)
    return
  }
  Object.assign(data,res.data)
  emits("update:modelValue",data.captchaID)
}

defineExpose({
  getData,
})


getData()
</script>

<template>
  <img @click="getData" style="cursor: pointer" :src="data.captcha" alt="">
</template>

<style lang="less">

</style>