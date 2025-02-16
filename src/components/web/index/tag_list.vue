<script lang="ts" setup>
import Q_card from "@/components/web/q_card.vue";
import {reactive} from "vue";
import type {listResponse} from "@/api";
import {tagListApi, type tagListType} from "@/api/search_api.ts";
import {useRoute} from "vue-router";
import router from "@/router";

const route = useRoute()
const data = reactive<listResponse<tagListType>>({
  list: [],
  count: 0
})

async function getData() {

  const res = await tagListApi({limit: 10, page: 1})
  data.list = res.data.list
}

async function goTag(item: tagListType) {
  const tag = String(route.query.tag)
  let _tag: string | undefined = item.tag
  if (tag === item.tag) {
    _tag = undefined
  }
  router.push({
    name: route.name as string,
    query: {
      tag: _tag
    }
  })
}

getData()
</script>

<template>
  <q_card class="q_tag_list_com" title="标签云">
    <div class="tag_list">
      <div v-for="item in data.list" :class="{active: item.tag === route.query.tag}" class="item" @click="goTag(item)">
        <span>
          <a-typography-text :ellipsis="{rows: 1, css: true}">{{ item.tag }} </a-typography-text>
        </span>
        <span>{{ item.articleCount }}</span>
      </div>
    </div>
  </q_card>
</template>

<style lang="less">
@keyframes box_move {
  0% {
    left: 0;
    top: 0;
  }
  25% {
    left: calc(100% - 20px);
    top: 0;
  }
  50% {
    left: calc(100% - 20px);
    top: calc(100% - 20px);
  }
  75% {
    left: 0;
    top: calc(100% - 20px);
  }
  to {
    left: 0;
    top: 0;
  }
}


.q_tag_list_com {
  .body {
    padding: 20px;
    position: relative;

    &::before {
      display: block;
      content: "";
      width: 20px;
      height: 20px;
      background-color: rgb(var(--arcoblue-6));
      position: absolute;
      left: 0;
      top: 0;
      animation-name: box_move;
      animation-duration: 5s;
      animation-iteration-count: infinite;
    }

    .tag_list {
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 50%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--color-text-1);

        &.active {
          span {
            color: rgb(var(--arcoblue-6));
          }
        }

        &:nth-child(4n+3), &:nth-child(4n+4) {
          background-color: var(--color-fill-1);
        }

        &:nth-child(4n+1), &:nth-child(4n+2) {
          background-color: var(--color-fill-2);
        }
      }
    }
  }
}
</style>