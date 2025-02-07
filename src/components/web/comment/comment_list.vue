<script lang="ts" setup>
import {reactive, ref, watch} from "vue";
import type {listResponse} from "@/api";
import {commentListApi, type commentListRequest, type commentListType, commentRemoveApi} from "@/api/comment_api.ts";
import {Message} from "@arco-design/web-vue";
import {useRoute} from "vue-router";

interface Props {
  type: 1 | 2
  status: 0 | 2
}

const loading = ref<boolean>(false);
const props = defineProps<Props>()
const data = reactive<listResponse<commentListType>>({
  list: [],
  count: 0,
})
const params = reactive<commentListRequest>({
  type: props.type,
  limit: 10,
  status: props.status
})

const checkIDList = ref<number[]>([])
const route = useRoute()

async function getData() {
  loading.value = true
  data.list = []
  const res = await commentListApi(params);
  if (res.code) {
    Message.error(res.msg);
    loading.value = false
    return;
  }
  Object.assign(data, res.data);
  loading.value = false
}

getData()

async function removeComment() {
  const resList = await Promise.all(checkIDList.value.map((item) => commentRemoveApi(item)))
  resList.forEach((res) => {
    if (res.code) {
      Message.error(res.msg)
      return;
    }
    Message.success(res.msg)
  })
  checkIDList.value = []
  getData()
}

async function checkAll(val: boolean) {
  if (val) {
    checkIDList.value = data.list.map((item) => item.id)
  }
  checkIDList.value = []
}

const isCheckAll = ref<boolean>(false);
watch(() => route.query.key, () => {
  if (route.query.key) {
    params.key = route.query.key as string;
    getData()
  }
})

defineExpose({
  getData,
})


</script>

<template>
  <div class="comment_list_com">
    <div v-if="data.list.length" class="actions">
      <a-checkbox v-model="isCheckAll" @click="checkAll">全选</a-checkbox>
      <a-button v-if="checkIDList.length > 0" size="mini" status="danger" type="primary" @click="removeComment">删除
      </a-button>
    </div>
    <div class="comment_list">
      <a-spin :loading="loading" style="width: 100%">
        <a-checkbox-group v-model="checkIDList">
          <div v-for="item in data.list" class="item">
            <div class="check">
              <a-checkbox :value="item.id"></a-checkbox>
            </div>
            <slot :item="item"></slot>
          </div>
        </a-checkbox-group>
      </a-spin>

      <div v-if="data.list.length" class="page">
        <a-pagination v-model:current="params.page" :page-size="params.limit" :total="data.count" show-total
                      @change="getData"></a-pagination>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.comment_list_com {
  .actions {
    display: flex;
    align-items: center;
    height: 24px;

    .arco-btn {
      margin-left: 10px;
    }

    > .comment_list {
      min-height: 400px;

      .arco-checkbox-group {
        width: 100%;
      }
    }

    .page {
      display: flex;
      margin-top: 10px;
      justify-content: center;
    }
  }
}
</style>