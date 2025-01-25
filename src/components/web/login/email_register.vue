<script lang="ts" setup>
import {emailRegisterApi, type emailRegisterType,} from "@/api/user_api.ts";
import {Button, Form, FormItem, Input, Message} from "@arco-design/web-vue";
import {reactive, ref} from "vue";

const form = reactive<emailRegisterType>({
  emailID: "",
  emailCode: "",
  pwd: "",
  rePwd: "",
})

interface Props {
  emailID: string
}

const props = defineProps<Props>()

const formRef = ref()
const emits = defineEmits(["ok"])

function rePwdValue(value: string | undefined, callback: (err?: string) => void) {
  if (value != form.pwd) {
    callback("两次密码不一样")
  }
}


async function handler() {
  const val = await formRef.value.validate()
  if (val) return
  form.emailID = props.emailID
  const res = await emailRegisterApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  emits("ok", res.data)
}

</script>

<template>
  <Form ref="formRef" :label-col-props="{span:0}" :model="form" :wrapper-col-props="{span:24}">
    <FormItem :rules="[{required:true,message:'请输入邮箱验证码'}]" field="emailCode">
      <Input v-model="form.emailCode" placeholder="邮箱验证码">用户名</Input>
    </FormItem>
    <FormItem :rules="[{required:true,message:'请输入密码'},{minLength:5,maxLength:16,message:'密码长度为5-16个字符'}]"
              field="pwd">
      <Input v-model="form.pwd" placeholder="密码" type="password">密码</Input>
    </FormItem>
    <FormItem :rules="[{required:true,message:'请确认密码'},{minLength:5,maxLength:16,message:'密码长度为5-16个字符'},{validator:rePwdValue}]"
              field="rePwd">
      <Input v-model="form.rePwd" placeholder="确认密码" type="password">密码</Input>
    </FormItem>
    <FormItem>
      <Button long type="primary" @click="handler">注册</Button>
    </FormItem>
  </Form>
</template>

<style lang="less">

</style>