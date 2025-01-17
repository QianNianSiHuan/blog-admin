<script lang="ts" setup>
import {ref} from "vue";
import router from "@/router";
import {useRoute} from "vue-router";

const key = ref("")
const route = useRoute()

async function search() {
  router.push({
    name: route.name as string,
    query: {
      key: key.value,
    }
  })
}
</script>

<template>
  <div class="comment_view">
    <div class="head">
      <div class="title">评论</div>
      <a-input-search v-model="key" placeholder="搜索文章评论" @search="search"
                      @keydown.enter="search"></a-input-search>
    </div>
    <div class="body scrollbar">
      <div class="menu">
        <router-link :to="{name:'platformCommentArticle'}">文章评论</router-link>
        <router-link :to="{name:'platformCommentMy'}">我的评论</router-link>
      </div>
      <div class="sub_view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="less">

.comment_view {
  background: var(--color-bg-1);
  border-radius: 5px;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 10px 20px;
    border-bottom: @q_border;

    .title {
      font-size: 16px;
      font-weight: 600;
    }

    .arco-input-wrapper {
      width: 200px;
      border-radius: 100px;
    }
  }

  > .body {
    padding: 10px 20px 10px 20px;
    max-height: calc(100vh - 160px);
    overflow-y: auto;

    .menu {
      a {
        margin-right: 20px;
        color: var(--color-text-2);
      }

      a.router-link-active {
        color: rgb(var(--arcoblue-6));
      }
    }

    .sub_view {
      margin-top: 10px;
    }
  }
}
</style>