<script setup lang="ts">

import {type FieldRule, Message} from "@arco-design/web-vue";
import {reactive, ref} from "vue";
import type {optionsFunc, optionsType} from "@/api";
import {unrefElement} from "@arco-design/web-vue/es/watermark/hooks/use-mutation-observer";

export interface formListType{
  label:string
  field:string
  type?:"input"|"textarea"|"select"|"switch"|"radio"|"password"
  validateTrigger?: "focus" | "input" | "change" | "blur" | ("focus" | "input" | "change" | "blur")[];
  rules?:FieldRule<any>|FieldRule<any>[]
  source?: optionsType[] | optionsFunc
  options?: optionsType[]
  autoSize?: boolean | {
    minRows?: number | undefined;
    maxRows?: number | undefined;
  }
  multiple?:boolean
  editDisable?:boolean//选项框是否编辑不可见
}

export type emitFnType =(val:boolean)=>void

interface Props{
  visible:boolean
  formList:formListType[]
  addLabel:string //添加时显示的名字
  editLabel:string//添加时显示的名字
}

const props =defineProps<Props>()


const formList = ref<formListType[]>([])


async function initForm() {
  formList.value = []
  for(const val of props.formList){
    if (typeof val.source ==="function"){
      const res =await val.source()
      if (res.code){
        Message.error(res.msg)
        continue
      }
      val.options =res.data
    }else {
      val.options = val.source
    }

    formList.value.push(val)
  }
}

initForm()

const emit = defineEmits<{
  "update:visible":[visible:boolean]
  create:[form:object,fn?:emitFnType]
  update:[form:object,fn?:emitFnType]
}>()

function cancel(){
  formRef.value.clearValidate()
  formRef.value.resetFields()
  isEdit.value =false
  emit("update:visible",false)
}

const form =reactive<object>({

})

const formRef=ref()
async function onBeforeOk(){
  const val =await  formRef.value.validate()
  console.log("onBeforeOk")
  if(val)return false
  const emitFn =(val:boolean)=>{
    if(val){
      cancel()
      return
    }
  }
  if (!isEdit.value){
    emit("create",form,emitFn)
  }else {
    emit("update",form,emitFn)
  }


}

const isEdit = ref(false)

function setForm(formObj:any){
  isEdit.value = true
  Object.assign(form,formObj)
}

defineExpose({
  setForm
})


</script>

<template>
<a-modal :title="isEdit? editLabel?editLabel :addLabel: addLabel" :visible="props.visible" @cancel="cancel" :on-before-ok="onBeforeOk">
    <a-form ref="formRef" :model="form">
      <template v-for="item in formList" >
        <a-form-item v-if="!isEdit||(isEdit&&!item.editDisable)" :field="item.field" :label="item.label" :rules="item.rules" :validate-trigger="item.validateTrigger" >
          <template v-if="item.type === 'input' || item.type==='password'">
            <a-input v-model="form[item.field]" :type="item.type==='password'?'password':'text'" :placeholder="item.label"></a-input>
          </template>
          <template v-else-if="item.type==='select'">
            <a-select :multiple="item.multiple" :placeholder="item.label" v-model="form[item.field]" :options="item.options" allow-clear></a-select>
          </template>
          <template v-else-if="item.type==='switch'">
            <a-switch  v-model="form[item.field]" ></a-switch>
          </template>
          <template v-else-if="item.type==='radio'">
            <a-radio-group  v-model="form[item.field]" :options="item.options"></a-radio-group>
          </template>
          <template v-if="item.type === 'textarea'">
            <a-textarea v-model="form[item.field]" :placeholder="item.label" allow-clear :auto-size="item.autoSize"></a-textarea>
          </template>
          <template v-else>
            <slot :name="item.field" :form="form"></slot>
          </template>
          <template #help>
            <slot :name="`${item.field}_help`" :value="form[item.field]"></slot>
          </template>

        </a-form-item>
      </template>
    </a-form>
  <template #footer>
    <slot name="footer" :form="form"></slot>
  </template>
  </a-modal>
</template>

<style lang="less">

</style>