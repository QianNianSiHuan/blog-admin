<script setup lang="ts">
import {userStores} from "@/stores/user_store";
const store =userStores()
store.loadUserInfo()
loadTheme()
import {title, ico} from "@/conf/global";
import {loadTheme} from "@/components/common/q_theme.ts";
if (title){
  document.title = title
}
if (ico){
  const link = document.querySelector('link[rel="icon"]')
  if (link){
    link.setAttribute("href", ico)
  }
}

</script>

<template>
  <RouterView />
</template>

