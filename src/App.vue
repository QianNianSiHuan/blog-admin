<script setup lang="ts">
import {userStores} from "@/stores/user_store";
const store =userStores()
store.loadUserInfo()
</script>

<template>
  <RouterView />
</template>

