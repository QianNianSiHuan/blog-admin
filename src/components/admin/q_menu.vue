<script setup lang="ts">
import {ref, watch} from "vue";
import type {Component} from "vue";
import {IconHome,IconUser,IconSettings}from"@arco-design/web-vue/es/icon"
import QComponent from "@/components/common/q-component.vue";
import {collapsed} from "@/components/admin/q_menu.ts";
import router from "@/router";
import {useRoute} from "vue-router";

const route = useRoute()
interface MenuType {
  title:string
  name:string
  icon?:string|Component
  children?:MenuType[]
}

const menuList:MenuType[] = [
  {
    title:"首页",name:"home",icon:IconHome
  },
  {title:"个人中心",name:"userCenter",icon:IconUser,children:[
      {title:"个人信息",name:"userInfo"}
    ]
  },
  {
    title:"用户管理",name:"userManage",icon:IconUser,children:[
      {title:"用户列表",name:"userList"}
    ]
  },
  {
    title: "系统设置", name: "settingsManage", icon: IconSettings, children: [
      {title: "系统信息", name: "settingsList"}
    ]
  },
]
function menuItemClick(key:string){
  router.push({
    name:key
  })
}
const openKeys = ref<string[]>([])
const selectedKeys =ref<string[]>([])
function initRoute(){
  if (route.matched.length === 3){
    openKeys.value =[route.matched[1].name as string]
  }
selectedKeys.value= [route.name as string]
}

watch(()=>route.name,()=>{
  initRoute()
},{immediate:true})

</script>
<template>
  <div class="q_menu" :class="{collapsed:collapsed}">
    <div class="q_menu_inner">
      <a-menu
          @menu-item-click="menuItemClick"
          :default-selected-keys="[route.name]"
          v-model:collapsed="collapsed"
          v-model:open-keys="openKeys"
          v-model:selected-keys="selectedKeys"
        show-collapse-button>
      <template v-for="menu in menuList">
        <a-menu-item :key="menu.name" v-if="!menu.children">
          <template #icon>
            <component :is="menu.icon"></component>
          </template>
          {{menu.title}}
        </a-menu-item>
        <a-sub-menu v-else :key="menu.name" :title="menu.title">
          <template #icon>
            <q-component :is="menu.icon"/>
          </template>
          <a-menu-item :key="sub.name" v-for="sub in menu.children">
            <template #icon>
              <q-component :is="sub.icon"/>
            </template>
            {{sub.title}}
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
    </div>
  </div>
</template>


<style lang="less">
.q_menu{
  height: calc(100vh - 90px);
  position: relative ;
  &.collapsed {
    .arco-menu-collapse-button {
      left: 48px !important;
    }
  }


  &:hover{
  .arco-menu-collapse-button{
    opacity: 1!important;
  }
  }

  .q_menu_inner{
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    .arco-menu{
      position: inherit;
      .arco-menu-collapse-button{
        top: 50%;
        transform:translate(-50%,-50%);
        left: 240px;
        transition: all .3s;
        opacity: 0;
      }
    }
  }
}
</style>