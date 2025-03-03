<script lang="ts" setup>

import Q_nav from "@/components/web/q_nav.vue";
import Q_main from "@/components/web/q_main.vue";
import {MdCatalog, MdPreview} from "md-editor-v3";
import "md-editor-v3/lib/preview.css"
import {articleCollectApi, articleDetailApi, type articleDetailType, articleDiggApi} from "@/api/article_api.ts";
import {Message} from "@arco-design/web-vue";
import {useRoute} from "vue-router";
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import {dataTemFormat} from "@/utils/data.ts";
import {theme} from "@/components/common/q_theme.ts";
import Q_article_collect_modal from "@/components/web/article/q_article_collect_modal.vue";
import Article_comment from "@/components/web/comment/article_comment.vue";
import {userStores} from "@/stores/user_store.ts";
import {showLogin} from "@/components/web/q_login.ts";
import {goArticleEdit} from "@/utils/go_router.ts";

const route = useRoute()
const animation = ref(false)
const scrollElement = document.documentElement;
let data = reactive<articleDetailType>({
  "id": 0,
  "CreatedAt": "",
  "UpdatedAt": "",
  "title": "",
  "abstract": "",
  "content": "",
  "categoryTitle": "",
  "categoryID": 0,
  "tagList": [],
  "cover": "",
  "userID": 0,
  "lookCount": 0,
  "diggCount": 0,
  "commentCount": 0,
  "collectCount": 0,
  "openComment": false,
  "status": 0,
  "username": "",
  "nickname": "",
  userAvatar: "",
  isDigg: false,
  isCollect: false,
})

async function getData() {
  animation.value = true;
  const res = await articleDetailApi(Number(route.params.id));
  animation.value = false;
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
  //setTimeout(look, 2000)
}

// async function look() {
//   await articleLookApi(data.id)
// }

const userStore = userStores()

watch(() => route.params.id, () => {
  getData()
}, {immediate: true})


onMounted(() => {
  const id = route.query.id;
  if (id) {
    const div = document.getElementById(id as string) as HTMLDivElement;
    if (div) {
      document.documentElement.scrollTo({top: div.offsetTop, behavior: "smooth"});
    }
  }
})

const isFixed = ref()

function scroll() {
  const top = document.documentElement.scrollTop
  isFixed.value = top >= 210;
}

window.addEventListener("scroll", scroll);


async function digg() {
  if (!userStore.isLogin) {
    showLogin({reload: true})
    return
  }
  const res = await articleDiggApi(data.id)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  data.isDigg = !data.isDigg
  if (data.isDigg) {
    data.diggCount = data.diggCount + 1
  } else {
    data.diggCount = data.diggCount - 1
  }
}

const visible = ref(false)

async function collect() {
  if (!userStore.isLogin) {
    showLogin({reload: true})
    return
  }
  visible.value = true
}

async function collectArticle(id: number) {
  const res = await articleCollectApi({
    articleID: data.id,
    collectID: id,
  });
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  data.isCollect = res.data.isCollect
  console.log(res.data.collect)
  if (res.data.collect) {
    data.collectCount++
  } else {
    data.collectCount--
  }
}

function goTop() {
  document.documentElement.scrollTo({top: 0, behavior: "smooth"})
}

const articleCommentRef = ref()

function goComment() {
  const div = document.querySelector(".add_comment") as HTMLDivElement
  const top = div.offsetTop
  document.documentElement.scrollTo({top: top, behavior: "smooth"})

  setTimeout(() => {
    articleCommentRef.value.focus()
  }, 800)
}

onUnmounted(() => {
  window.removeEventListener("scroll", scroll)
})


</script>

<template>
  <div class="article_detail_view">
    <q_nav no-scroll></q_nav>
    <q_main>
      <q_article_collect_modal v-model:visible="visible" :article-i-d="data.id"
                               @select="collectArticle"></q_article_collect_modal>
      <div class="article_container">
        <div class="article_content">
          <a-skeleton v-if="!data.content" :animation="true">
            <a-space :style="{width:'100%'}" direction="vertical" size="large">
              <a-skeleton-line :rows="18"/>
            </a-space>
          </a-skeleton>
          <div v-if="data.content" class="head">
            <div class="title">
              <span>{{ data.title }}</span>
              <IconEdit v-if="data.userID===userStore.userInfo.userID" style="margin-left: 10px;cursor: pointer"
                        title="去编辑"
                        @click="goArticleEdit(data.id)"></IconEdit>
            </div>
            <div class="date">{{ dataTemFormat(data.CreatedAt) }}</div>
            <div class="tags">
              <a-tag v-for="item in data.tagList">{{ item }}</a-tag>
            </div>
          </div>
          <div v-if="data.content" class="body">
            <MdPreview :id="`md_${data.id}`" :codeFoldable="false" :modelValue="data.content"
                       :theme="theme as 'light'|'dark'">
            </MdPreview>
          </div>
        </div>
        <article_comment v-if="data.openComment" ref="articleCommentRef"
                         :article-id="Number(route.params.id)"></article_comment>
        <div v-else class="no_comment">作者关闭评论</div>
      </div>
      <div class="article_info">
        <div class="user_info">
          <div class="user">
            <a-avatar :image-url="data.userAvatar" :size="60"></a-avatar>
          </div>
          <div class="nick">{{ data.nickname }}</div>
          <div class="data">
            <div class="item">
              <span>{{ data.lookCount }}</span>
              <span><i class="iconfont icon-liulanliang"></i></span>
            </div>
            <div class="item">
              <span>{{ data.diggCount }}</span>
              <span><i class="iconfont icon-dianzan_kuai"></i></span>
            </div>
            <div class="item">
              <span>{{ data.collectCount }}</span>
              <span><i class="iconfont icon-shoucang1"></i></span>
            </div>
            <div class="item">
              <span>{{ data.commentCount }}</span>
              <span><i class="iconfont icon-xinxi1"></i></span>
            </div>
          </div>
        </div>
        <div :class="{isFixed: isFixed}" class="catalog_action">
          <div class="catalog">
            <div class="head">文章目录</div>
            <div class="body scrollbar">
              <MdCatalog v-if="data.id" :editorId="`md_${data.id}`" :offsetTop="61"
                         :scrollElement="scrollElement"
                         :scrollElementOffsetTop="60"
                         :theme="theme as 'light'|'dark'"></MdCatalog>
            </div>
          </div>
          <div class="article_action">
            <i :class="{active: data.isDigg}" class="iconfont icon-dianzan_kuai" title="点赞" @click="digg"></i>
            <i :class="{active: data.isCollect}" class="iconfont icon-shoucang1" title="收藏"
               @click="collect"></i>
            <i class="iconfont icon-tubiao02" title="回到顶部" @click="goTop"></i>
            <i class="iconfont icon-xinxi1" title="去评论" @click="goComment"></i>
          </div>
        </div>
      </div>
    </q_main>
  </div>
</template>

<style lang="less">
.article_detail_view {
  .q_container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: calc(100vh - 100px);
  }

  .article_container {
    width: calc(100% - 280px);

    .article_content {
      padding: 20px;
    }

    .article_content {
      background: var(--color-bg-1);
      border-radius: 5px;

      .head {
        padding: 20px 20px 10px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: @q_border;

        .title {
          font-size: 20px;
          font-weight: 600;
          margin: 10px 0;
        }

        .date {
          color: var(--color-text-2);
          font-size: 12px;
          margin: 10px 0;
        }

        .tags {
          span {
            margin-right: 10px;

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }

      .body {
        padding: 10px 20px 20px 20px;


        .md-editor-preview-wrapper {
          padding: 0;
        }
      }
    }

    .no_comment {
      margin-top: 20px;
      padding: 20px;
      text-align: center;
      background-color: var(--color-bg-1);
      border-radius: 5px;
      color: var(--color-text-2);
    }

  }

  .article_info {
    width: 260px;


    .user_info {
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: var(--color-bg-1);
      border-radius: 5px;

      .nick {
        margin: 10px 0 20px 0;
        color: var(--color-text-1);
      }

      .data {
        display: flex;
        grid-template-columns: repeat(4, 1fr);
        width: 100%;

        .item {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          span:nth-child(1) {
            font-size: 16px;
            color: var(--color-text-1);
            margin-bottom: 3px;
          }

          i {
            font-size: 18px;
            color: var(--color-text-2);
          }

          .icon-liulanliang.icon-dianzan_kuai.icon-shoucang1.icon-xinxi1 {
            font-size: 20px;
          }

        }
      }
    }

    .catalog_action {
      .md-editor-catalog {
        position: relative;
      }

      &.isFixed {
        position: fixed;
        top: 60px;
        width: 260px;
      }
    }

    .catalog {
      margin-top: 20px;
      background: var(--color-bg-1);
      border-radius: 5px;

      .head {
        padding: 20px 20px 10px 20px;
        border-bottom: @q_border;
        font-weight: 600;
        color: var(--color-text-1);
      }

      .body {
        padding: 10px 20px 20px 20px;
        max-height: calc(100vh - 300px);
        overflow-y: auto;

        .md-editor-catalog-active > span {
          color: rgb(var(--arcoblue-6));
        }

        .md-editor-catalog-link span:hover {
          color: rgb(var(--arcoblue-5));
        }

        .md-editor-catalog-indicator {
          background-color: rgb(var(--arcoblue-6));
        }
      }
    }

    .article_action {
      background: var(--color-bg-1);
      border-radius: 5px;
      display: flex;
      grid-template-columns: repeat(4, 1fr);
      justify-content: center;
      align-items: center;
      padding: 10px 0;
      margin-top: 10px;

      i {
        padding: 10px;
        cursor: pointer;
        border-radius: 5px;
        color: var(--color-text-1);

        &:hover {
          background: var(--color-fill-1);
        }

        &.active {
          color: rgb(var(--arcoblue-6));
        }
      }
    }
  }
}
</style>