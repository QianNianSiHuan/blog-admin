<script setup lang="ts">
import {Button, Form, FormItem, Input, Message} from "@arco-design/web-vue";
import {reactive, ref} from "vue";
import {sendEmail, type sendEmailType} from "@/api/user_api.ts";
import {userStores} from "@/stores/user_store.ts";
import Q_captcha from "@/components/web/q_captcha.vue";
const emits =defineEmits(["ok"])
const userStore = userStores()

const  form =reactive<sendEmailType>({
  type:3,
  email:"",
  captchaID:"",
  captchaCode:"",
})


const formRef=ref()
const captchaRef =ref()
async function handler(){
  const val =await formRef.value.validate()
  if(val)return
  const res =await sendEmail(form)
  if(res.code){
    Message.error(res.msg)
    captchaRef.value?.getData()
    return
  }
  Message.success(res.msg)
  emits("ok",res.data.emailID)
}



</script>

<template>
  <Form ref="formRef" :model="form" :label-col-props="{span:0}" :wrapper-col-props="{span:24}">
    <FormItem field="email"  :rules="[{required:true,message:'请输入邮箱'}]">
      <Input v-model="form.email" placeholder="邮箱"></Input>
    </FormItem>
    <FormItem content-class="captcha_item" v-if="userStore.siteInfo.login.captcha" :rules="[{required:true,message:'请输入邮箱'}]" field="captchaCode">
      <Input  placeholder="验证码" v-model="form.captchaCode">图形验证码</Input>
      <q_captcha ref="captchaRef" v-model="form.captchaID"></q_captcha>
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