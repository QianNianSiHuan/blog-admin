<script setup lang="ts">
import {ref, watch} from "vue";
import type {Component} from "vue";
import {IconHome,IconUser,IconSettings}from"@arco-design/web-vue/es/icon"
import {collapsed} from "@/components/admin/q_menu.ts";
import router from "@/router";
import {useRoute} from "vue-router";
import {userStores} from "@/stores/user_store";
import Q_menu_item from "@/components/admin/q_menu_item.vue";

const userStore = userStores()
const route = useRoute()
interface MenuType {
  title:string
  name:string
  icon?:string|Component
  children?:MenuType[]
  role?:number
}

const menuList:MenuType[] = [
  {
    title:"首页",name:"home",icon:IconHome
  },
  {title:"个人中心",role:1,name:"userCenter",icon:IconUser,children:[
      {title:"个人信息",name:"userInfo"}
    ]
  },
  {
    title:"用户管理",role:1,name:"userManage",icon:IconUser,children:[
      {title:"用户列表",name:"userList"}
    ]
  },
  {
    title: "系统管理",role:1, name: "settingsManage", icon: IconSettings, children: [
      {title: "站点配置", name: "siteMange",children:[
          {title:"网站设置",name:"siteMangeSite"},
          {title:"邮箱设置",name:"siteMangeEmail"}
        ]},
      {title: "日志列表", name: "logList"}
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

    <q_menu_item :list="menuList"/>
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