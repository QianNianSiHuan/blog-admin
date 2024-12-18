<script setup lang="ts">
import {ref} from "vue";

const isFullScreen =ref(false)
//全屏
function fullScreen(){
document.documentElement?.requestFullscreen()
  isFullScreen.value =true
}

//退出全屏
function exitFullScreen(){
  document?.exitFullscreen()
  isFullScreen.value =false
}

//是否退出去全屏
</script>
<template>
  <span title="全屏" v-if= "!isFullScreen" ><icon-fullscreen @click="fullScreen"/></span>
  <span title="退出全屏" v-else><icon-fullscreen-exit  @click="exitFullScreen"/></span>
</template>
<style lang="less">

</style>