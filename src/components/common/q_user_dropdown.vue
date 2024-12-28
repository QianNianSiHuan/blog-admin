<script setup lang="ts">
import router from "@/router";
import {userStores} from "@/stores/user_store";
import {ref} from "vue";
import {Message} from "@arco-design/web-vue";

const userStore =userStores()

function handleSelect(val:string){
  if (val==="logout"){
    userStore.userLogout()
    Message.info("用户注销成功")
    return
  }
  router.push({name:val})
}

interface optionType{
  name:string
  title:string
}

const options =ref<optionType[]>([
  {title:"个人信息",name:"userInfo"},
  {title:"注销退出",name:"logout"},
])

if (userStore.isAdmin){
options.value=[
  {title:"个人信息",name:"userInfo"},
  {title:"用户列表",name:"userList"},
  {title:"系统信息",name:"settingsList"},
  {title:"注销退出",name:"logout"},
]
}
</script>

<template>
  <a-dropdown @select="handleSelect" :popup-max-height="false">
    <div class="q_user_dropdown_com">
      <a-avatar :size="32" :image-url="userStore.userInfo.avatar"></a-avatar>
      <span class="user_name">{{userStore.userInfo.nickName}}</span>
      <icon-down/>
    </div>
    <template #content>
      <a-doption v-for="item in options" :value="item.name">{{item.title}}</a-doption>
    </template>
  </a-dropdown>
</template>

<style lang="less">
.q_user_dropdown_com{
  cursor: pointer;
  .user_name{
    margin: 0 5px;
  }
  svg{
    margin-right: 0!important;
  }
}
</style>