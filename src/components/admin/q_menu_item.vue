<script setup lang="ts">
import type {Component} from "vue";
import QComponent from "@/components/common/q-component.vue";
import {userStores} from "@/stores/user_store.ts";
const userStore =userStores()

interface MenuType {
  title:string
  name:string
  icon?:string|Component
  children?:MenuType[]
  role?:number
}
interface Props {
  list:MenuType[]
}
const props =defineProps<Props>()
</script>

<template>

  <template v-for="menu in props.list">
    <template  v-if="!menu.children">
      <a-menu-item :key="menu.name" v-if="menu.role===undefined||menu.role===userStore.userInfo.role">
        <template #icon>
          <component :is="menu.icon"></component>
        </template>
        {{menu.title}}
      </a-menu-item>
    </template>

    <template v-else>
      <a-sub-menu  :key="menu.name" :title="menu.title" v-if="menu.role===undefined||menu.role===userStore.userInfo.role">
        <template #icon>
          <q-component :is="menu.icon"/>
        </template>
      <q_menu_item :list="menu.children"/>
      </a-sub-menu>
    </template>
  </template>

</template>

<style lang="less">

</style>