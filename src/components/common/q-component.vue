<script setup lang="ts">
import type {Component} from "vue";

interface Props{
  is?: Component|string
}
const props =defineProps<Props>()
</script>
<template>
  <component v-if="typeof props.is === 'object'" :is="props.is"></component>
  <i v-else :class="props.is"></i>
</template>

<style lang="less">

</style>