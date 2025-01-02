<script setup lang="ts">
</script>

<template>
<div class="q_footer">
  <div class="q_beian">
    <img alt="" src="@/assets/image/gongan.png">
    <a href="https://beian.miit.gov.cn/" target="_blank">备案号：{{  }}</a>
  </div>
</div>
</template>

<style lang="less">
.q_footer {
  background-color: var(--color-bg-1);
  display: flex;
  justify-content: center;

  .q_beian {
    display: flex;
    align-items: center;
    padding: 20px 0;
    img{
      width: 20px;
      height: 20px;
    }
    a{
      margin-left: 10px;
      color: var(--color-text-2);
      text-decoration: none;
    }
  }
}
</style>