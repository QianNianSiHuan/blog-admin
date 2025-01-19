<script lang="ts" setup>

import {useRoute} from "vue-router";
import {userBaseStores} from "@/stores/user_base_store";
import QCategoryList from "@/components/web/article/q_category_list.vue";
import Q_article_list from "@/components/web/article/q_article_list.vue";

const route = useRoute()

const userBaseStore = userBaseStores()


</script>

<template>
  <div class="user_article_list_view">
    <q-category-list :is-me="userBaseStore.isMe" :user-i-d="Number(route.params.id)"></q-category-list>
    <q_article_list></q_article_list>
  </div>
</template>

<style lang="less">
.user_article_list_view {
  display: flex;
  height: 100%;

  .q_category_list_com {
    width: 150px;
  }

}

</style>