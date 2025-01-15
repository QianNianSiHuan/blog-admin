<script setup lang="ts">
import Q_main from "@/components/web/q_main.vue";
import Q_nav from "@/components/web/q_nav.vue";
import {userCenterStores} from "@/stores/user_center_store.ts";

const userCenterStore =userCenterStores()
userCenterStore.getUserDetail()
</script>

<template>
<div class="user_center_view">
  <q_nav no-scroll></q_nav>
  <q_main>
    <div class="menu">
      <router-link :to="{name:'userCenterInfo'}">个人资料</router-link>
      <router-link :to="{name:'userCenterAccount'}">账号设置</router-link>
      <router-link :to="{name:'userCenterPrivacy'}">隐私设置</router-link>
      <router-link :to="{name:'userCenterHome'}">主页设置</router-link>
      <router-link :to="{name:'userCenterHistory'}">历史浏览</router-link>
    </div>
    <div class="view">
      <router-view/>
    </div>
  </q_main>
  <div class="menu">

  </div>
  <div class="view">

  </div>
</div>
</template>

<style lang="less">
.user_center_view{
  .q_main{
    height: calc(100vh - 60px);
  }


  .q_container{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .menu{
      width: 180px;
      max-height: 400px;
      background: var(--color-bg-1);
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      padding: 20px 0;

      a{
        height: 40px;
        display: flex;
        color: var(--color-text-2);
        justify-content: center;
        align-items: center;
      }
      a:hover{
        background: var(--color-fill-1);
      }
      a.router-link-active{
        background: var(--color-fill-1);
        color: rgba(var(--arcoblue-6));
      }
    }
    .view{
      width:calc(100% - 200px);
    }
  }
}
</style>