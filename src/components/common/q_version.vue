<script setup lang="ts">
import Q_card from "@/components/common/q_card.vue";
import {dateCurrentFormat} from "../../utils/data.ts";

interface versionType{
  title:string
  date:string
  item?:string[]
}

const list:versionType[]=[
  {
    title:"第一代",
    date:"2008-5-8",
    item:[
        "25255550",
        "谁打的的哇大我的我的我的我的伟大",
        "sdadwd"
    ]
  },
  {
    title:"第二代",
    date:"2008-5-8",
    item:[
      "25255550",
      "谁打的的哇大我的我的我的我的伟大",
      "sdadwd"
    ]
  },
  {
    title:"第三代",
    date:"2008-5-8",
    item:[
      "25255550",
      "谁打的的哇大我的我的我的我的伟大",
      "sdadwd"
    ]
  },
  ]


</script>

<template>
  <q_card title="更新日志" class="q_version">
    <div class="item" v-for="(item, index) in list">
      <div class="version_head">
        <span class="index">{{index+1}}.</span>
        <span class="label">{{item.title}}</span>
        <span class="date">{{dateCurrentFormat(item.date)}}</span>
      </div>
      <ul class="version_items" v-if="item.item?.length">
        <li v-for="li in item.item">{{li}}</li>
      </ul>
    </div>
  </q_card>
</template>

<style lang="less">
.q_version{
  .body{
    .item{
      margin-top: 20px;
      .version_head{
        position: relative;
        .index{
          margin-right: 5px;
        }
        .date{
          position: absolute;
          right: 0;
          color: var(--color-text-2);
        }
      }
      .version_items{
        color: var(--color-text-2);
        margin-top: 10px;
        line-height: 1.2rem;
      }

    }
  }
}
</style>