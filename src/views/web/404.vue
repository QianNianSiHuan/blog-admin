<script setup lang="ts">
import router from "@/router";

function goHome(){
  router.push({name: "web"})
}
</script>

<template>
  <div class="notfound_view">
    <img src="@/assets/image/404.svg" alt="">
    <div class="msg">页面找不到了哟</div>
    <div class="btn">
      <a-button type="primary" @click="goHome">返回首页</a-button>
    </div>
  </div>
</template>

<style  lang="less">
.notfound_view{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  img{
    width: 400px;
  }
  .btn{
    margin-top: 10px;
  }
  .msg{
    font-size: 20px;
    color: var(--color-text-2);
  }
}
</style>