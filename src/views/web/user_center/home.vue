<script setup lang="ts">
import Q_card from "@/components/web/q_card.vue";
import {userCenterStores} from "@/stores/user_center_store.ts";
import {userDetailUpdateApi, type userDetailUpdateRequest} from "@/api/user_api.ts";
import {Message} from "@arco-design/web-vue";
const userCenterStore =userCenterStores()

async function userUpdateColumn(){
  const data:userDetailUpdateRequest = {homeStyleID:userCenterStore.userDetail.homeStyleID}
const res = await userDetailUpdateApi(data)
  if(res.code){
    Message.error(res.msg)
  }
  Message.success(res.msg)
}
</script>


<template>
  <div class="user_center_home_view">
    <q_card title="主页设置">
      <a-form :model="userCenterStore.userDetail" :label-col-props="{span: 4}" label-align="left">
        <a-form-item class="home_style_item" label="主页样式">
          <a-radio-group v-model="userCenterStore.userDetail.homeStyleID">
            <a-radio :value="1">
              <img src="http://qiniuyun.starletter.cn/picture/20250115084035251.jpg" alt="">
              <div class="text">默认样式</div>
            </a-radio>
            <a-radio :value="2">
              <img src="http://qiniuyun.starletter.cn/picture/20250115084030095.jpg" alt="">
              <div class="text">海底探索</div>
            </a-radio>
            <a-radio :value="3">
              <img src="http://qiniuyun.starletter.cn/picture/20250115084023315.jpg" alt="">
              <div class="text">恋人分别</div>
            </a-radio>
            <a-radio :value="4">
              <img src="http://qiniuyun.starletter.cn/picture/20250113143542373.jpg" alt="">
              <div class="text">雷达探索</div>
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
      <a-button @click="userUpdateColumn" type="primary">更新</a-button>
    </q_card>
  </div>
</template>


<style lang="less">
.user_center_home_view{
  .arco-form{
    .home_style_item {
      flex-direction: column;


    .arco-radio-group{
      display: grid;
      grid-template-columns: repeat(4,1fr);
      grid-row-gap: 20px;
      grid-column-gap: 20px;
    }


    .arco-radio{
      width: 100%;
      border-radius: 5px;
      border: @q_border;
      display: flex;
      flex-direction: column-reverse;
      justify-content: center;
      align-items: center;
      padding: 10px;

      .arco-radio-label{
        margin-left: 0;
        img{
          width: 100%;
        }
        .text{
          text-align: center;
          margin-bottom: 5px;
          color: var(--color-text-2);
        }
      }

    }
  }
}
}
</style>