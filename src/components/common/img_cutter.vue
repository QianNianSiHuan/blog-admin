<script setup lang="ts">

import {Message} from "@arco-design/web-vue";

const emits = defineEmits(["ok"])

import ImgCutter from 'vue-img-cutter'
import {imageUploadApi} from "@/api/image_api";

async function cutDown(e: any) {
  const res = await imageUploadApi(e.file)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  emits("ok", res.data)
}
</script>

<template>
  <ImgCutter @cutDown="cutDown" rate="1:1">
    <template #open>
      <slot></slot>
    </template>
  </ImgCutter>
</template>

<style  lang="less">

</style>