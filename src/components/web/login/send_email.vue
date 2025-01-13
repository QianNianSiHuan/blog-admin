<script setup lang="ts">
import {Button, Form, FormItem, Input, Message} from "@arco-design/web-vue";
import {reactive, ref} from "vue";
import {sendEmail, type sendEmailType} from "@/api/user_api.ts";
import {userStores} from "@/stores/user_store.ts";
const emits =defineEmits(["ok"])
const userStore = userStores()

const  form =reactive<sendEmailType>({
  type:3,
  email:"",
  captchaID:"",
  captchaCode:"",
})


const formRef=ref()

async function handler(){
  const val =await formRef.value.validate()
  if(val)return
  const res =await sendEmail(form)
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
    <FormItem field="email"  :rules="[{required:true,message:'请输入邮箱'}]">
      <Input v-model="form.email" placeholder="邮箱"></Input>
    </FormItem>
    <FormItem content-class="captcha_item" v-if="userStore.siteInfo.login.captcha">
      <Input  placeholder="验证码" v-model="form.captchaCode">图形验证码</Input>
      <img src="http://qiniuyun.starletter.cn/picture/20241226144106619.png" alt="">
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handler" long>验证邮箱</Button>
    </FormItem>
  </Form>
</template>

<style lang="less">
.captcha_item{
  img{
    width: 93px;
    height: 31px;
    border-radius: 5px;
    margin-left: 10px;
  }
}
</style>