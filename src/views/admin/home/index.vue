<script setup lang="ts">

import Q_card from "@/components/common/q_card.vue";
</script>

<template>
  <div class ="home_view">
    <div class="welcome">

    </div>
    <div class="bottom">
      <div class="left">
        <q_card title="快捷入口" class="quick_room">

        </q_card>
        <q_card title="数据统计" class="statistic">

        </q_card>
      </div>
      <div class="right">
        <q_card title="更新日志" class="version">

        </q_card>
      </div>
   </div>
  </div>
</template>

<style lang="less">
.home_view{
  background-color: inherit!important;
  .welcome{
    height: 251px;
    width: 100%;
    background-color: var(--color-bg-1);
    border-radius: 5px;
    margin-bottom: 20px;
  }

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