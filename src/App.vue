<script lang="ts" setup>
import {userStores} from "@/stores/user_store";
import {loadTheme} from "@/components/common/q_theme.ts";

const store = userStores()
store.loadUserInfo()
//store.loadSiteInfo()
loadTheme()


</script>

<template>
  <RouterView/>
</template>

