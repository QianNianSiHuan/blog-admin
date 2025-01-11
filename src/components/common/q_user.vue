<script setup lang="ts">

interface Props {
  avatar:string
  nickname:string
}

const props =defineProps<Props>()
</script>

<template>
<div class="f_user_com">
  <a-avatar :image-url="props.avatar" :size="40"></a-avatar>
  <span style="margin-left: 2px">{{props.nickname}}</span>
</div>
</template>

<style lang="less">

</style>