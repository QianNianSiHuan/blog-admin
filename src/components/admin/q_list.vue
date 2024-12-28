<script setup lang="ts">
import type {baseResponse, listResponse, paramsType} from "@/api";
import {reactive} from "vue";
import {Message, type TableColumnData} from "@arco-design/web-vue";

interface Props{
  url:(params:paramsType)=>Promise<baseResponse<listResponse<any>>>
  columns:TableColumnData[]
}

const  props = defineProps<Props>()

const data =reactive<listResponse<any>>({
  list:[],
  count:0,
})
const params =reactive<paramsType>({
  type:1
})


async function getList() {
  const res = await props.url()

  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.list = res.data.list || []
  data.count = res.data.count
}


</script>

<template>
<div class="q_list_com">
  <div class="q_list_head">
    <div class="action_creat">
      <a-button type="primary">创建</a-button>
    </div>
    <div class="action_group">
      <a-select placeholder="操作">操作</a-select>
    </div>
    <div class="action_search">
      <a-input placeholder="搜索">搜素</a-input>
    </div>
    <div class="action_search_slot">

    </div>
    <div class="action_flush">
    <icon-refresh></icon-refresh>
    </div>
  </div>
  <div class="q_list_body">
    <a-spin>
      <div class="q_list_table">
        <a-table :columns="props.columns" :data="data.list"></a-table>
      </div>
      <div class="q_list_page">
       <a-pagination :total="100"></a-pagination>
      </div>
    </a-spin>
  </div>

</div>
</template>

<style lang="less">
.q_list_com{
  .q_list_head{
    padding: 20px 20px 10px 20px;
    border-bottom: @q_border;
    display: flex;
    align-items: center;
    position: relative;

    .action_creat,.action_group,.action_search,.action_search_slot{
      margin-right: 10px;
    }

    .action_flush{
      position: absolute;
      right: 20px;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--color-fill-2);
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .q_list_body{
    padding: 10px 20px 20px 20px;
    >.arco-spin{
      width: 100%;
    }
    .q_list_page{
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
  }
}
</style>