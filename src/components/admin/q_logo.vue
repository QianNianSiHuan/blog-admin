<script setup lang="ts">
import {collapsed} from "@/components/admin/q_menu.ts";
</script>

<template>
  <div class="q_logo" :class="{collapsed:collapsed}">
  <img src="http://qiniuyun.starletter.cn/picture/20241211171339922.jpg" class="logo" alt="logo">
    <div class=slogan>
      <div>都是假象</div>
      <div>QianNianSiHuan</div>
    </div>
  </div>
</template>

<style lang="less">
.q_logo{
  display: flex;
  justify-content: center;
  align-items: center;

  &.collapsed{
    .slogan{
      transform: scale(0);
      transform-origin: left;
      opacity: 0;
    }
    .logo{
      transform: translateX(50px);
      width: 40px;
      height: 40px;
    }
  }


  .logo {
    width: 50px;
    height: 50px;
    transition: all .3s;
  }
    .slogan{
      margin-left: 10px;
      div:nth-child(1){
        font-size: 22px;
        font-weight: 600;
      }
      div:nth-child(2){
        font-size: 12px;
        margin-top: 1px;
      }
    }
  }

</style>