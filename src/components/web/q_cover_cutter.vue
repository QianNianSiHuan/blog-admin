<script lang="ts" setup>

import {Message} from "@arco-design/web-vue";
import ImgCutter from 'vue-img-cutter'
import {imageUploadApi} from "@/api/image_api";
import {userStores} from "@/stores/user_store.ts";
import {qiniuUploadConfigApi, type qiniuUploadConfigType} from "@/api/site_api.ts";
import {loadScript} from "@/utils/load_js.ts";

const emits = defineEmits(["ok"])


const userStore = userStores()

async function cutDown(e: any) {
  if (!userStore.siteInfo.qiNiu.enable) {
    const res = await imageUploadApi(e.file)
    if (res.code) {
      Message.error(res.msg)
      return
    }
    Message.success(res.msg)
    emits("ok", res.data)
    return
  }

  //上传到七牛云
  const res = await qiniuUploadConfigApi()
  if (res.code) {
    Message.error(res.msg)
    return
  }
  loadScript("/public/js/qiniu.min.js", () => {
    upload(e.file, res.data)
  })

  function upload(file: File, conf: qiniuUploadConfigType) {
    const observer = {
      //@ts-ignore
      next(res) {
        //...
        // console.log("next:", res)
      },
      //@ts-ignore
      error(err) {
        // ...
        //console.log("error:", err)
        Message.error(err)
      },
      //@ts-ignore
      complete(res) {
        //...
        //console.log("complete:", res)
        emits("ok", conf.url)
      }
    }
    const config = {
      useCdnDomain: true,
      region: conf.region
    }
    const putExtra = {}
    const observable = qiniu.upload(file, conf.key, conf.token, putExtra, config)
    observable.subscribe(observer) // 上传开始
    //const subscription = observable.subscribe(observer) // 上传开始
    //console.log(subscription)
  }
}
</script>

<template>
  <ImgCutter :quality="0" :toolBoxOverflow="false" originalGraph rate="192:108" @cutDown="cutDown">
    <template #open>
      <slot></slot>
    </template>
  </ImgCutter>
</template>

<style lang="less">

</style>