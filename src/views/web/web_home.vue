<script lang="ts" setup>
import Q_nav from "@/components/web/q_nav.vue";
import Q_main from "@/components/web/q_main.vue";
import Banner_list from "@/components/web/index/banner_list.vue";
import Article_search_list from "@/components/web/index/article_search_list.vue";
import Tag_list from "@/components/web/index/tag_list.vue";
import Auth_recommend from "@/components/web/index/auth_recommend.vue";
import Article_recommend from "@/components/web/index/article_recommend.vue";
import About from "@/components/web/index/about.vue";
import Extension from "@/components/web/index/extension.vue";
import Feedback from "@/components/web/index/feedback.vue";
import {userStores} from "@/stores/user_store.ts";

const userStore = userStores()
const map = {
  "标签云": Tag_list,
  "作者推荐": Auth_recommend,
  "文章推荐": Article_recommend,
  "关于我们": About,
  "独家推广": Extension,
  "用户反馈": Feedback,
}
</script>

<template>
  <div class="web_home_view">
    <q_nav no-scroll></q_nav>
    <q_main>
      <div class="left">
        <div class="banner">
          <banner_list></banner_list>
        </div>
        <div class="article_list">
          <article_search_list></article_search_list>
        </div>
      </div>
      <div class="right">
        <template v-for="item in userStore.siteInfo.indexRight.List">
          <component :is="map[item.title]" v-if="item.enable"></component>
        </template>
      </div>
    </q_main>
  </div>
</template>

<style lang="less">
.web_home_view {
  .q_container {
    display: flex;
    justify-content: space-between;

    > .left {
      width: calc(100% - 280px);

      .q_banner_com {
        margin-top: 20px;
      }

      .article_search_list_com {
        margin-bottom: 20px;
        margin-top: 20px;
      }
    }

    > .right {
      width: 260px;
      padding: 20px 0;
      display: grid;
      grid-row-gap: 20px;
      align-content: start;
    }
  }
}
</style>