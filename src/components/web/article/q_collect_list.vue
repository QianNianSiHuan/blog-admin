<script lang="ts" setup>
import {reactive, ref} from "vue";
import type {listResponse} from "@/api";
import {Message} from "@arco-design/web-vue";
import {useRoute} from "vue-router";
import Q_a from "@/components/common/q_a.vue";
import router from "@/router";
import {type collectCreatRequest, collectListApi, type collectListType, collectRemoveApi} from "@/api/collect_api.ts";
import Q_collect_form_modal from "@/components/web/article/q_collect_form_modal.vue";

const route = useRoute()

interface Props {
  userID: number
  isMe: boolean
}

const props = defineProps<Props>()


const collectData = reactive<listResponse<collectListType>>({
  list: [],
  count: 0,
})

async function getCollectData() {
  const res = await collectListApi({
    type: 2,
    userID: props.userID,
  })
  if (res.code) {
    Message.error(res.msg)
    return
  }
  collectData.list = res.data.list
  collectData.count = res.data.count
}

const visible = ref(false)

const form = reactive<collectCreatRequest>({
  title: "",
  id: 0,
  abstract: "",
})

function showEdit(item: collectListType) {
  form.id = item.id
  form.title = item.title
  form.abstract = item.abstract
  visible.value = true
}

function addCategory() {
  form.id = 0
  form.title = ""
  form.abstract = ""
  visible.value = true
}

const formRef = ref()

async function removeCollect(item: collectListType) {
  const res = await collectRemoveApi([item.id])
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  getCollectData()
}

function go(item: collectListType) {
  const collectID = Number(route.query.collectID)
  let _id: number | undefined = item.id
  if (collectID === item.id) {
    _id = undefined
  }

  router.push({
    name: route.name,
    query: {
      ...route.query,
      collectID: _id,
    },
    params: route.params
  })
}

getCollectData()
</script>

<template>
  <div class="q_category_list_com">
    <div v-if="props.isMe" class="add">
      <a-button long type="outline" @click="addCategory">
        <template #icon>
          <icon-plus></icon-plus>
        </template>
        创建
      </a-button>
    </div>
    <q_collect_form_modal v-if="props.isMe" :id="form.id" v-model:abstract="form.abstract"
                          v-model:title="form.title" v-model:visible="visible"
                          @ok="getCollectData"></q_collect_form_modal>
    <div class="list">
      <div v-for="item in collectData.list" :class="{active:item.id===Number(route.query.collectID)}" class="item">
        <a-trigger v-if="props.isMe" align-point class="category_trigger" trigger="contextMenu">
          <q_a @click="go(item)">
            <span>
              <a-typography-text :ellipsis="{css:true,rows:1}">{{ item.title }}</a-typography-text>
            </span>
            <span>{{ item.articleCount }}</span>
          </q_a>
          <template #content>
            <div class="content">
              <div class="item" @click="showEdit(item)">编辑</div>
              <div class="item delete" @click="removeCollect(item)">删除</div>
            </div>
          </template>
        </a-trigger>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.q_category_list_com {
  width: 100%;
  border-right: @q_border;
  padding: 10px;

  .arco-btn {
    border-radius: 100px;
  }

  .list {
    margin-top: 20px;

    .item {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;

      &:hover {
        background-color: var(--color-fill-1);
      }

      a {
        width: 100%;
        height: 100%;
        align-items: center;
        display: flex;
        justify-content: space-between;
        color: var(--color-text-2);

        span:nth-child(1) {
          width: 5rem;
        }
      }
    }

    .item.active {
      a {
        color: rgb(var(--arcoblue-6));

        span {
          color: rgb(var(--arcoblue-6));
        }
      }
    }
  }
}

.category_trigger {
  background: var(--color-bg-1);
  border-radius: 5px;
  border: @q_border;

  .item {
    padding: 10px 20px;
    cursor: pointer;


    &:hover {
      background: var(--color-fill-1);
    }
  }

  .delete {
    color: red;
  }
}
</style>