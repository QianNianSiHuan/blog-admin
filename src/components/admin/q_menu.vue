<script lang="ts" setup>
import type {Component} from "vue";
import {ref, watch} from "vue";
import {IconHome, IconSettings, IconUser} from "@arco-design/web-vue/es/icon"
import {collapsed} from "@/components/admin/q_menu.ts";
import router from "@/router";
import {useRoute} from "vue-router";
import {userStores} from "@/stores/user_store";
import Q_menu_item from "@/components/admin/q_menu_item.vue";

const userStore = userStores()
const route = useRoute()

interface MenuType {
  title: string
  name: string
  icon?: string | Component
  children?: MenuType[]
  role?: number
}

const menuList: MenuType[] = [
  {
    title: "数据统计", name: "home", icon: IconHome
  },
  {
    title: "用户管理", role: 1, name: "userManage", icon: IconUser, children: [
      {title: "用户列表", name: "userList"}
    ]
  },
  {
    title: "文章管理", role: 1, name: "articleManage", icon: IconUser, children: [
      {title: "文章列表", name: "articleList"},
      {title: "评论列表", name: "commentList"},
    ]
  },
  {
    title: "系统管理", role: 1, name: "settingsManage", icon: IconSettings, children: [
      {
        title: "站点配置", name: "siteMange", children: [
          {title: "网站设置", name: "siteMangeSite"},
          {title: "邮箱设置", name: "siteMangeEmail"},
          {title: "QQ设置", name: "siteMangeQQ"},
          {title: "AI设置", name: "siteMangeAI"},
          {title: "七牛云设置", name: "siteMangeQiniu"},
        ]
      },
      {title: "日志列表", name: "logList"},
      {title: "banner管理", name: "bannerList"},
    ]
  },
]

function menuItemClick(key: string) {
  router.push({
    name: key
  })
}

const openKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])

function initRoute() {
  if (route.matched.length >= 3) {
    // 把中间的 name加到 openKeys
    // 1 length - 1
    for (let i = 1; i < route.matched.length - 1; i++) {
      openKeys.value.push(route.matched[i].name as string)
    }
  }

  selectedKeys.value = [route.name as string]
}

watch(() => route.name, () => {
  initRoute()
}, {immediate: true})

</script>


<template>
  <div :class="{collapsed:collapsed}" class="q_menu">
    <div class="q_menu_inner">
      <a-menu
          v-model:collapsed="collapsed"
          v-model:open-keys="openKeys"
          v-model:selected-keys="selectedKeys"
          :default-selected-keys="[route.name]"
          show-collapse-button
          @menu-item-click="menuItemClick">

        <q_menu_item :list="menuList"/>
      </a-menu>
    </div>
  </div>
</template>


<style lang="less">
.q_menu {
  height: calc(100vh - 90px);
  position: relative;

  &.collapsed {
    .arco-menu-collapse-button {
      left: 48px !important;
    }
  }


  &:hover {
    .arco-menu-collapse-button {
      opacity: 1 !important;
    }
  }

  .q_menu_inner {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    .arco-menu {
      position: inherit;

      .arco-menu-collapse-button {
        top: 50%;
        transform: translate(-50%, -50%);
        left: 240px;
        transition: all .3s;
        opacity: 0;
      }
    }
  }
}
</style>