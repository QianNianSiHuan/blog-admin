<script lang="ts" setup>
import {Button, Form, FormItem, Input, Message, Modal} from "@arco-design/web-vue";
import Send_email from "@/components/web/login/send_email.vue";
import {reactive, ref} from "vue";
import {userEmailUpdateApi, type userEmailUpdateType} from "@/api/user_api.ts";

interface Props {
  visible: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(["update:visible", "destruction"])

const form = reactive<userEmailUpdateType>({
  emailCode: "",
  emailID: ""
})
const formRef = ref()

function cancel() {
  emits("update:visible", false)
}

const step = ref(1)


function sendEmailOk(val: string) {
  form.emailID = val
  step.value = 2
}

async function handler() {
  const val = await formRef.value.validate()
  if (val) return false
  const res = await userEmailUpdateApi(form)
  if (res.code) {
    Message.error(res.msg)
    return false
  }
  Message.success(res.msg)
  emits("update:visible", false)
  // 销毁组件
  setTimeout(() => {
    emits("destruction")
  }, 1000)
  return true
}
</script>

<template>
  <Modal :visible="props.visible" title="绑定邮箱" width="400px" @cancel="cancel">
    <send_email v-if="step === 1" @ok="sendEmailOk"></send_email>
    <Form v-if="step === 2" ref="formRef" :label-col-props="{span: 7}" :model="form" :wrapper-col-props="{span: 17}">
      <FormItem :rules="[{required: true}]" field="emailCode" label="邮箱验证码" validate-trigger="blur">
        <Input v-model="form.emailCode" placeholder="请输入邮箱验证码"></Input>
      </FormItem>
    </Form>

    <template #footer>
      <div v-if="step === 2">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="handler">确定</Button>
      </div>
      <div v-else>

      </div>
    </template>

  </Modal>
</template>

<style lang="less">

</style>