<script lang="ts" setup>
import Q_card from "@/components/web/q_card.vue";
import {reactive} from "vue";
import type {listResponse} from "@/api";
import {authRecommendListApi, type authRecommendListType} from "@/api/article_api.ts";

const data = reactive<listResponse<authRecommendListType>>({
  list: [],
  count: 0
})

async function getData() {
  const res = await authRecommendListApi({limit: 6, page: 1});
  data.list = res.data.list;
}

getData()
</script>

<template>
  <q_card class="auth_recommend_com" title="作者推荐">
    <div v-for="item in data.list" class="item">
      <a-avatar :image-url="item.userAvatar"></a-avatar>
      <div class="info">
        <div class="title">
          <a-typography-text :ellipsis="{rows: 1}">{{ item.userNickname }}</a-typography-text>
        </div>
        <div class="abs">
          <a-typography-text :ellipsis="{rows: 1}">{{ item.userAbstract }}</a-typography-text>
        </div>
      </div>
      <!--      <a-button size="mini" type="outline" @click="focus(item.userID)">关注</a-button>-->
    </div>
  </q_card>
</template>

<style lang="less">
.auth_recommend_com {
  .item {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    align-items: center;
  }


  .info {
    .title {
      font-size: 16px;
    }

    .arco-typography {
      color: var(--color-text-2);
    }
  }

  .arco-btn {
    border-radius: 50px;
    align-items: center;
  }
}
</style>