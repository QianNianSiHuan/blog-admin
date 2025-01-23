<script lang="ts" setup>
import Q_point from "@/components/common/q_point.vue";
import router from "@/router";

function select(val: string) {
  router.push({
    name: val
  })
}
</script>

<template>
  <q_point :count="1" class="q_nav_mag_com">
    <a-dropdown class="q_nav_msg_dropdown" @select="select">
      <a href="javascript:void 0">消息</a>
      <template #content>
        <a-doption value="msgComment">
          <q_point :count="0">评论和@</q_point>
        </a-doption>
        <a-doption value="msgDigg">
          <q_point :count="2">赞和收藏</q_point>
        </a-doption>
        <a-doption value="msgChat">
          <q_point :count="0">用户私信</q_point>
        </a-doption>
      </template>
    </a-dropdown>
  </q_point>
</template>

<style lang="less">
.q_nav_msg_dropdown {
  .arco-dropdown-option-content {
    padding: 0 6px;
  }
}
</style>