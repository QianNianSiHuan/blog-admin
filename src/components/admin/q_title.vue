<script lang="ts" setup>

</script>

<template>
  <div class="q_title">
    <slot></slot>
  </div>
</template>

<style lang="less">
.q_title {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;

  &::before {
    width: 4px;
    height: 1.5rem;
    content: "";
    display: inline-block;
    background: rgb(var(--primary-6));
    margin-right: 5px;
  }
}
</style>