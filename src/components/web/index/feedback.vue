<script lang="ts" setup>

import Q_card from "@/components/web/q_card.vue";
import {reactive} from "vue";
import {feedbackCreateApi, type feedbackCreateType} from "@/api/feedback.ts";
import {Message} from "@arco-design/web-vue";

const form = reactive<feedbackCreateType>({
  email: "",
  content: "",
})

async function add() {
  const res = await feedbackCreateApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
}
</script>

<template>
  <q_card title="用户反馈">
    <div>
      <a-input v-model="form.email" placeholder="请输入邮箱"></a-input>
    </div>
    <div style="margin: 10px 0">
      <a-textarea v-model="form.content" :auto-size="{minRows:3,maxRows:4}" placeholder="请输入反馈内容"></a-textarea>
    </div>
    <div>
      <a-button long type="primary" @click="add">提交</a-button>
    </div>
  </q_card>
</template>

<style lang="less">

</style>