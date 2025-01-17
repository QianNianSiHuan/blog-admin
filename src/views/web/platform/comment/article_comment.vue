<script lang="ts" setup>
import {commentCreateApi, type commentCreateRequest, type commentListType} from "@/api/comment_api.ts";
import {dateTimeFormat} from "@/utils/data.ts";
import Q_label from "@/components/admin/q_label.vue";
import {relationOptions} from "@/options/options.ts";
import Comment_list from "@/components/web/comment/comment_list.vue";
import Q_a from "@/components/common/q_a.vue";
import {reactive, ref} from "vue";
import {Message} from "@arco-design/web-vue";

const textareaRef = ref()
const form = reactive<commentCreateRequest>({
  content: "",
  articleID: 0,
  parentID: 0,
})
const commentRef = ref()

async function apply(item: commentListType) {
  form.articleID = item.articleID
  form.parentID = item.id
  if (form.content.trim() === "") {
    Message.warning("请输入回复")
    return
  }
  const res = await commentCreateApi(form)
  if (res.code) {
    Message.error(res.msg)
    return;
  }
  form.content = ""
  item.visible = false
  Message.success(res.msg)
  commentRef.value.getData()
}

function show() {
  textareaRef.value?.focus()
}

function hide() {

}


</script>

<template>
  <div class="article_comment_view">
    <comment_list ref="commentRef" v-slot="{item}:{item:commentListType}" :type="1">
      <div class="user">
        <a-avatar :image-url="item.userAvatar"></a-avatar>
      </div>
      <div class="info">
        <div class="nickname">
          <span class="nick">{{ item.userNickname }}</span>
          <span v-if="!item.isMe"><q_label :options="relationOptions"
                                           :value="item.relation as number"></q_label></span>
          <span v-if="!item.articleCover" class="article">
              评论了文章:<router-link to="">{{ item.articleTitle }}</router-link>
            </span>
        </div>
        <div class="content">
          <a-typography-text :ellipsis="{rows:2,css:true}"> {{ item.content }}</a-typography-text>
        </div>
        <div class="data">
          <span class="date">{{ dateTimeFormat(item.createdAt) }}</span>
          <span class="digg">
              <i class="iconfont icon-dianzan" title="点赞"></i>
              <span>{{ item.diggCount }}</span>
            </span>
          <a-trigger v-model:popup-visible="item.visible" :unmount-on-close="false"
                     content-class="apply_comment_trigger" trigger="click"
                     @hide="hide" @show="show">
            <q_a class="apply">回复</q_a>
            <template #content>
              <a-button size="mini" type="primary" @click="apply(item)">回复</a-button>
              <a-textarea ref="textareaRef" v-model="form.content" :auto-size="{minRows: 3}"
                          placeholder="请输入回复的内容"
                          @keydown.enter="apply(item)"></a-textarea>
            </template>
          </a-trigger>
        </div>
      </div>
      <div class="cover">
        <img :src="item.articleCover" alt=""/>
        <span>
            <a-typography-text :ellipsis="{rows:1,css:true}">文章: {{ item.articleTitle }}</a-typography-text>
          </span>
      </div>
    </comment_list>
  </div>
</template>

<style lang="less">
.article_comment_view {

  .item {
    display: flex;
    margin-top: 10px;
    border-bottom: @q_border;
    padding-bottom: 10px;

    .check {
      width: 25px;
      margin-top: 13px;
    }

    .user {
      width: 50px;
    }

    .cover {
      width: 100px;
      display: flex;
      align-items: center;
      flex-direction: column;

      img {
        width: 100%;
        object-fit: cover;
        border-radius: 5px;
        margin-bottom: 5px;
      }

      span {
        color: var(--color-text-2);
      }
    }

    .info {
      width: calc(100% - 175px);

      .nickname {
        color: var(--color-text-2);

        .nick {
          margin-right: 10px;
        }

        .article {

        }
      }

      .content {
        height: 3rem;
        margin: 5px 0;
        padding-right: 10px;
      }

      .data {
        color: var(--color-text-2);
        display: flex;
        align-items: center;

        .date {
          font-size: 12px;
        }

        .digg {
          margin: 0 10px;

          i {
            cursor: pointer;
            font-size: 12px;
            margin-right: 5px;
          }
        }

        a {
          color: var(--color-text-2);
        }
      }

    }
  }

  .page {
    display: flex;
    margin-top: 10px;
    justify-content: center;
  }

  .apply_comment_trigger {
    width: 300px;
    border-radius: 5px;
    border: @q_border;
    background-color: var(--color-bg-1);
    position: relative;
    padding: 5px;

    .arco-btn {
      position: absolute;
      right: 10px;
      bottom: 10px;
      z-index: 2;
    }

    .arco-textarea-wrapper {

    }
  }
}
</style>