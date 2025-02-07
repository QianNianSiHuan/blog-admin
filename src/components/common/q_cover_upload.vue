<script lang="ts" setup>
import Q_cover_cutter from "@/components/web/q_cover_cutter.vue";

interface Props {
  placeholder: string;
}

const props = defineProps<Props>()
const emits = defineEmits(["ok"])

function coverBack(data: string) {
  console.log(data)
  emits("ok", data)
}


</script>

<template>
  <q_cover_cutter style="width: 100%" @ok="coverBack">
    <div class="cover_mask">
      <IconCamera></IconCamera>
      <span>{{ props.placeholder }}</span>
    </div>
  </q_cover_cutter>
</template>

<style lang="less">
.cover_mask {
  width: 192px;
  height: 108px;
  cursor: pointer;
  border: @q_border;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-text-2);

  span {
    font-size: 12px;
  }

  svg {
    font-size: 30px;
  }
}
</style>