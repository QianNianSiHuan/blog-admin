<script setup lang="ts">

interface Props {
  title:string
}

const props=defineProps<Props>()


</script>

<template>
<div class="q_card">
  <div class="title">
    {{props.title}}
  </div>
  <div class="body">
  <slot></slot>
  </div>
</div>
</template>

<style lang="less">

.q_card{
  background-color: var(--color-bg-1);
  border-radius: 5px;
  .title{
    padding: 20px;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: @q_border;
  }
  .bottom{
    padding: 20px;
  }
}

</style>