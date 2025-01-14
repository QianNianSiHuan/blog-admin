<script setup lang="ts">
import {Modal, Form, FormItem, Input, Message} from "@arco-design/web-vue";
import {reactive, ref} from "vue";
import {userPwdUpdateApi, type userPwdUpdateType} from "@/api/user_api";

interface Props {
  visible: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(["update:visible", "destruction"])

const form = reactive<userPwdUpdateType>({
  oldPwd: "",
  pwd: "",
  rePwd: ""
})
const formRef = ref()

function cancel() {
  emits("update:visible", false)
}

function rePwdValida(value: string | undefined, callback: (error?: string) => void) {
  if (value !== form.pwd) {
    callback("两次密码不一致")
  }
}

async function handler() {
  const val = await formRef.value.validate()
  if (val) return false
  const res = await userPwdUpdateApi(form)
  if (res.code) {
    Message.error(res.msg)
    return false
  }
  Message.success(res.msg)
  emits("update:visible", false)
  // 销毁组件
  setTimeout(()=>{
    emits("destruction")
  }, 1000)
  return true
}

</script>

<template>
  <Modal width="400px" title="修改密码" :visible="props.visible" @cancel="cancel" :on-before-ok="handler">
    <Form :model="form" ref="formRef" :label-col-props="{span: 6}" :wrapper-col-props="{span: 18}">
      <FormItem label="原密码" field="oldPwd" validate-trigger="blur"
                :rules="[{required: true, message:'请输入原密码'}]">
        <Input placeholder="原密码" type="password" v-model="form.oldPwd"></Input>
      </FormItem>
      <FormItem label="新密码" field="pwd" validate-trigger="blur" :rules="[{required: true, message:'请输入密码'}]">
        <Input placeholder="新密码" type="password" v-model="form.pwd"></Input>
      </FormItem>
      <FormItem label="确认密码" field="rePwd" validate-trigger="blur"
                :rules="[{required: true, message:'请再次输入密码'}, {validator: rePwdValida}]">
        <Input placeholder="确认密码" type="password" v-model="form.rePwd"></Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<style lang="less">

</style>