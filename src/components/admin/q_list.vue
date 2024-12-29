<script setup lang="ts">
import {type baseResponse, defaultDeleteApi, type listResponse, type paramsType} from "@/api";
import {reactive, ref} from "vue";
import {Message, type TableColumnData, type TableRowSelection} from "@arco-design/web-vue";
import {dataTemFormat, type dateTemType} from "@/utils/data.ts";



export interface columnType extends TableColumnData{
  dateFormat?:dateTemType
}


interface Props{
  url:(params:paramsType)=>Promise<baseResponse<listResponse<any>>>
  columns:columnType[]
  rowKey?: string //删除字段
  noDefaultDelete?:boolean//不器用默认删除
  noAdd?:boolean//是否显示创建
  noEdit?:boolean
  noDelete?:boolean
  searchPlaceholder?:string
  addLabel?:string
  editLabel?:string
  deleteLabel?:string
  noActionGroup?:boolean
  noCheck?:boolean
}
const actionGroupOptions =[
    {label:"批量删除",value:1}
]



const  props = defineProps<Props>()
const {
  rowKey ="id",
  noDefaultDelete=false,
  searchPlaceholder = "搜索",
  addLabel="添加",
  editLabel="编辑",
  deleteLabel="删除",
}= props
const loading =ref(false)

const data =reactive<listResponse<any>>({
  list:[],
  count:5,
})
const params =reactive<paramsType>({
  type:1,
  limit:10,
  page:1,
})


async function getList() {
  loading.value =true
  const res = await props.url(params)
  loading.value =false
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.list = res.data.list || []
  data.count = res.data.count
}
const emit = defineEmits<{
  delete:[keyList:number[]|string[]]
  add:[]
  edit:[record:any]
}>()



async function remove(record:any) {
const key =record[rowKey]
  baseDelete([key])
}

async function baseDelete(keyList:number[]) {
  if(noDefaultDelete){
    emit("delete",keyList)
    return
  }
  const array = /\"(.*?)\"/.exec(props.url.toString())
  if (array?.length !==2){
    return
  }
  const url =array[1]
  const res = await defaultDeleteApi(url,keyList)
  if (res.code){
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  getList()
}



function add(){
  emit("add")
}
function edit(record:any){
  emit("edit",record)
}
function update(record:any){

}
function refresh() {
  getList()
  Message.success("刷新成功")
}

const selectedKeys =ref([])

const rowSelection =reactive<TableRowSelection>({
  type:"checkbox",
  showCheckedAll:true,
  onlyCurrent:false
})
const actionValue = ref()
function actionGroupAction() {
  console.log(actionValue.value)
if (actionValue.value ===1){
  //批量删除
  baseDelete(selectedKeys.value)
  selectedKeys.value=[]
  return
}
}

function pageChange(){
  getList()
}

function search(){
  getList()
}
getList()

</script>

<template>
<div class="q_list_com">
  <div class="q_list_head">
    <slot name="action_add">
      <div class="action_creat" v-if="!noAdd">
        <a-button type="primary" @click="add">{{ addLabel }}</a-button>
      </div>
    </slot>
    <div class="action_group" v-if="!noActionGroup">
      <a-select style="width: 150px" placeholder="操作" v-model="actionValue" :options="actionGroupOptions"></a-select>
      <a-button type="primary" status="warning" @click="actionGroupAction" v-if="actionValue">执行</a-button>
    </div>
    <div class="action_search">
      <a-input-search :placeholder="searchPlaceholder" @search="search" v-model="params.key">搜素</a-input-search>
    </div>
    <div class="action_search_slot">
      <slot name="search_other">

      </slot>
    </div>
    <div class="action_flush" @click="refresh">
    <icon-refresh ></icon-refresh>
    </div>
  </div>
  <div class="q_list_body">
    <a-spin :loading="loading">
      <div class="q_list_table">
        <a-table :data="data.list" :row-key="rowKey" v-model:selected-keys="selectedKeys" :row-selection="props.noCheck?undefined:rowSelection" :pagination="false">
          <template #columns>
            <template v-for="col in props.columns" >
              <a-table-column v-if="col.dataIndex" v-bind="col"></a-table-column>
              <a-table-column v-else-if="col.slotName" v-bind="col">
                <template #cell="data">
                  <div class="col_action" v-if="col.slotName==='action'">
                    <slot v-bind="data" name ="action_left"></slot>
                    <a-button type="primary" @click="edit(data.record)" v-if="!noEdit">{{ editLabel }}</a-button>
                    <a-popconfirm content="确定要删除该记录吗" @ok="remove(data.record)">
                      <a-button type="primary" status="danger" v-if="!noDelete">{{ deleteLabel }}</a-button>
                    </a-popconfirm>
                    <slot v-bind="data" name ="action_right"></slot>
                  </div>
                  <div v-if="col.slotName === 'created_at'">
                      {{dataTemFormat(data.record[col.slotName],col.dateFormat)}}
                  </div>
                  <slot v-else :name="col.slotName" v-bind="data"></slot>
                </template>
              </a-table-column>
            </template>
          </template>
        </a-table>
      </div>
      <div class="q_list_page">
       <a-pagination :total="data.count" @change="pageChange" v-model:current="params.page" :page-size="params.limit"></a-pagination>
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

    .action_group{
      display: flex;
      align-items: center;
      button{
        margin-left: 10px;
      }
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
    .col_action{
      button{
        margin-right: 10px;

        &:last-child{
          margin-right: 0;
        }
      }
    }
  }
}
</style>