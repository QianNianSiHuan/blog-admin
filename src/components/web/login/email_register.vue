<script setup lang="ts">
import {
  emailRegisterApi,
  type emailRegisterType,
} from "@/api/user_api.ts";
import {Button, Form, FormItem, Input, Message} from "@arco-design/web-vue";
import {reactive, ref} from "vue";

const form =reactive<emailRegisterType>({
  emailID:"",
  emailCode:"",
  pwd:"",
  rePwd:"",
})

interface Props{
  emailID:string
}

const props =defineProps<Props>()

const formRef =ref()
const emits =defineEmits(["ok"])

async function handler(){
  const val =await formRef.value.validate()
  if(val)return
  form.emailID=props.emailID
  const res =await emailRegisterApi(form)
  if(res.code){
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  emits("ok",res.data)
}

</script>

<template>
  <Form ref="formRef" :model="form" :label-col-props="{span:0}" :wrapper-col-props="{span:24}">
    <FormItem field="val"  :rules="[{required:true,message:'请输入用户名'}]">
      <Input v-model="form.emailCode" placeholder="用户名">用户名</Input>
    </FormItem>
    <FormItem field="pwd" :rules="[{required:true,message:'请输入密码'},{minLength:5,maxLength:16,message:'密码长度为5-16个字符'}]">
      <Input type="password" v-model="form.pwd" placeholder="密码">密码</Input>
    </FormItem>
    <FormItem field="rePwd" :rules="[{required:true,message:'请输入密码'},{minLength:5,maxLength:16,message:'密码长度为5-16个字符'}]">
      <Input type="password" v-model="form.rePwd" placeholder="密码">密码</Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handler" long>注册</Button>
    </FormItem>
  </Form>
</template>

<style lang="less">

</style>