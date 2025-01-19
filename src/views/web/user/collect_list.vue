<script lang="ts" setup>

import {useRoute} from "vue-router";
import {userBaseStores} from "@/stores/user_base_store";
import Q_article_list from "@/components/web/article/q_article_list.vue";
import Q_collect_list from "@/components/web/article/q_collect_list.vue";

const route = useRoute()

const userBaseStore = userBaseStores()


</script>

<template>
  <div class="user_article_list_view">
    <q_collect_list :is-me="userBaseStore.isMe" :user-i-d="Number(route.params.id)"></q_collect_list>
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

  .article_list {
    margin-top: 10px;
    width: calc(100% - 150px);

    .item {
      padding: 10px 20px;
      display: flex;
      position: relative;

      &:hover {
        background-color: var(--color-fill-1);

        .more {
          opacity: 1;
        }
      }

      .cover {
        cursor: pointer;

        img {
          width: 160px;
          margin-right: 10px;
        }
      }

      .user_top {
        position: absolute;
        right: 10px;
        top: 10px;
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          font-size: 15px;
          font-weight: 600;
          color: var(--color-text-1);
          cursor: pointer;
        }

        .abs {
          margin: 5px 0;
        }

        .data {
          display: flex;
          align-items: center;
          color: var(--color-text-2);

          .look, .comment {
            margin-right: 10px;

            span {
              margin-left: 5px;
            }
          }

          .tags {
            margin-right: 10px;
            max-width: 400px;

            .tag {
              margin-right: 10px;
            }
          }

          .date {
            font-size: 12px;
            color: var(--color-text-2);
          }
        }
      }

      .more {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        opacity: 0;
      }
    }

    .page {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}

</style>