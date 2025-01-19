<script lang="ts" setup>
import {reactive, ref} from "vue";
import type {listResponse} from "@/api";
import {
  categoryCreateApi,
  type categoryCreateRequest,
  categoryListApi,
  type categoryListType,
  categoryRemoveApi
} from "@/api/category_api.ts";
import {Message} from "@arco-design/web-vue";
import {useRoute} from "vue-router";
import Q_a from "@/components/common/q_a.vue";
import router from "@/router";

const route = useRoute()

interface Props {
  userID: number
  isMe: boolean
}

const props = defineProps<Props>()


const categoryData = reactive<listResponse<categoryListType>>({
  list: [],
  count: 0,
})

async function getCategoryData() {
  const res = await categoryListApi({
    type: 2,
    userID: props.userID,
  })
  if (res.code) {
    Message.error(res.msg)
    return
  }
  categoryData.list = res.data.list
  categoryData.count = res.data.count
}

const visible = ref(false)

const form = reactive<categoryCreateRequest>({
  title: "",
  id: 0,
})

function showEdit(item: categoryListType) {
  form.id = item.id
  form.title = item.title
  visible.value = true
}

function addCategory() {
  form.id = 0
  form.title = ""
  visible.value = true
}

async function addCategoryHandler() {
  if (form.title.trim() === "") {
    Message.warning("收藏夹名称不能为空")
    return
  }
  const res = await categoryCreateApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  getCategoryData()
}


async function removeCategory(item: categoryListType) {
  const res = await categoryRemoveApi([item.id])
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  getCategoryData()
}

function go(item: categoryListType) {
  const categoryID = Number(route.query.categoryID)
  let _id: number | undefined = item.id
  if (categoryID === item.id) {
    _id = undefined
  }

  router.push({
    name: route.name,
    query: {
      ...route.query,
      categoryID: _id,
    },
    params: route.params
  })
}

getCategoryData()
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
    <a-modal v-model:visible="visible" :on-before-ok="addCategoryHandler" :title="form.id?'编辑分类':'创建分类'"
             width="30">
      <a-input v-model="form.title" placeholder="分类名称"></a-input>
    </a-modal>
    <div class="list">
      <div v-for="item in categoryData.list" :class="{active:item.id===Number(route.query.categoryID)}" class="item">
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
              <div class="item delete" @click="removeCategory(item)">删除</div>
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