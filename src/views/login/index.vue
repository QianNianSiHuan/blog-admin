<script lang="ts" setup>
import {reactive, ref} from "vue";
import {emailLoginApi, type emailLoginRequest} from "@/api/user_api.ts";
import {Message} from "@arco-design/web-vue";
import {userStores} from "@/stores/user_store.ts";
import router from "@/router";
import {useRoute} from "vue-router";

const form = reactive<emailLoginRequest>({
  val: "",
  password: "",
  captchaCode: "",
  captchaID: "",
})
const route = useRoute()
const formRef = ref()
const userStore = userStores()

async function emailLogin() {
  const val = await formRef.value.validate()
  if (val) return
  const res = await emailLoginApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success("登陆成功")
  //1.解析token获取信息 2.掉用户信息接口
  userStore.saveUserInfo(res.data)
  const redirect = route.query.redirect
  if (redirect) {
    router.push(redirect as string)
    return
  }
  router.push({name: "web"})
}

const keyDown = (e: any) => {
  if (e.keyCode == 13 || e.keyCode == 100) {
    emailLogin()
  }
}


</script>

<template>
  <div class="login_view">
    <div class="login_mask">
      <a-form ref="formRef" :label-col-props="{span:0}" :model="form" :wrapper-col-props="{span:24}">
        <div class="title">用户登录</div>
        <a-form-item
            :rules="[{required:true,message:'请输入用户名'},{minLength:5,maxLength:16,message:'用户名长度为5-16个字符'}]"
            field="val"
            label="用户名">
          <a-input v-model=form.val placeholder="请输入用户名">
            <template #prefix>
              <icon-user/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
            :rules="[{required:true,message:'请输入密码'},{minLength:5,maxLength:16,message:'密码长度为5-16个字符'}]"
            field="password"
            label="密码">
          <a-input v-model="form.password" placeholder="请输入密码" type="password">
            <template #prefix>
              <icon-lock/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button long type="primary" @click="emailLogin" @keyup.enter="keyDown">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="less">
.login_view {
  background: url(http://qiniuyun.starletter.cn/picture/20241226144246567.png) 50% / cover no-repeat;
  position: relative;
  height: 100vh;

  .login_mask {
    width: 400px;
    height: 100vh;
    background-color: var(--login-bg);
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .arco-form {
      padding: 40px;
    }

    .title {
      font-size: 26px;
      font-weight: 600;
      text-align: center;
      color: @primary-6;
      margin-bottom: 20px;
    }
  }
}

:root {
  --login-bg: rgba(255, 255, 255, 0.6);
}

[arco-theme ='dark'] {
  --login-bg: rgba(0, 0, 0, 0.6);
}
</style>