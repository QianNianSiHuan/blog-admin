<script setup lang="ts">
import Q_card from "@/components/web/q_card.vue";
import Q_user from "@/components/common/q_user.vue";
import {reactive} from "vue";
import {
  articleHistoryListApi,
  type articleHistoryListRequest,
  type articleHistoryListType,
  articleHistoryRemoveApi
} from "@/api/article_api.ts";
import {Message} from "@arco-design/web-vue";
import type {listResponse} from "@/api";
import {dateFormat} from "@/utils/data.ts";

interface historyType{
  date:string
  articleList:articleHistoryListType[]
}
const data =reactive<listResponse<historyType>>({
  list:[],
  count:0
})
const params = reactive<articleHistoryListRequest>({
  type:1,
  limit:10,
  page:1
})


async function getData() {
  const res =await articleHistoryListApi(params)
  if (res.code){
    Message.error(res.msg)
    return
  }
  data.count=res.data.count
  data.list=[]
  const dateMap:Record<string, articleHistoryListType[]> ={}
  for (const re of res.data.list){
    const date=dateFormat(re.lookDate)
    const item =dateMap[date]
    if(item){
      dateMap[date].push(re)
    }else {
      dateMap[date]=[re]
    }
  }
  for(const key in dateMap){
    const value = dateMap[key]
    data.list.push({
      date:key,
      articleList:value
    })
  }

  data.list.sort((a,b)=>{
    const ad =new Date(a.date).valueOf()
    const bd =new Date(b.date).valueOf()
    return bd-ad
  })

  Message.success(res.msg)
}

getData()

async function goArticle(articleID:number){

}


async function removeHistory(item:articleHistoryListType){
      const res =await articleHistoryRemoveApi([item.articleID])
  if (res.code){
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}

</script>

<template>
  <div class="user_center_history_view">
    <q_card title="足迹">
      <a-timeline>
        <a-timeline-item v-for="date in data.list" lineType="dashed">
          {{ date.date }}
          <template #label>
            <div class="article_list">
              <div class="item" @click="goArticle(item.articleID)" v-for="item in date.articleList">
                <div class="cover">
                  <img v-if="item.cover" :src="item.cover" alt="">
                </div>
                <div class="info">
                  <div class="title">{{ item.title }}</div>
                  <div class="user">
                    <q_user :size="30" :nickname="item.nickname" :avatar="item.avatar"></q_user>
                  </div>
                </div>
                <div class="action">
                  <a-button type="primary" @click.stop="removeHistory(item)" status="danger" size="mini">删除</a-button>
                </div>
              </div>
            </div>
          </template>
        </a-timeline-item>
      </a-timeline>
      <div class="page" v-if="data.count > 0">
        <a-pagination @change="getData" v-model:current="params.page" :page-size="params.limit" :total="data.count"
                      show-total></a-pagination>
      </div>

    </q_card>
  </div>
</template>

<style lang="less">
.user_center_history_view {
  .q_card_com{
    .body{
      overflow-y: auto;
      max-height: calc(100vh - 160px);
    }
  }
  .article_list {
    .item{
      margin-bottom: 20px;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      position: relative;
      transition: all .3s;

      &:hover{
        background: var(--color-fill-1);

        .action{
          opacity: 1;
        }

      }
      .action{
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0;
        transition: all .3s;
      }
      .cover{
        img{
          width: 80px;
          border-radius: 5px;
          height: 100%;
          object-fit: cover;
          margin-right: 10px;
        }
      }
      .info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title{
          font-size: 15px;
          font-weight: 600;
          color: var(--color-text-1);
        }
        .q_user_com{
          color: var(--color-text-2);
          .text{
            margin-right: 5px;
          }
        }
      }
    }
  }
  .page{
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
}
</style>