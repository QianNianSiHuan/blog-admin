<script setup lang="ts">
import Q_card from "@/components/web/q_card.vue";
import {showUpdatePwd} from "@/components/common/q_update_password.ts";
import {reactive} from "vue";
import type {listResponse} from "@/api";
import {loginRecordApi, type loginRecordType} from "@/api/user_api.ts";
import {Message} from "@arco-design/web-vue";
import {dateTimeFormat} from "@/utils/data.ts";
const data = reactive<listResponse<loginRecordType>>({
  list:[],
  count:0
})


async function getData() {
  const res = await loginRecordApi({type:1,limit:100,page:0})
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data,res.data)
}
getData()
</script>

<template>
<div class="user_center_login_record_view">
  <q_card title="登录日志">
    <div>
      若发现异常,请尽快<a href="javascript:void 0" @click="showUpdatePwd">修改密码</a>
    </div>
    <div class="login_list">
      <div class="item" v-for="item in data.list">
        <span class="date">{{dateTimeFormat(item.CreatedAt)}}</span>
        <span class="addr">
            {{ item.addr }}({{item.IP}})
          </span>
      </div>
    </div>



  </q_card>
</div>
</template>

<style lang="less">
.user_center_login_record_view {
  .login_list {
    margin-top: 10px;

    .item {
      background: var(--color-fill-1);
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      color: var(--color-text-1);

      &:nth-child(even){
        background: var(--color-fill-2);
      }
    }
  }
}
</style>