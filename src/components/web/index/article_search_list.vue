<script lang="ts" setup>
import {articleSearchApi, type articleSearchRequest, type articleSearchType} from "@/api/search_api.ts";
import {reactive, ref, watch} from "vue";
import type {listResponse} from "@/api";
import {Message} from "@arco-design/web-vue";
import {goArticle, goUser} from "@/utils/go_router.ts";
import {dateCurrentFormat} from "@/utils/data.ts";
import {useRoute} from "vue-router";

const route = useRoute()

const data = reactive<listResponse<articleSearchType>>({
  list: [],
  count: 0
})
const animation = ref(false)
const params = reactive<articleSearchRequest>({
  limit: 5,
  page: 1,
  type: 0,
  tag: "",
})

async function getData() {
  animation.value = true
  const res = await articleSearchApi(params)
  animation.value = false
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.count = res.data.count
  data.list = res.data.list
  //Message.success(res.msg)
}

async function setType(t: number) {
  params.type = t;
  getData()
}

watch(() => route.query.tag, () => {
  const tag = String(route.query.tag)
  if (tag !== undefined) {
    params.tag = undefined
  } else {
    params.tag = tag
  }
  if (route.query.tag !== undefined) {
    params.tag = route.query.tag as string
  }
  getData()
}, {immediate: true});

getData()
</script>

<template>
  <div class="article_search_list_com">
    <div class="head">
      <div class="left">
        <span :class="{active: params.type === 0}" @click="setType(0)">猜你喜欢</span>
        <span :class="{active: params.type === 1}" @click="setType(1)">最新发布</span>
        <span :class="{active: params.type === 2}" @click="setType(2)">最多回复</span>
        <span :class="{active: params.type === 3}" @click="setType(3)">最多点赞</span>
        <span :class="{active: params.type === 4}" @click="setType(4)">最多收藏</span>
      </div>
      <a-input-search v-model="params.key" placeholder="搜索你感兴趣的文章" @search="getData"
                      @keydown.enter="getData"></a-input-search>
    </div>
    <div class="list">
      <a-skeleton v-if="animation" :animation="animation">
        <a-space :style="{width:'100%'}" direction="vertical" size="large">
          <a-skeleton-line :rows="24"/>
        </a-space>
      </a-skeleton>
      <div v-for="item in data.list" v-if="!animation" class="item">
        <div class="top_info">
          <a-avatar :image-url="item.userAvatar" :size="30" style="cursor: pointer"
                    @click="goUser(item.userID)"></a-avatar>
          <span class="nick" @click="goUser(item.userID)">{{ item.userNickname }}</span>
          <span class="date">最后更新于{{ dateCurrentFormat(item.UpdatedAt) }}</span>
          <div v-if="item.adminTop" class="admin_top">
            <i class="iconfont icon-tubiao02"></i>
            管理员置顶
          </div>
        </div>
        <div class="article_info">
          <div v-if="item.cover" class="cover">
            <img :src="item.cover" alt="" @click="goArticle(item.id)">
          </div>
          <div class="info">
            <div class="title" @click="goArticle(item.id)" v-html="item.title"></div>
            <div class="abs">
              <a-typography-text :ellipsis="{rows: 2, css: true}">
                <div v-html="item.abstract"></div>
              </a-typography-text>
            </div>
            <div class="data">
              <div v-if="item.categoryTitle" class="catalog">
                {{ item.categoryTitle }}
              </div>
              <div class="data_list">
                  <span>
                <i class="iconfont icon-liulanliang"></i>
                {{ item.lookCount }}
              </span>
                <span>
                <i class="iconfont icon-dianzan_kuai"></i>
                {{ item.diggCount }}
              </span>
                <span>
                <i class="iconfont icon-shoucang1"></i>
                {{ item.collectCount }}
              </span>
                <span>
                <i class="iconfont icon-xinxi1"></i>
                {{ item.commentCount }}
              </span>
              </div>

              <div class="tags">
                <a-overflow-list>
                  <a-tag v-for="tag in item.tagList">{{ tag }}</a-tag>
                </a-overflow-list>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="data.list.length" class="page">
      <a-pagination v-model:current="params.page" :page-size="params.limit" :total="data.count" show-total
                    @change="getData"></a-pagination>
    </div>
  </div>
</template>

<style lang="less">
.article_search_list_com {
  background-color: var(--color-bg-1);
  border-radius: 5px;


  .head {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: @q_border;

    .arco-input-wrapper {
      width: 200px;
      border-radius: 100px;
    }

    .left {
      span {
        cursor: pointer;
        margin-right: 20px;
        color: var(--color-text-1);

        &.active {
          color: rgb(var(--arcoblue-6));
        }
      }

    }
  }

  .list {
    padding: 0 20px 10px 20px;

    .arco-skeleton {
      padding: 20px 0;
    }

    .item {
      padding: 20px 0;
      border-bottom: @q_border;


      em {
        color: red;
      }

      .top_info {
        display: flex;
        align-items: center;

        .nick {
          margin-left: 10px;
          cursor: pointer;
        }

        .date {
          margin-left: 20px;
          font-size: 12px;
          color: var(--color-text-2);
        }

        .admin_top {
          right: 0;
          top: 10px;
          color: rgb(var(--arcoblue-6));
          font-size: 12px;
          display: flex;
          align-items: center;

          i {
            margin-right: 5px;
          }
        }

      }

      .article_info {
        display: flex;
        margin-top: 5px;

        .cover {
          height: 100px;
          width: 177px;
          flex-shrink: 0;
          margin-right: 10px;
          border-radius: 5px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
          }
        }

        .info {
          .title {
            font-size: 17px;
            font-weight: 600;
            color: var(--color-text-1);
            cursor: pointer;
          }

          .abs {
            margin: 5px 0;
            cursor: pointer;
          }

          .data {
            display: flex;
            align-items: center;


            .catalog {
              margin-right: 10px;
              color: var(--color-text-2);
            }

            .data_list {
              display: flex;
              align-items: center;
              color: var(--color-text-2);

              span {
                margin-right: 10px;
              }

              i {
                margin-right: 5px;
              }
            }

            .tags {
              span {
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }

  .page {
    display: flex;
    justify-content: center;
    padding: 10px 0 20px 0;
  }
}

</style>