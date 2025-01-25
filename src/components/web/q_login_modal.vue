<script lang="ts" setup>
import {Modal} from "@arco-design/web-vue";
import {ref} from "vue";
import {userStores} from "@/stores/user_store.ts";
import Q_pwd_login from "@/components/web/login/pwd_login.vue";
import Email_login from "@/components/web/login/email_login.vue";
import router from "@/router";

interface Props {
  visible: boolean
  to?: string
  reload?: boolean//是否刷新页面
}

const userStore = userStores()
const props = defineProps<Props>()
const emits = defineEmits(["update:visible", "destruction"])

function cancel() {
  emits("update:visible", false)
}

function loginSuccess() {
  emits("destruction")
}

const type = ref(1)//1pwd2邮箱


async function handler(data: string) {
  userStore.saveUserInfo(data)
  emits("update:visible", false)
  if (props.to) {
    //跳转到指定界面
    console.log(props.to)
    router.push(props.to)
  }
  if (props.reload) {
    setTimeout(() => {
      location.reload()
    }, 500)
  }
  setTimeout(() => {
    emits("destruction")
  }, 1000)
}


</script>

<template>
  <Modal :footer="false" :visible="props.visible" modal-class="q_login_modal" width="380px" @cancel="cancel">
    <div class="banner">
      <div class="title">用户登录</div>
      <img alt="" src="http://qiniuyun.starletter.cn/picture/20250113143542373.jpg">
    </div>
    <q_pwd_login v-if="type === 1 && userStore.siteInfo.login.usernamePwdLogin" @ok="handler"></q_pwd_login>
    <email_login v-if="type===2 && userStore.siteInfo.login.emailLogin" @ok="handler"></email_login>
    <div class="form">
      <div v-if="userStore.siteInfo.login.emailLogin" class="register">
        <span v-if="type===1">没有账号?<a href="javascript:void 0" @click="type=2">去注册</a></span>
        <span v-if="type===2">已有账号?<a href="javascript:void 0" @click="type=1">去登录</a></span>
      </div>
      <template v-if="userStore.siteInfo.login.qqLogin">
        <div class="other">第三方登录</div>
        <div class="other_login">
          <img alt="" src="@/assets/image/QQ.svg"/>
        </div>
      </template>
    </div>
  </Modal>
</template>

<style lang="less">
.q_login_modal {
  .arco-modal-header {
    display: none;
  }

  .arco-modal-body {
    padding: 0;

    .banner {
      height: 124px;
      position: relative;
      border-radius: 5px 5px 0 0;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 0;
      }

      .title {
        position: absolute;
        left: 50%;
        width: 100%;
        text-align: center;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        color: white;
        font-weight: 600;
        font-size: 36px;
      }
    }

    .arco-form {
      padding: 20px 20px 0 20px;
    }

    .form {
      padding: 0 20px 20px 20px;

      .register {
        font-size: 14px;
        color: var(--color-text-2);
      }

      .other {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--color-text-2);
        font-size: 12px;
        margin-top: 10px;

        &::before {
          content: "";
          display: block;
          width: 30%;
          height: 1px;
          background: var(--color-fill-2);
        }

        &::after {
          content: "";
          display: block;
          width: 35%;
          height: 1px;
          background: var(--color-fill-2);
        }
      }

      .other_login {
        display: flex;
        justify-content: center;

        img {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}
</style>