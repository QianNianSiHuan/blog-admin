<script lang="ts" setup>

import type {columnType} from "@/components/admin/q_list.vue";
import Q_list from "@/components/admin/q_list.vue";
import {reactive, ref} from "vue";
import {bannerListApi, type bannerListType, type bannerType, bannerUpdateApi} from "@/api/banner_api.ts";
import {Message} from "@arco-design/web-vue";
import {bannerOptions} from "@/options/options.ts";
import Q_cover_upload from "@/components/common/q_cover_upload.vue";

const columns: columnType[] = [
  {title: "ID", dataIndex: "id"},
  {title: "图片", slotName: "cover"},
  {title: "跳转地址", slotName: "href"},
  {title: "是否显示", slotName: "show"},
  {title: "类型", dataIndex: 'type', type: "options", options: bannerOptions},
  {title: "日期", slotName: "CreatedAt"},
  {title: "操作", slotName: "action"},
]

const fListRef = ref()

const data = reactive<bannerType>({
  show: true,
  cover: "",
  href: "",
  type: 1,
})

const visible = ref(false)

function create() {
  data.id = undefined
  data.href = ""
  data.cover = ""
  data.show = true
  data.type = 1
  visible.value = true
}

function edit(record: bannerListType) {
  data.id = record.id
  data.show = record.show
  data.href = record.href
  data.cover = record.cover
  data.type = record.type
  visible.value = true
}

async function handler() {
  const res = await bannerUpdateApi(data)
  if (res.code) {
    Message.error(res.msg)
    return false
  }
  Message.success(res.msg)
  fListRef.value.getList()
  return true
}

async function bannerIsShow(record: bannerListType) {
  data.id = record.id
  data.show = record.show
  data.href = record.href
  data.cover = record.cover
  data.type = record.type
  await handler()
}

function removeCover() {
  data.cover = ""
}

function coverBack(url: string) {
  data.cover = url
}

</script>

<template>
  <div>
    <a-modal v-model:visible="visible" :on-before-ok="handler" :title="data.id ? '更新banner':'创建banner'">
      <a-form :model="data">
        <a-form-item label="封面">
          <div class="banner_list_upload">
            <a-input v-model="data.cover" placeholder="图片地址"></a-input>
            <div v-if="!data.cover">
              <q_cover_upload placeholder="点击上传封面" @ok="coverBack"></q_cover_upload>
            </div>
            <div v-else class="banner_list_show">
              <a-image :height="108" :src="data.cover">
                <template #extra>
                  <IconDelete @click="removeCover"></IconDelete>
                </template>
              </a-image>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="跳转地址">
          <a-input v-model="data.href" placeholder="跳转地址"></a-input>
        </a-form-item>
        <a-form-item label="类型">
          <a-radio-group v-model="data.type">
            <a-radio :value="1">封面</a-radio>
            <a-radio :value="2">推广</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="是否显示">
          <a-switch v-model="data.show"></a-switch>
        </a-form-item>
      </a-form>
    </a-modal>
    <q_list ref="fListRef"
            :columns="columns"
            :url="bannerListApi"
            @add="create"
            @edit="edit"
    >
      <template #cover="{record}:{record:bannerListType}">
        <a-image :src="record.cover" height="50px"></a-image>
      </template>
      <template #show="{record}:{record:bannerListType}">
        <a-switch v-model="record.show" @change="bannerIsShow(record)"></a-switch>
      </template>
      <template #href="{record}:{record:bannerListType}">
        <a v-if="record.href" :href="record.href" target="_blank">{{ record.href }}</a>
        <span v-else>-</span>
      </template>
    </q_list>
  </div>
</template>

<style lang="less">
.banner_list_upload {
  width: 100%;

  .arco-input-wrapper {
    margin-bottom: 10px;
  }

  .banner_list_show {
    .arco-image-footer {
      display: flex;
      justify-content: center;

      .arco-image-footer-extra {
        padding-left: 0;

        svg {
          cursor: pointer;
          font-size: 20px;
        }
      }
    }
  }
}
</style>