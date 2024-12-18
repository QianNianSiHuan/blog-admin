<script setup lang="ts">
import router from "@/router";

function handleSelect(val:string){
  if (val==="logout"){
    return
  }
  router.push({name:val})
}
interface OptionTYpe{
  name:string
  title:string
}

const options:OptionTYpe[] =[
  {title:"个人信息",name:"userInfo"},
  {title:"用户列表",name:"userList"},
  {title:"系统信息",name:"settingsList"},
  {title:"注销退出",name:"logout"},
]
</script>

<template>
  <a-dropdown @select="handleSelect" :popup-max-height="false">
    <div class="q_user_dropdown_com">
      <a-avatar :size="32" image-url="http://qiniuyun.starletter.cn/picture/20241211171339922.jpg"></a-avatar>
      <span class="user_name">都是假象</span>
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