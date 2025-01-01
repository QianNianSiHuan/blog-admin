<script setup lang="ts">

import Q_card from "@/components/common/q_card.vue";
import Q_welcome from "@/components/admin/q_welcome.vue";
import Q_quick_entrance from "@/components/admin/q_quick_entrance.vue";
import Q_version from "@/components/common/q_version.vue";
import User_login_echars from "@/components/echarts/user_login_echars.vue";
</script>

<template>
  <div class ="home_view">
  <q_welcome/>
    <div class="bottom">
      <div class="left">
        <q_quick_entrance></q_quick_entrance>
        <q_card title="数据统计" class="statistic">
          <user_login_echars/>
        </q_card>
      </div>
      <div class="right">
        <q_version/>
      </div>
   </div>
  </div>
</template>

<style lang="less">
.home_view{
  background-color: inherit!important;

  .bottom{
    width: 100%;
    display: flex;
    justify-content: space-between;
    .left{
      width: 70%;
      .statistic{
        margin-top: 20px;
      }
    }
    .right{
      width: 30%;
      margin-left: 20px;
    }
  }
}
</style>