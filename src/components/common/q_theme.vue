<script setup lang="ts">
import {setTheme,theme,loadTheme} from "@/components/common/q_theme.ts";
</script>

<template>
  <span title="白天模式" v-if="theme ==='dark' "><icon-sun-fill  @click="setTheme('')"/></span>
  <span title="深色模式" v-else><icon-moon-fill @click="setTheme('dark')"/></span>
</template>

<style scoped>

</style>