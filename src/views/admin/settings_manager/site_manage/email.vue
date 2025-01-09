<script setup lang="ts">
import Q_site from "@/components/admin/site/q_site.vue";
</script>

<template>
  <div class="email_view">
    <q_site name="email" v-slot="{data}">
      {{data}}
    </q_site>
  </div>
</template>

<style lang="less">

</style>