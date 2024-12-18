<script setup lang="ts">
import {type RouteMeta, useRoute} from "vue-router";
const  route =useRoute()
interface MateType extends RouteMeta{
  title:string
}
</script>
<template>
  <a-breadcrumb>
    <template v-for="r in route.matched">
     <a-breadcrumb-item v-if="r.name != 'home'">{{ (r.meta as MateType)?.title }}</a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<style lang="less">

</style>