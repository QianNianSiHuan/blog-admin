<script setup lang="ts">
import Q_theme from "@/components/common/q_theme.vue";
import Q_screen from "@/components/common/q_screen.vue";
import Q_menu from "@/components/admin/q_menu.vue";
import {collapsed} from "@/components/admin/q_menu.ts";
import Q_breadcrumb from "@/components/admin/q_breadcrumb.vue";
import Q_user_dropdown from "@/components/common/q_user_dropdown.vue";
import router from "@/router";
import Q_tabs from "@/components/admin/q_tabs.vue";
import Q_logo from "@/components/admin/q_logo.vue";

import {userStores} from "@/stores/user_store";
const store =userStores()
store.loadUserInfo()

function goHome(){
  router.push({name:"web"})
}
</script>



<template>
  <div>
<div class = "q_admin">
<!--  左边-->
  <div class="q_aside" :class="{collapsed:collapsed}">
<!--    左边图标-->
    <q_logo/>
<!--    左边菜单-->
    <q_menu/>
  </div>
<!--  右边-->
  <div class="q_main">
<!--    右边顶部-->
    <div class="q_head">
      <q_breadcrumb/>
      <!--    右边可切换区域-->
      <div class="q_actions">
        <span title="去首页" @click="goHome()"><icon-home/></span>
        <q_theme/>
        <q_screen/>
        <q_user_dropdown/>
        <!--    右边面包屑-->
      </div>
    </div>
    <q_tabs/>
    <div class="q_container scrollbar">
      <router-view v-slot="{Component}" class="q_base_view">
        <transition name="fade" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
</div>
</div>
</template>



<style lang="less">

.q_admin{
  display: flex;
  background-color:var(--color-bg-1) ;
  color:@color-text-1;
  .q_aside{
    width: 240px;
    height: 100vh;
    border-right: @q_border;
    transition: width .3s;
    .q_logo{
      width: 100%;
      height: 90px;
      border-bottom: @q_border;
    }
    &.collapsed{
      width: 48px;
      &~.q_main{
        width: calc(100% - 48px);
      }
    }
  }
  .q_main{
    transition: width .3s;
    width: calc(100% - 240px);

    .q_head {
      width: 100%;
      height: 60px;
      border-bottom: @q_border;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;

      .q_actions{
        display: flex;
        align-items: center;
        svg {
          font-size: 18px;
          cursor: pointer;
          margin-right: 10px;

        }
      }
    }
    .q_tabs{
      width: 100%;
      height: 30px;
      border-bottom:  @q_border;
    }
    .q_container{
      width: 100%;
      height: calc(100vh - 90px);
      overflow-y: auto;
      overflow-x: hidden;
      background-color: @color-fill-2;
      padding: 20px;

      .q_base_view{
        background-color: var(--color-bg-1);
        border-radius: 5px;
        min-height: calc(100vh - 130px);
      }
    }
  }
}

// 组件刚开始离开
.fade-leave-active{
}
// 组件离开结束
.fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

// 组件刚开始进入
.fade-enter-active {
  transform: translateX(-30px);
  opacity: 0;
}

// 组件进入完成
.fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}

// 正在进入和离开
.fade-leave-active, .fade-enter-active {
  transition: all .3s ease-out;
}

</style>