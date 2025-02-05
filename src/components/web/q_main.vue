<script lang="ts" setup>

</script>

<template>
  <div class="q_main_com">
    <div class="q_container">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
.q_main_com {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 60px;
  background-color: var(--color-neutral-2);
  min-height: calc(100vh - 60px);

  > .q_container {
    width: 1200px;
  }
}
</style>