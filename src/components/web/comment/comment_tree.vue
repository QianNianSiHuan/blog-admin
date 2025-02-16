<script lang="ts" setup>
import {commentCreateApi, commentDiggApi, commentRemoveApi, type commentTreeType} from "@/api/comment_api";
import {dateCurrentFormat} from "@/utils/data.ts";
import {nextTick} from "vue";
import {Message} from "@arco-design/web-vue";
import {userStores} from "@/stores/user_store.ts";
import {goUser} from "@/utils/go_router.ts";

const userStore = userStores()

interface Props {
  list: commentTreeType[]
  line?: number
}

const emits = defineEmits(["ok"])
const props = defineProps<Props>()

function apply(item: commentTreeType) {
  item.isApply = !item.isApply
  if (!item.isApply) {
    return
  }
  nextTick(() => {
    const div = document.querySelector(`apply_comment_ipt_${item.id} input`) as HTMLInputElement;
    div.focus()
  })
}

async function applyComment(item: commentTreeType) {
  if (item.applyContent?.trim() === "") {
    Message.warning("请输入回复内容")
    return
  }
  const res = await commentCreateApi({
    content: item.applyContent as string,
    articleID: item.articleID,
    parentID: item.id,
  })
  if (res.code) {
    Message.error(res.msg)
    return
  } else {
    Message.success(res.msg)
  }
  emits("ok")
}

function ok() {
  emits("ok")
}


async function digg(item: commentTreeType) {
  const res = await commentDiggApi(item.id)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  item.isDigg = !item.isDigg
  if (item.isDigg) {
    item.diggCount++
  } else {
    item.diggCount--
  }
}

async function remove(item: commentTreeType) {
  const res = await commentRemoveApi(item.id)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  emits("ok")
}

</script>

<template>
  <a-comment v-for="item in props.list" :content="item.content"
             :datetime="dateCurrentFormat(item.createdAt)"
             class="comment_tree_com">
    <template #actions>
      <span key="heart" :class="{active:item.isDigg}" class="action" @click="digg(item)">
        <i class="iconfont icon-dianzan_kuai"></i>点赞 ({{ item.diggCount }})
      </span>
      <span v-if="!(props.line as number > userStore.siteInfo.article.commentLine-1)" key="reply" class="action"
            @click="apply(item)">
        <i class="iconfont icon-xinxi1"></i> 回复 ({{ item.applyCount }})
      </span>
      <a-popconfirm content="确定要删除吗?" @ok="remove(item)">
        <span v-if="item.userID===userStore.userInfo.userID" class="action">
        <i><IconDelete></IconDelete></i>
        删除
      </span>
      </a-popconfirm>
    </template>
    <template #avatar>
      <a-avatar :image-url="item.userAvatar" @click="goUser(item.userID)"></a-avatar>
    </template>
    <template #author>
      <span>{{ item.userNickname }}</span>
    </template>
    <div v-if="item.isApply" class="apply_comment">
      <a-input v-model="item.applyContent" :class="`apply_comment_ipt_${item.id}`"
               :placeholder="`回复${item.userNickname}`"></a-input>
      <a-button type="primary" @click="applyComment(item)">回复</a-button>
    </div>
    <comment_tree v-if="item.subComments?.length" :line="props.line as number+1" :list="item.subComments"
                  @ok="ok"></comment_tree>
  </a-comment>
</template>

<style lang="less">
.comment_tree_com {
  .action {
    cursor: pointer;

    &:hover {
      color: rgb(var(--arcoblue-6));
    }

    &.active {
      color: rgb(var(--arcoblue-6));
    }
  }

  .apply_comment {
    display: flex;
    align-items: center;

    .arco-btn {
      margin-left: 10px;
    }
  }
}
</style>