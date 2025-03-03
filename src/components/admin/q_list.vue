<script lang="ts" setup>
import {
  type baseResponse,
  defaultDeleteApi,
  defaultPostApi,
  defaultPutApi,
  type listResponse,
  type optionsFunc,
  type optionsType,
  type paramsType
} from "@/api";
import {reactive, ref} from "vue";
import {Message, type TableColumnData, type TableData, type TableRowSelection} from "@arco-design/web-vue";
import {dataTemFormat, type dateTemType} from "@/utils/data.ts";
import {type optionsColorType} from "@/options/options.ts";
import Q_label from "@/components/admin/q_label.vue";
import type {emitFnType, formListType} from "@/components/admin/q_modal_form.ts";
import Q_modal_form from "@/components/admin/q_modal_form.vue";

export interface columnType extends TableColumnData {
  dateFormat?: dateTemType
  type?: "date" | "options" | "switch"
  options?: optionsColorType[]
}

//动作组结构
export interface actionGroupType {
  label: string
  value?: number
  callback: (keyList: number[]) => void
}

//过滤组结构
export interface filterGroupType {
  label: string
  source: optionsType[] | optionsFunc
  options?: optionsType[]
  column?: string
  params?: paramsType
  callback?: (value: number | string) => void
}

interface Props {
  url: (params: any) => Promise<baseResponse<listResponse<any>>>
  columns: any//列类型
  rowKey?: string //删除字段
  noDefaultDelete?: boolean//不器用默认删除
  noAdd?: boolean//是否显示创建
  noEdit?: boolean//编辑按钮开关
  noDelete?: boolean//删除按钮开关
  noPage?: boolean//分页开关
  noBatchDelete?: boolean //是否没有批量
  searchPlaceholder?: string//标签
  addLabel?: string//添加按钮标签
  editLabel?: string//编辑按钮标签
  deleteLabel?: string//删除按钮标签
  noActionGroup?: boolean//动作组开关
  noCheck?: boolean //复选框开关
  actionGroup?: actionGroupType[]//动作组
  filterGroup?: filterGroupType[]//过滤组
  limit?: number//默认页数量
  formList?: formListType[]
  addFormLabel?: string
  editFormLabel?: string
  defaultParams?: object
}

const actionGroupOptions = ref<actionGroupType[]>([])


const props = defineProps<Props>()
const {
  rowKey = "id",
  noDefaultDelete = false,
  searchPlaceholder = "搜索",
  addLabel = "添加",
  editLabel = "编辑",
  deleteLabel = "删除",
  limit = 10,
} = props
//加载动画
const loading = ref(false)


//初始化操作组
function initActionGroup() {
  let index = 0
  //默认删除全部动作组
  if (!props.noBatchDelete) {
    actionGroupOptions.value.push({
      label: "批量删除",
      value: 1,
      callback: (keyList: number[]) => {
        baseDelete(keyList)
        selectedKeys.value = []
      }
    })
    index = 1
  }
  //为自定义行为组设置对应的编号和回调函数
  index++
  const actionGroup = props.actionGroup || []
  for (const action of actionGroup) {
    actionGroupOptions.value.push({
      label: action.label,
      value: index,
      callback: action.callback
    })
  }
}

initActionGroup()

//初始化过滤组
const filterGroups = ref<filterGroupType[]>([])

async function initFilterGroup() {
  for (const val of props.filterGroup || []) {
    if (typeof val.source === "function") {
      const res = await val.source(val.params)
      if (res.code) {
        Message.error(res.msg)
        continue
      }
      val.options = res.data
    } else {
      val.options = val.source
    }
    //判断有无callback情况
    if (!val.callback) {
      //如果没有callback则设置默认行为
      val.callback = (value) => {
        if (val.column) {
          const p: { [key: string]: any } = {}
          p[val.column] = value
          getList(p)
        }
      }
    }

    filterGroups.value.push(val)
  }
}

initFilterGroup()

//列表的数据结构
const data = reactive<listResponse<any>>({
  list: [],
  count: 5,
})
//分页信息
const params = reactive<paramsType>({
  type: 1,
  limit: props.noPage ? -1 : limit,
})

//获取列表
async function getList(newParams?: paramsType) {
  //判断有没有默认的params
  if (props.defaultParams) {
    Object.assign(params, props.defaultParams)
  }
  loading.value = true
  if (newParams) {
    Object.assign(params, newParams)
  }
  const res = await props.url(params)
  loading.value = false
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.list = res.data.list || []
  data.count = res.data.count
}

//抛出方法
const emit = defineEmits<{
  delete: [keyList: number[] | string[]]
  add: []
  edit: [record: any]
  "row-click": [record: any]
}>()


//默认单个删除
async function remove(record: any) {
  const key = record[rowKey]
  baseDelete([key])
}

//默认批量删除
async function baseDelete(keyList: number[]) {
  if (noDefaultDelete) {
    emit("delete", keyList)
    return
  }
  const array = /\"(.*?)\"/.exec(props.url.toString())
  if (array?.length !== 2) {
    return
  }
  const url = array[1]
  console.log(url)
  const res = await defaultDeleteApi(url, keyList)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  await getList()
}

//行点击
function RowClick(record: TableData, ev: Event) {
  emit("row-click", record)
}

//添加
function add() {
  if (props.formList?.length) {
    visible.value = true
  }
  emit("add")
}

//编辑
const modalFormRef = ref()

function edit(record: any) {
  if (props.formList?.length) {
    modalFormRef.value.setForm(record)
    visible.value = true
  }
  emit("edit", record)
}

//刷新
function refresh() {
  getList()
  Message.success("刷新成功")
}

//表格复选框绑定的主键值
const selectedKeys = ref([])

//复选框配置
const rowSelection = reactive<TableRowSelection>({
  type: "checkbox",
  showCheckedAll: true,
  onlyCurrent: false
})

//动作对应的标记值
const actionValue = ref()

function actionGroupAction() {
  //执行选择动作对应的回调函数
  const action = actionGroupOptions.value.find((value) => value.value === actionValue.value)
  if (action) {
    action.callback(selectedKeys.value)
  }
}

function pageChange() {
  getList()
}

function search() {
  getList()
}

getList()

defineExpose({
  getList,
  data,
})

const visible = ref(false)


async function create(form: any, fn?: emitFnType) {
  const array = /\"(.*?)\"/.exec(props.url.toString())
  if (array?.length !== 2) {
    return
  }
  const url = array[1]
  const res = await defaultPostApi(url, form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success("创建成功")
  await getList()
  fn!(true)
}

async function update(form: any, fn?: emitFnType) {
  console.log("create")
  const array = /\"(.*?)\"/.exec(props.url.toString())
  if (array?.length !== 2) {
    return
  }
  const url = array[1]
  const res = await defaultPutApi(url, form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success("更新成功")
  await getList()
  fn!(true)
}

</script>

<template>
  <div class="q_list_com">
    <q_modal_form v-if="props.formList?.length" ref="modalFormRef" v-model:visible="visible"
                  :add-label="props.addFormLabel as string"
                  :edit-label="props.editFormLabel as string"
                  :form-list="props.formList"
                  @create="create"
                  @update="update"></q_modal_form>
    <div class="q_list_head">
      <slot name="action_add">
        <div v-if="!noAdd" class="action_creat">
          <a-button type="primary" @click="add">{{ addLabel }}</a-button>
        </div>
      </slot>
      <div v-if="!noActionGroup" class="action_group">
        <a-select v-model="actionValue" :options="actionGroupOptions" placeholder="操作"
                  style="width: 150px"></a-select>
        <a-button v-if="actionValue" status="warning" type="primary" @click="actionGroupAction">执行</a-button>
      </div>
      <div class="action_search">
        <a-input-search v-model="params.key" :placeholder="searchPlaceholder" @search="search"></a-input-search>
      </div>
      <div class="action_filter">
        <a-select v-for="item in filterGroups" :options="item.options" :placeholder="item.label" allow-clear
                  style="width: 140px" @change="item.callback as any"></a-select>
      </div>
      <div class="action_search_slot">
        <slot name="search_other">
        </slot>
      </div>
      <div class="action_flush" @click="refresh">
        <icon-refresh></icon-refresh>
      </div>
    </div>
    <div class="q_list_body">
      <a-spin :loading="loading">
        <div class="q_list_table">
          <a-table v-model:selected-keys="selectedKeys" :data="data.list" :pagination="false" :row-key="rowKey"
                   :row-selection="props.noCheck?undefined:rowSelection" @row-click="RowClick">
            <template #columns>
              <template v-for="col in props.columns">
                <a-table-column v-if="col.type==='date'" v-bind="col as Props">
                  <template #cell="data">
                    {{ dataTemFormat(data.record[col.dataIndex as string], col.dateFormat) }}
                  </template>
                </a-table-column>
                <a-table-column v-else-if="col.type==='options'" v-bind="col as Props">
                  <template #cell="data">
                    <q_label :options="col.options as optionsColorType[]"
                             :value="data.record[col.dataIndex as string]"></q_label>
                  </template>
                </a-table-column>
                <a-table-column v-else-if="col.type==='switch'" v-bind="col as Props">
                  <template #cell="data">
                    <a-switch :model-value="data.record[col.dataIndex as string]"></a-switch>
                  </template>
                </a-table-column>
                <a-table-column v-else-if="col.dataIndex" v-bind="col as Props"></a-table-column>
                <a-table-column v-else-if="col.slotName" v-bind="col as Props">
                  <template #cell="data">
                    <div v-if="col.slotName==='action'" class="col_action">
                      <slot name="action_left" v-bind="data"></slot>
                      <a-button v-if="!noEdit" type="primary" @click="edit(data.record)">{{ editLabel }}</a-button>
                      <a-popconfirm content="确定要删除该记录吗" @ok="remove(data.record)">
                        <a-button v-if="!noDelete" status="danger" type="primary">{{ deleteLabel }}</a-button>
                      </a-popconfirm>
                      <slot name="action_right" v-bind="data"></slot>
                    </div>
                    <div v-if="col.slotName === 'CreatedAt'">
                      {{ dataTemFormat(data.record[col.slotName], col.dateFormat) }}
                    </div>
                    <slot v-else :name="col.slotName" v-bind="data"></slot>
                  </template>
                </a-table-column>
              </template>
            </template>
          </a-table>
        </div>
        <div v-if="!noPage" class="q_list_page">
          <a-pagination v-model:current="params.page" :page-size="params.limit" :total="data.count"
                        @change="pageChange"></a-pagination>
        </div>
      </a-spin>
    </div>

  </div>
</template>

<style lang="less">
.q_list_com {
  .q_list_head {
    padding: 20px 20px 10px 20px;
    border-bottom: @q_border;
    display: flex;
    align-items: center;
    position: relative;

    .action_creat, .action_group, .action_search, .action_search_slot {
      margin-right: 10px;
    }

    .action_group {
      display: flex;
      align-items: center;

      button {
        margin-left: 10px;
      }
    }

    .action_filter {
      .arco-select {
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .action_flush {
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

  .q_list_body {
    padding: 10px 20px 20px 20px;

    > .arco-spin {
      width: 100%;
    }

    .q_list_page {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }

    .col_action {
      button {
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>