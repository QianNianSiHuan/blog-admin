<script setup lang="ts">
import {userStores} from "@/stores/user_store";
import {loadTheme} from "@/components/common/q_theme.ts";
const store =userStores()
store.loadUserInfo()
loadTheme()

</script>

<template>
  <RouterView />
</template>

