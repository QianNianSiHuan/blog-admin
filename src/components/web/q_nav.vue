<script setup lang="ts">
import Q_theme from "@/components/common/q_theme.vue";
import {enSlogan, slogan} from "@/conf/global.ts";
import {ref} from "vue";
import Q_user_dropdown from "@/components/common/q_user_dropdown.vue";
import {userStores} from "@/stores/user_store.ts";

const userStore =userStores()

interface Props{
  noScroll?:boolean
  scrollTop?:number
}

const props= defineProps<Props>()
const {noScroll =false,scrollTop=200}=props

const isShow =ref(false)

if(!noScroll){
  window.onscroll =function (){
    const  top = document.documentElement.scrollTop
    if(top>=scrollTop){
      isShow.value=true
    }else {
      isShow.value=false
    }
  }
}


</script>

<template>
<div class="q_nav" :class="{isShow:isShow}">
  <div class="container">
    <div class="slogan">
      <div class="cnSlogan">{{slogan}}</div>
      <div class="enSlogan">{{enSlogan}}</div>
    </div>
    <div class="left">
      <router-link to="/">首页</router-link>
    </div>
    <div class="right">
      <q_theme class="theme"></q_theme>
      <q_user_dropdown v-if="userStore.isLogin"></q_user_dropdown>
      <router-link :to="{name:'login'}" v-else>登录</router-link>
    </div>
  </div>
</div>
</template>

<style lang="less">
.q_nav{
  width: 100vw;
  height: 60px;
  position: fixed;
  top: 0;
  z-index:1000;
  display: flex;
  justify-content: center;
  color: white;
  transition: all .3s;

  &.isShow{
    box-shadow: 0 0 5px rgba(0,0,0,0.06);
    background-color: var(--color-bg-1);
    color: var(--color-text-2);
    .cnSlogan{
      color: var(--color-text-1);
    }
    .enSlogan{
      color: var(--color-text-2);
    }
    a{
      color: var(--color-text-2)!important;
    }
    .theme{
      color: var(--color-text-2)!important;
    }
  }

  .container{
    width: 1200px;
    display: flex;
    align-items: center;
    .slogan{
      width: 10%;
      .cnSlogan{
        font-size: 20px;
      }
      .enSlogan{
        font-size: 12px;
        transform: scale(0.96);
        transform-origin: left center;
      }

    }
    .left{
      width: 70%;
    }

    .right{
      display: flex;
      align-items: center;
      width: 20%;
      .theme{
        margin-right: 20px;
        color: white;
      }
    }
    a{
      font-size: 16px;
      text-decoration: none;
      color: white;
    }
    a.router-link-exact-active{
      color: @primary-6!important;
    }
  }
}
</style>