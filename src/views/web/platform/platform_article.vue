<script setup lang="ts">
import {reactive} from "vue";
import type {baseResponse, listResponse} from "@/api";
import {
  articleListApi,
  type articleListRequest,
  type articleListType,
  articleRemoveApi
} from "@/api/article_api.ts";
import {Message} from "@arco-design/web-vue";
import Q_a from "@/components/common/q_a.vue";
import {dateCurrentFormat} from "@/utils/data.ts";
import {goArticle} from "@/utils/go_router.ts";
import router from "@/router";
import {userArticleTopApi} from "@/api/user_api.ts";
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
async function handleSelect(id:number,val:string){
  if (val ==='platformArticleEdit') {
    router.push({
      name:val,
      params:{id:id}
    })
    return
  }
  let res:baseResponse<string> ={code:0,msg:"",data:""}
  if (val ==='delete'){
    res = await articleRemoveApi(id)
  }
  if (val === 'cancelTop' || val==="top"){
    res = await userArticleTopApi({
    articleID:id,
    type:1,
    })
  }
  if (res.code){
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
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
        <q_a :class="{active: params.status === 4}" @click="checkStatus(4)">未通过</q_a>
      </div>
      <div class="article_list">
        <div class="item" v-for="item in data.list">
          <div class="cover">
            <img @click="goArticle(item.id)" v-if="item.cover" :src="item.cover" alt="">
          </div>
          <div v-if="item.userTop" class="user_top">
            <a-tag color="blue">用户置顶</a-tag>
          </div>
          <div class="info">
            <div class="title" @click="goArticle(item.id)">{{ item.title }}</div>
            <div class="abs">
              <a-typography-text :ellipsis="{rows:2,css:true}">
                {{item.abstract}}
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
                  <a-tag class="tag" v-for="tag in item.tagList">{{ tag }}</a-tag>
                </template>
                <a-overflow-list v-else>
                  <a-tag v-for="tag in item.tagList">{{ tag }}</a-tag>
                </a-overflow-list>
              </div>
              <div class="date">最后更新于{{ dateCurrentFormat(item.UpdatedAt) }}</div>
            </div>
            <div class="more">
              <a-dropdown @select="handleSelect(item.id, $event as string)">
                <IconMore></IconMore>
                <template #content>
                  <a-doption value="platformArticleEdit">编辑文章</a-doption>
                  <a-doption v-if="!item.userTop" value="top">置顶文章</a-doption>
                  <a-doption v-if="item.userTop" value="cancelTop">取消置顶</a-doption>
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
  > .body {
    overflow-y: auto;
    max-height: calc(100vh - 160px);
  }
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
    .menu{
      padding: 10px 20px 0 20px;

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
      margin-top:10px;

      .item{
        padding: 10px 20px;
        display: flex;
        position: relative;

        &:hover{
          background-color: var(--color-fill-1);
          .more{
            opacity: 1;
          }
        }
        .cover{
          cursor: pointer;
          img{
            width: 160px;
            margin-right: 10px;
          }
        }

        .user_top{
          position: absolute;
          right: 10px;
          top: 10px;
        }

        .info{
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .title{
            font-size: 15px;
            font-weight: 600;
            color: var(--color-text-1);
            cursor: pointer;
          }

          .abs{
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
              max-width: 400px;
              .tag{
                margin-right: 10px;
              }
            }
            .date{
              font-size: 12px;
              color: var(--color-text-2);
            }
          }
        }

        .more{
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          opacity: 0;
        }
      }
      .page{
        display: flex;
        justify-content: center;
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>