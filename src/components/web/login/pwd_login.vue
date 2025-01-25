<script lang="ts" setup>
import {emailLoginApi, type emailLoginRequest} from "@/api/user_api.ts";
import {Button, Form, FormItem, Input, Message} from "@arco-design/web-vue";
import {reactive, ref} from "vue";
import {userStores} from "@/stores/user_store.ts";
import Q_captcha from "@/components/web/q_captcha.vue";

const userStore = userStores()
const form = reactive<emailLoginRequest>({
  val: "",
  password: "",
  captchaID: "",
  captchaCode: "",
})
const formRef = ref()
const emits = defineEmits(["ok"])
const captchaRef = ref()

async function handler() {
  const val = await formRef.value.validate()
  if (val) return
  const res = await emailLoginApi(form)
  if (res.code) {
    Message.error(res.msg)
    captchaRef.value?.getData()
    return
  }
  Message.success(res.msg)
  emits("ok", res.data)
}
</script>

<template>
  <Form ref="formRef" :label-col-props="{span:0}" :model="form" :wrapper-col-props="{span:24}">
    <FormItem :rules="[{required:true,message:'请输入用户名'}]" field="val">
      <Input v-model="form.val" placeholder="用户名">用户名</Input>
    </FormItem>
    <FormItem :rules="[{required:true,message:'请输入密码'},{minLength:5,maxLength:16,message:'密码长度为5-16个字符'}]"
              field="password">
      <Input v-model="form.password" placeholder="密码" type="password">密码</Input>
    </FormItem>
    <FormItem v-if="userStore.siteInfo.login.captcha" :rules="[{required:true,message:'请输入图形验证码'}]"
              content-class="captcha_item"
              field="captchaCode">
      <Input ref="captchaRef" v-model="form.captchaCode" placeholder="图形验证码">验证码</Input>
      <q_captcha v-model="form.captchaID"></q_captcha>
    </FormItem>
    <FormItem>
      <Button long type="primary" @click="handler">登录</Button>
    </FormItem>
  </Form>
</template>

<style lang="less">
.captcha_item {
  img {
    width: 93px;
    height: 31px;
    border-radius: 5px;
    margin-left: 10px;
  }
}
</style>