<script lang="ts" setup>
interface Props {
  title: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="q_card_com">
    <div class="head">
      <div>{{ props.title }}</div>
      <slot name="head"></slot>
    </div>
    <div class="body scrollbar">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
.q_card_com {
  background: var(--color-bg-1);
  border-radius: 5px;

  > .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 10px 20px;
    border-bottom: @q_border;
    font-size: 16px;
    font-weight: 600;
  }

  > .body {
    padding: 10px 20px 20px 20px;
  }
}
</style>