<script setup lang="ts">
import {IconEdit} from "@arco-design/web-vue/es/icon";
import {nextTick, ref, watch} from "vue";

interface Props {
  value: string
  type?: "textarea"
  placeholder?: string
  noEdit?: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(["ok"])

const showEdit = ref(false)
const inputRef = ref()

function editClick() {
  showEdit.value = true
  nextTick(() => {
    inputRef.value.focus()
  })
}

function inputBlur() {
  showEdit.value = false
}

function inputChange(val: string) {
  emits("ok", val)
}

const text = ref("")

watch(() => props.value, () => {
  text.value = props.value
}, {immediate: true})

</script>

<template>
  <div class="q_edit_input_com">
    <span :class="props.type" v-if="!showEdit">{{ props.value }}</span>
    <template v-else>
      <a-textarea v-if="props.type === 'textarea'" @change="inputChange" @blur="inputBlur" ref="inputRef"
                  :auto-size="{minRows: 3, maxRows: 4}" v-model="text" :placeholder="props.placeholder"></a-textarea>
      <a-input @change="inputChange" @blur="inputBlur" ref="inputRef" v-else v-model="text"
               :placeholder="props.placeholder"></a-input>
    </template>


    <a class="edit" v-if="!props.noEdit" @click="editClick" href="javascript:void 0">
      <IconEdit></IconEdit>
      编辑</a>
  </div>

</template>

<style lang="less">
.q_edit_input_com {
  span.textarea {
    white-space: break-spaces;
  }

  .edit {
    margin-left: 5px;
  }

  .arco-input-wrapper {
    width: fit-content;
  }

  .arco-textarea-wrapper {
    min-width: 300px;
  }
}

</style>