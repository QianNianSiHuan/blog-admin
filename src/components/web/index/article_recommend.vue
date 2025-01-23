<script lang="ts" setup>
import {reactive} from "vue";
import type {listResponse} from "@/api";
import {articleRecommendListApi, type articleRecommendListType} from "@/api/article_api.ts";
import Q_card from "@/components/web/q_card.vue";

const data = reactive<listResponse<articleRecommendListType>>({
  list: [],
  count: 0
})

async function getData() {
  const res = await articleRecommendListApi({limit: 6, page: 1});
  data.list = res.data.list;
}

getData()
</script>

<template>
  <q_card class="article_recommend_com" title="文章推荐">
    <div v-for="item in data.list" class="item">
      <router-link :to="{name: 'articleDetail', params: {id: item.id}}">
        <a-typography-text :ellipsis="{rows: 1}">{{ item.title }}</a-typography-text>
      </router-link>
    </div>
  </q_card>
</template>

<style lang="less">
.article_recommend_com {
  .item {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    align-items: center;
  }
  
}
</style>