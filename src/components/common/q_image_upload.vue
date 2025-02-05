<script lang="ts" setup>
import {userStores} from "@/stores/user_store.ts";
import Q_avatar_cutter from "@/components/web/q_avatar_cutter.vue";

interface Props {
  modelValue: string
  placeholder?: string
  shape?: string
  width?: number
  height?: number
}

const props = defineProps<Props>()
const emits = defineEmits(["update:modelValue"])
const {
  shape = "circle", width = 60,
  height = 60
} = props

function inputHandler(val: string) {
  console.log(val)
  emits("update:modelValue", val)
}

const userStore = userStores()

// function fileUploadCallBack(file: FileItem) {
//   const res = JSON.parse(file.response) as baseResponse<string>
//   if (res.code) {
//     Message.error(res.msg)
//     return
//   }
//   console.log(res.data)
//   Message.success(res.msg)
//   emits("update:modelValue", res.data)
// }

function callback(data: string) {
  console.log(data)
  emits("update:modelValue", data)
}
</script>

<template>
  <div class="f_image_upload">
    <a-input :model-value="props.modelValue" :placeholder="props.placeholder" @input="inputHandler"></a-input>
    <!--    <a-upload :headers="{token:userStore.userInfo.token}" :show-file-list="false" action="/api/images" name="fileTool"-->
    <!--              @success="fileUploadCallBack">-->
    <!--    <template #upload-button>-->
    <!--      <a-image :class="shape" :height="height" :preview="false" :src="props.modelValue" :width="width"></a-image>-->
    <!--    </template>-->
    <!--    </a-upload>-->
    <q_avatar_cutter @ok="callback">
      <a-image :class="shape" :height="height" :preview="false" :src="props.modelValue" :width="width"></a-image>
    </q_avatar_cutter>
  </div>
</template>

<style lang="less">
.f_image_upload {
  width: 100%;

  .arco-input-wrapper {
    display: flex;
    margin-bottom: 10px;
  }

  .arco-image {
    &.circle {
      border-radius: 50%;
    }
  }
}
</style>