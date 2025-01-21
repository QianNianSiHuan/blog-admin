<script lang="ts" setup>

import Comment_tree from "@/components/web/comment/comment_tree.vue";
import {reactive, ref, watch} from "vue";
import type {listResponse} from "@/api";
import {
  commentCreateApi,
  type commentCreateRequest,
  commentTreeApi,
  type commentTreeRequest,
  type commentTreeType
} from "@/api/comment_api";
import {Message} from "@arco-design/web-vue";

interface Props {
  articleId: number
}

const params = reactive<commentTreeRequest>({
  limit: 10,
  page: 1,
  id: 0,
})
const props = defineProps<Props>()

const data = reactive<listResponse<commentTreeType>>({
  list: [],
  count: 0
})

async function getData() {
  params.id = props.articleId
  const res = await commentTreeApi(params)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.list = res.data.list
  data.count = res.data.count
}

const form = reactive<commentCreateRequest>({
  content: "",
  articleID: props.articleId,
  parentID: undefined
})


async function create() {
  form.articleID = props.articleId
  if (form.content.trim() === "") {
    Message.warning("评论不能为空")
    return
  }
  const res = await commentCreateApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  form.content = ""
  getData()
}

watch(() => props.articleId, () => {
  getData()
}, {immediate: true})
const textareaRef = ref()

function focus() {
  textareaRef.value.focus()
}

defineExpose({
      focus,
    }
)
</script>

<template>
  <div class="article_comment_com">
    <div class="add_comment">
      <a-textarea ref="textareaRef" v-model="form.content" :auto-size="{minRows: 5, maxRows: 6}"
                  placeholder="请输入评论内容"
                  @keydown.enter="create"></a-textarea>
      <a-button size="mini" type="primary" @click="create">发布评论</a-button>
    </div>
    <div class="comment_list">
      <comment_tree :list="data.list" @ok="getData"></comment_tree>
      <div v-if="data.list.length" class="page">
        <a-pagination v-model:current="params.page" :page-size="params.limit" :total="data.count" show-total
                      @change="getData"></a-pagination>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.article_comment_com {
  margin-top: 20px;
  border-radius: 5px;
  background: var(--color-bg-1);

  .add_comment {
    padding: 20px;
    position: relative;

    .arco-btn {
      position: absolute;
      right: 30px;
      bottom: 30px;
      z-index: 2;
    }
  }

  .comment_list {
    padding: 0 20px 20px 20px;
    margin-bottom: 20px;


    .arco-comment-inner-comment {
      margin-top: 10px;
    }

    .arco-comment-actions {
      display: flex;
      align-items: center;
      margin-top: 5px;
    }

    .action {
      display: flex;
      align-items: center;

      i {
        margin-left: 5px;
      }

      .icon-xinxi1 {
        font-size: 20px;
        padding-top: 2px;
      }
    }
  }

  .page {
    display: flex;
    justify-content: center;
  }
}
</style>