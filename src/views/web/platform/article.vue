<script setup lang="ts">
import {reactive} from "vue";
import type {listResponse} from "@/api";
import {articleListApi, type articleListRequest, type articleListType} from "@/api/article_api.ts";
import {Message} from "@arco-design/web-vue";
import Q_a from "@/components/common/q_a.vue";
import {dateCurrentFormat} from "@/utils/data.ts";
const data =reactive<listResponse<articleListType>>({
  list:[],
  count:0
})
const params = reactive<articleListRequest>({
  type:2,
  status:3,
})

async function getData() {
  const res =await articleListApi(params)
  if (res.code){
    Message.error(res.msg)
    return
  }
  Object.assign(data,res.data)
}
getData()

function checkStatus(status: number) {
  params.status = status
  getData()
}


</script>

<template>
  <div class="platform_article_view">
    <div class="head">
      <div class="left">
        <div class="title">我的文章</div>
        <router-link :to="{name: 'platformArticleAdd'}">
          <a-button type="primary">发布文章</a-button>
        </router-link>
      </div>
      <div class="right">
        <a-input-search @search="getData" @keydown.enter="getData" v-model="params.key"
                        placeholder="搜索文章"></a-input-search>
      </div>
    </div>
    <div class="body scrollbar">
      <div class="menu">
        <q_a :class="{active: params.status === 3}" @click="checkStatus(3)">已发布</q_a>
        <q_a :class="{active: params.status === 2}" @click="checkStatus(2)">审核中</q_a>
        <q_a :class="{active: params.status === 1}" @click="checkStatus(1)">草稿箱</q_a>
      </div>
      <div class="article_list">
        <div class="item" v-for="item in data.list">
          <div class="cover">
            <img @click="goArticle(item.id)" v-if="item.cover" :src="item.cover" alt="">
          </div>
          <div class="info">
            <div class="title" @click="goArticle(item.id)">{{ item.title }}</div>
            <div class="abs">{{ item.abstract }}</div>
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
                <a-tag v-for="tag in item.tagList">{{ tag }}</a-tag>
              </div>
              <div class="date">最后更新于{{ dateCurrentFormat(item.updatedAt) }}</div>
            </div>
            <div class="more">
              <a-dropdown @select="handleSelect(item.id, $event)">
                <IconMore></IconMore>
                <template #content>
                  <a-doption value="platformArticleEdit">编辑文章</a-doption>
                  <a-doption value="delete" style="color: red">删除文章</a-doption>
                </template>
              </a-dropdown>
            </div>
          </div>
        </div>

        <div class="page" v-if="data.count">
          <a-pagination @change="getData" v-model:current="params.page" :page-size="params.limit" :total="data.count"
                        show-total></a-pagination>
        </div>
        <div class="no_data" v-if="data.list.length === 0">
          <a-empty></a-empty>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.platform_article_view {
  background: var(--color-bg-1);
  border-radius: 5px;
  .head{
    display: flex;
    justify-content: space-between;
    padding: 20px 20px 10px 20px;
    border-bottom: @q_border;
    align-items: center;
    .left{
      display: flex;
      align-items: center;
      .title{
        font-size: 14px;
        font-weight: 600;
        margin-right: 10px;
      }
      .arco-btn{
        border-radius: 100px;
      }
    }
    .arco-input-wrapper{
      border-radius: 100px;
    }
  }
  .body{
    padding: 10px 20px 20px 20px;
    .menu{
      a{
        color: var(--color-text-2);
        margin-right: 20px;
        &:last-child{
          margin-right: 0;
        }
      }
      a.active{
        color: rgb(var(--arcoblue-6));
      }
    }
    .article_list{
      margin-top: 20px;
      .item{
        display: flex;
        margin-bottom: 10px;
        .cover{
          img{
            width: 160px;
            margin-right: 10px;
          }
        }
        .info{
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .title{
            font-size: 15px;
            font-weight: 600;
            color: var(--color-text-1);
          }

          .abs{
            height: 2rem;
            margin: 5px 0;
          }

          .data{
            display: flex;
            align-items: center;
            color: var(--color-text-2);
            .look,.comment{
              margin-right: 10px;
              span{
                margin-left: 5px;
              }
            }

            .tags{
              margin-right: 10px;
              .arco-tag{
                margin-right: 5px;
              }
            }
            .date{
              font-size: 12px;
              color: var(--color-text-2);
            }
          }
        }
      }
    }
  }
}
</style>