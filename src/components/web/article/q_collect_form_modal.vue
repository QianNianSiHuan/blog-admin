<script lang="ts" setup>
import {collectCreatApi} from "@/api/collect_api.ts";
import {Message} from "@arco-design/web-vue";

interface Props {
  id?: number
  visible: boolean
  title: string
  abstract?: string
}

const emits = defineEmits(["update:visible", "update:title", "update:abstract", "ok"]);
const props = defineProps<Props>()


async function addCollectHandler() {
  console.log(props)
  const res = await collectCreatApi({
    id: props.id as number,
    title: props.title,
    abstract: props.abstract as string,
  })
  if (res.code) {
    Message.error(res.msg)
    return false
  }
  Message.success(res.msg)
  cancel()
  emits("ok")
  return true
}

function titleInput(val: string) {
  emits("update:title", val)
}

function abstractInput(val: string) {
  emits("update:abstract", val)
}

function cancel() {
  emits("update:visible", false)
}

</script>

<template>
  <a-modal v-model:visible="props.visible" :on-before-ok="addCollectHandler" :title="props.id?'编辑收藏夹':'创建收藏夹'"
           width="20%"
           @cancel="cancel">
    <a-form ref="formRef" :label-col-props="{span:7}" :model="props" :wrapper-col-props="{span:17}">
      <a-form-item :rules="[{required:true,message:'请输入收藏夹标题'}]" :validate-trigger="'blur'" field="title"
                   label="收藏夹标题">
        <a-input placeholder="收藏夹标题" @input="titleInput"></a-input>
      </a-form-item>
      <a-form-item v-if="props.abstract !== undefined" label="收藏夹简介">
        <a-textarea :auto-size="{minRows:2,maxRows:3}" placeholder="收藏夹标题" @input="abstractInput"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="less">

</style>