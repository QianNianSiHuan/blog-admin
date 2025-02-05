<script lang="ts" setup>
import {reactive, ref, watch} from "vue";
import type {listResponse} from "@/api";
import {articleListApi, type articleListRequest, type articleListType} from "@/api/article_api.ts";
import {Message} from "@arco-design/web-vue";
import {goArticle} from "@/utils/go_router.ts";
import {dateCurrentFormat} from "@/utils/data.ts";
import {useRoute} from "vue-router";

const route = useRoute()

interface Props {
  isCheck?: boolean
}

const isCheckShow = ref<boolean>(false)
const props = defineProps<Props>()
const emits = defineEmits(["dispatchDelete"])
const checkIDList = ref<number[]>([])

const data = reactive<listResponse<articleListType>>({
  list: [],
  count: 0,
})
const params = reactive<articleListRequest>({
  type: 1,
  userID: Number(route.params.id)
})

async function getData() {
  const res = await articleListApi(params)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.list = res.data.list
  data.count = res.data.count
}

watch(() => route.query, () => {
  const categoryID = Number(route.query.categoryID)
  if (isNaN(categoryID)) {
    params.categoryID = undefined
  } else {
    params.categoryID = categoryID
  }

  const collect = Number(route.query.collectID)
  if (isNaN(collect)) {
    params.collectID = undefined
  } else {
    params.collectID = collect
  }

  if (route.query.key !== undefined) {
    params.key = route.query.key as string
  }
  getData()
}, {deep: true})

function isCheckHandler() {
  isCheckShow.value = !isCheckShow.value
}

function dispatchDelete() {
  emits("dispatchDelete", checkIDList.value)
  checkIDList.value = []
}

watch(() => route.params.id, () => {
  const userId = Number(route.params.id)
  if (!isNaN(userId)) {
    params.userID = userId
    getData()
  }
})


defineExpose({
  getData
})
getData()
</script>

<template>
  <div class="q_article_list_parent_com scrollbar">
    <div v-if="props.isCheck" class="actions">
      <span class="dispatch_span" @click="isCheckHandler">批量操作</span>
      <a-button v-if="checkIDList.length && isCheckShow" size="mini" status="danger" @click="dispatchDelete">批量移除
      </a-button>
    </div>
    <div class="q_article_list_com">
      <a-checkbox-group v-model="checkIDList">
        <div v-for="item in data.list" class="item">
          <div v-if="props.isCheck && isCheckShow" class="check">
            <a-checkbox :value="item.id"></a-checkbox>
          </div>
          <div class="cover">
            <img v-if="item.cover" :src="item.cover" alt="" @click="goArticle(item.id)">
          </div>
          <div v-if="item.userTop" class="user_top">
            <a-tag color="blue">用户置顶</a-tag>
          </div>
          <div class="info">
            <div class="title" @click="goArticle(item.id)">{{ item.title }}</div>
            <div class="abs">
              <a-typography-text :ellipsis="{rows:2,css:true}">
                {{ item.abstract }}
              </a-typography-text>
            </div>
            <div class="data">
              <div class="look">
                <IconEye></IconEye>
                <span>{{ item.lookCount }}</span>
              </div>
              <div class="comment">
                <IconMessage></IconMessage>
                <span>{{ item.commentCount }}</span>
              </div>
              <div class="tags">
                <template v-if="item.tagList.length<=5">
                  <a-tag v-for="tag in item.tagList" class="tag">{{ tag }}</a-tag>
                </template>
                <a-overflow-list v-else>
                  <a-tag v-for="tag in item.tagList">{{ tag }}</a-tag>
                </a-overflow-list>
              </div>
              <div class="date">最后更新于{{ dateCurrentFormat(item.UpdatedAt) }}</div>
            </div>
          </div>
        </div>
      </a-checkbox-group>
      <div v-if="data.count" class="page">
        <a-pagination v-if="data.list.length" v-model:current="params.page" :page-size="params.limit"
                      :total="data.count" show-total
                      @change="getData"></a-pagination>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.q_article_list_parent_com {
  overflow-y: auto;
  width: calc(100% - 150px);

  .actions {
    height: 35px;
    display: flex;
    align-items: center;
    padding: 0 20px;

    .dispatch_span {
      color: var(--color-text-1);
      margin-right: 20px;
      cursor: pointer;
    }
  }

  .q_article_list_com {
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