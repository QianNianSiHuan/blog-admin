<script setup lang="ts">
import {userCenterStores} from "@/stores/user_center_store.ts";
import {reactive} from "vue";
import {showUpdatePwd} from "@/components/common/q_update_password.ts";
import {showUpdateEmail} from "@/components/common/q_update_email.ts";
import Q_card from "@/components/web/q_card.vue";

const userCenterStore = userCenterStores()

const  form =reactive({})

</script>

<template>
<div class="user_center_account_view">
  <q_card title="账号设置">
    <a-form :label-col-props="{span:2}" :model="userCenterStore.userDetail">
      <a-form-item label="密码"  >
        <span v-if="userCenterStore.userDetail.usePassword">
            <span class="col">******</span> <a href="javascript:void 0" @click="showUpdatePwd"> 修改密码</a>
          </span>
        <span v-else>未启用</span>
      </a-form-item>
      <a-form-item label="邮箱">
        <span class="col">{{userCenterStore.userDetail.email}}</span>
        <a href="javascript:void(0)" @click="showUpdateEmail">{{userCenterStore.userDetail.email===''?'绑定邮箱':'修改邮箱'}}</a>
      </a-form-item>
      <a-form-item label="登录记录">
        <router-link :to="{name:'userCenterLoginRecord'}">查看记录</router-link>
      </a-form-item>
    </a-form>
  </q_card>
</div>
</template>

<style lang="less">
.user_center_account_view {
    .arco-row{
      margin-bottom: 10px;
    }
    a{
      margin-left: 10px;
    }
    .col{
      margin-left: 10px;
    }
  }

</style>