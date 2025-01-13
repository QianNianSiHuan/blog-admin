<script setup lang="ts">
interface Props{
  count:number
}

const poops =defineProps<Props>()

</script>

<template>
  <a-badge class="q_point_com" :count="poops.count" dot :dotStyle="{ width: '5px', height: '5px' }">
    <slot></slot>
  </a-badge>
</template>

<style lang="less">
.q_point_com{
  .arco-badge-dot{
    top:1px;
    right: -3px;
  }
}
</style>