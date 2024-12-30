<script setup lang="ts">
import {
  type baseResponse,
  defaultDeleteApi,
  type listResponse,
  type optionsFunc,
  type optionsType,
  type paramsType
} from "@/api";
import {reactive, ref} from "vue";
import {Message, type TableColumnData, type TableData, type TableRowSelection} from "@arco-design/web-vue";
import {dataTemFormat, type dateTemType} from "@/utils/data.ts";



export interface columnType extends TableColumnData{
  dateFormat?:dateTemType
}
//动作组结构
export interface actionGroupType{
  label:string
  value?:number
  callback:(keyList:number[])=>void
}
//过滤组结构
export interface filterGroupType{
  label:string
  source:optionsType[] | optionsFunc
  options?:optionsType[]
  column?:string
  params?:paramsType
  callback?:(value:number|string)=>void
}

interface Props{
  url:(params:paramsType)=>Promise<baseResponse<listResponse<any>>>
  columns:columnType[]//列类型
  rowKey?: string //删除字段
  noDefaultDelete?:boolean//不器用默认删除
  noAdd?:boolean//是否显示创建
  noEdit?:boolean//编辑按钮开关
  noDelete?:boolean//删除按钮开关
  noPage?:boolean//分页开关
  noBatchDelete?:boolean //是否没有批量
  searchPlaceholder?:string//标签
  addLabel?:string//添加按钮标签
  editLabel?:string//编辑按钮标签
  deleteLabel?:string//删除按钮标签
  noActionGroup?:boolean//动作组开关
  noCheck?:boolean //复选框开关
  actionGroup?:actionGroupType[]//动作组
  filterGroup?:filterGroupType[]//过滤组
  limit?:number//默认页数量
}
const actionGroupOptions =ref<actionGroupType[]>([])


const  props = defineProps<Props>()
const {
  rowKey ="id",
  noDefaultDelete=false,
  searchPlaceholder = "搜索",
  addLabel="添加",
  editLabel="编辑",
  deleteLabel="删除",
  limit=10,
}= props
//加载动画
const loading =ref(false)


//初始化操作组
function initActionGroup() {
  let index = 0
  //默认删除全部动作组
  if(!props.noBatchDelete){
    actionGroupOptions.value.push({
      label:"批量删除",
      value:1,
      callback:(keyList:number[])=>{
        baseDelete(keyList)
        selectedKeys.value=[]
    }
    })
    index =1
  }
  //为自定义行为组设置对应的编号和回调函数
  index ++
  const actionGroup =props.actionGroup||[]
  for(const action of actionGroup){
    actionGroupOptions.value.push({
      label:action.label,
      value:index,
      callback:action.callback
    })
  }
}
initActionGroup()

//初始化过滤组
const filterGroups = ref<filterGroupType[]>([])
async function initFilterGroup(){
for(const val of props.filterGroup||[]){
  if(typeof  val.source === "function"){
    const  res = await val.source(val.params)
    if (res.code){
      Message.error(res.msg)
      continue
    }
    val.options = res.data
  }else {
    val.options = val.source
  }
  //判断有无callback情况
  if (!val.callback){
    //如果没有callback则设置默认行为
    val.callback = (value)=>{
      if(val.column){
        const p:{[key:string]:any} ={}
        p[val.column] =value
        getList(p)
      }
    }
  }

  filterGroups.value.push(val)
}
}
initFilterGroup()

//列表的数据结构
const data =reactive<listResponse<any>>({
  list:[],
  count:5,
})
//分页信息
const params =reactive<paramsType>({
  type:1,
  limit:props.noPage?-1:limit,
})

//获取列表
async function getList(newParams?:paramsType) {
  loading.value =true
  if (newParams){
    Object.assign(params,newParams)
  }
  const res = await props.url(params)
  loading.value =false
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.list = res.data.list || []
  data.count = res.data.count
}
//抛出方法
const emit = defineEmits<{
  delete:[keyList:number[]|string[]]
  add:[]
  edit:[record:any]
  "row-click":[record:any]
}>()


//默认单个删除
async function remove(record:any) {
const key =record[rowKey]
  baseDelete([key])
}

//默认批量删除
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
  await getList()
}
//行点击
function RowClick(record:TableData,ev:Event){
  emit("row-click",record)
}

//添加
function add(){
  emit("add")
}
//编辑
function edit(record:any){
  emit("edit",record)
}
//更新
function update(record:any){

}
//刷新
function refresh() {
  getList()
  Message.success("刷新成功")
}
//表格复选框绑定的主键值
const selectedKeys =ref([])

//复选框配置
const rowSelection =reactive<TableRowSelection>({
  type:"checkbox",
  showCheckedAll:true,
  onlyCurrent:false
})

//动作对应的标记值
const actionValue = ref()
function actionGroupAction() {
  //执行选择动作对应的回调函数
const action = actionGroupOptions.value.find((value)=>value.value===actionValue.value)
  if (action){
    action.callback(selectedKeys.value)
  }
}

function pageChange(){
  getList()
}

function search(){
  getList()
}
getList()

defineExpose({
  getList,
  data,
})




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
      <a-input-search :placeholder="searchPlaceholder" @search="search" v-model="params.key"></a-input-search>
    </div>
    <div class="action_filter">
     <a-select v-for="item in filterGroups" style="width: 140px" allow-clear :placeholder="item.label" @change="item.callback as any" :options="item.options"></a-select>
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
        <a-table :data="data.list" @row-click="RowClick" :row-key="rowKey" v-model:selected-keys="selectedKeys" :row-selection="props.noCheck?undefined:rowSelection" :pagination="false">
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
      <div class="q_list_page" v-if="!noPage">
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

    .action_filter{
      .arco-select{
        margin-right: 10px;
        &:last-child{
          margin-right: 0;
        }
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