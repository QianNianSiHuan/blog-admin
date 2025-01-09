<script setup lang="ts">
import Q_list, {type columnType} from "@/components/admin/q_list.vue";
import { ref} from "vue";
import {articleListApi, type articleListType} from "@/api/article_api.ts";
import {articleStatusOptions} from "@/options/options.ts";
const columns:columnType[] =[
  {title: "ID", dataIndex: 'id'},
  {title: "文章标题", dataIndex: 'title'},
  {title: "发布用户", slotName: 'user'},
  {title: "文章封面", slotName: 'cover'},
  {title: "浏览量", dataIndex: 'lookCount'},
  {title: "评论数", dataIndex: 'commentCount'},
  {title: "点赞", dataIndex: 'diggCount'},
  {title: "收藏", dataIndex: 'collectCount'},
  {title: "是否开启评论", dataIndex: 'openComment', type:"switch"},
  {title: "状态", dataIndex: 'status',type:"options",options:articleStatusOptions },
  {title: "分类", slotName: 'category'},
  {title: "文章置顶", slotName: 'adminTop'},
  {title: "发布时间", dataIndex: 'CreatedAt', type:"date"},
  {title: "最后更新时间", dataIndex: 'updateAt', type:"date",dateFormat:"current"},
  {title: "操作", slotName: 'action'},
]

const fListRef =ref()

const visible = ref(false)


function edit(record:articleListType) {
  visible.value=true
}

async function handler() {
}
</script>

<template>
  <div>
    <q_list ref="fListRef"
            :url="articleListApi"
            :default-params="{type:3}"
            :columns="columns"
            @edit="edit"
    >
      <template #cover="{record}:{record:articleListType}">
        <a-image v-if="record.cover" :src="record.cover" height="50px"></a-image>
        <span v-else>-</span>
      </template>
      <template #user="{record}:{record:articleListType}">
        <a-avatar :image-url="record.userAvatar" :size="30"></a-avatar>
        <span style="margin-left: 2px">{{record.userNickname}}</span>
      </template>
      <template #category="{record}:{record:articleListType}">
        <span>{{record.categoryTitle ? record.categoryTitle : "-"}}</span>
      </template>

    </q_list>
  </div>
</template>

<style lang="less">

</style>