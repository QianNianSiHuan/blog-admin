<script setup lang="ts">

interface Props {
  avatar:string
  nickname: string
  size?:number
}

const props =defineProps<Props>()
const {size=40} = props

</script>

<template>
<div class="f_user_com">
  <a-avatar :image-url="props.avatar" :size="size"></a-avatar>
  <span class="text">{{props.nickname}}</span>
</div>
</template>

<style lang="less">
.q_user_com {
  .text{
    margin-left: 2px
  }
}
</style>