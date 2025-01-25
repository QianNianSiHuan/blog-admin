<script lang="ts" setup>
import {ref} from "vue";
import type {TreeNodeData} from "@arco-design/web-vue";

interface Props {
  modelValue: any[]
}

const props = defineProps<Props>()
const emits = defineEmits(["update:modelValue"])

const treeData = ref<TreeNodeData[]>([])

const selectKeys = ref<string[]>([])

function init() {
  console.log(props.modelValue)
  for (const item of props.modelValue) {
    if (item.enable) {
      selectKeys.value.push(item.title)
    }
    treeData.value.push({
      title: item.title,
      key: item.title
    })
  }
}

init()

function onDrop({dragNode, dropNode, dropPosition}: {
  dragNode: TreeNodeData,
  dropNode: TreeNodeData,
  dropPosition: number
}) {
  const data = treeData.value;
  const loop = (data: TreeNodeData[], key: string | number, callback: any) => {
    data.some((item, index, arr) => {
      if (item.key === key) {
        callback(item, index, arr);
        return true;
      }
      if (item.children) {
        return loop(item.children, key, callback);
      }
      return false;
    });
  };

  loop(data, dragNode.key as number, (_: any, index: any, arr: any[]) => {
    arr.splice(index, 1);
  });

  if (dropPosition === 0) {
    loop(data, dropNode.key as number, (item: { children: TreeNodeData[]; }) => {
      item.children = item.children || [];
      item.children.push(dragNode);
    });
  } else {
    loop(data, dropNode.key as number, (_: any, index: number, arr: any[]) => {
      arr.splice(dropPosition < 0 ? index : index + 1, 0, dragNode);
    });
  }
}

function allowDropHandler(options: { dropNode: TreeNodeData; dropPosition: -1 | 0 | 1 }): boolean {
  return options.dropPosition !== 0
}

function dragEnd(ev: DragEvent, node: TreeNodeData) {
  update()
}

function check() {
  update()
}

function update() {
  let lis = []
  for (const tree of treeData.value) {
    const item = selectKeys.value.find((value) => value === tree.key)
    if (item) {
      lis.push({
        title: tree.title,
        enable: true,
      })
    } else {
      lis.push({
        title: tree.title,
        enable: false,
      })
    }
  }
  emits("update:modelValue", lis)
}


</script>

<template>
  <div class="q_index_right">
    <a-tree
        v-model:checked-keys="selectKeys"
        :allow-drop="allowDropHandler"
        :data="treeData"
        blockNode
        checkable
        class="index_right_tree"
        draggable
        @check="check"
        @drop="onDrop"
        @drag-end="dragEnd"
    ></a-tree>
  </div>
</template>

<style lang="less">
.q_index_right {
  width: 430px;
  padding: 10px;
  border-radius: 5px;
  border: @q_border;

  .arco-tree-node {
    background: var(--color-fill-1);
    border-radius: 5px;
    margin-bottom: 3px;
  }
}
</style>