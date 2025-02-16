<script lang="ts" setup>
import {reactive, ref} from "vue";
import type {listResponse} from "@/api";
import {collectListApi, type collectListType} from "@/api/collect_api.ts";
import {Message} from "@arco-design/web-vue";
import Q_collect_form_modal from "@/components/web/article/q_collect_form_modal.vue";

interface Props {
  visible: boolean
  articleID?: number
}

const props = defineProps<Props>()
const emits = defineEmits(["update:visible", "select"])
const data = reactive<listResponse<collectListType>>({
  list: [],
  count: 0,
})

async function beforeOpen() {
  data.list = []
  data.count = 0
  const res = await collectListApi({type: 1, articleID: props.articleID})
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}

function cancel() {
  emits("update:visible", false)
}

const collectVisible = ref(false)

function addModal() {
  collectVisible.value = true
}


const title = ref("")


function select(item: collectListType) {
  emits("select", item.id)
  cancel()
}

</script>

<template>
  <a-modal v-model:visible="props.visible" :footer="false" body-class="collect_modal_body scrollbar" title="收藏文章"
           @cancel="cancel"
           @before-open="beforeOpen">
    <q_collect_form_modal v-model:title="title" v-model:visible="collectVisible"
                          @ok="beforeOpen"></q_collect_form_modal>
    <div class="add">
      <div class="inner" @click="addModal">
        <i class="iconfont icon-jiahao"></i>
        <span>创建收藏夹</span>
      </div>
    </div>
    <div class="list">
      <div v-for="item in data.list" class="item">
        <div class="left">
          <div class="title">{{ item.title }}
            <a-tag v-if="item.isDefault" color="blue">默认收藏夹</a-tag>
          </div>
          <div class="count">{{ item.articleCount }}篇文章</div>
        </div>
        <a-button :status="item.articleUse ? 'danger':undefined" size="mini" type="primary" @click="select(item)">
          {{ item.articleUse ? '取消收藏' : '收藏' }}
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<style lang="less">
.collect_modal_body {
  padding: 0;
  max-height: 70vh;
  overflow-y: auto;

  .add {
    padding: 10px 20px;

    .inner {
      border-radius: 5px;
      background-color: var(--color-fill-1);
      padding: 20px;
      display: flex;
      cursor: pointer;
      color: var(--color-text-2);
    }
  }


  .list {
    width: 100%;


    .item {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;

      &:hover {
        background-color: var(--color-fill-1);
      }

      .title {
        font-size: 16px;
      }

      .count {
        font-size: 12px;
        color: var(--color-text-2);
      }

      .arco-btn {
        border-radius: 5px;
      }
    }
  }
}
</style>