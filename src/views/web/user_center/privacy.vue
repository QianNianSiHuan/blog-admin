<script setup lang="ts">
import Q_card from "@/components/web/q_card.vue";
import {userCenterStores} from "@/stores/user_center_store.ts";
import {userDetailUpdateApi, type userDetailUpdateRequest} from "@/api/user_api.ts";
import {Message} from "@arco-design/web-vue";
const userCenterStore =userCenterStores()

async function userUpdateColumn(column:"openCollect"|"openFollow"|"openFans",value:boolean){
  const data:userDetailUpdateRequest = {}
    data[column]=value
  const res =await userDetailUpdateApi(data)
  if(res.code){
    Message.error(res.msg)
  }
  Message.success(res.msg)
}
</script>


<template>
  <div class="user_center_privacy_view">
    <q_card title="隐私设置">
      <a-form :model="userCenterStore.userDetail" :label-col-props="{span: 4}" label-align="left">
        <a-form-item label="公开我的收藏">
          <a-switch v-model="userCenterStore.userDetail.openCollect" @change="userUpdateColumn('openCollect', $event as boolean)"></a-switch>
        </a-form-item>
        <a-form-item label="公开我的关注列表">
          <a-switch v-model="userCenterStore.userDetail.openFollow" @change="userUpdateColumn('openFollow', $event as boolean)"></a-switch>
        </a-form-item>
        <a-form-item label="公开我的粉丝列表">
          <a-switch v-model="userCenterStore.userDetail.openFans" @change="userUpdateColumn('openFans', $event as boolean)"></a-switch>
        </a-form-item>
      </a-form>
    </q_card>
  </div>
</template>


<style lang="less">

</style>