<script lang="ts" setup>
import {bannerListApi, type bannerListType} from "@/api/banner_api";
import {reactive, ref} from "vue";
import type {listResponse} from "@/api";

const data = reactive<listResponse<bannerListType>>({
  list: [],
  count: 0
})

async function getData() {
  const res = await bannerListApi({type: 1})
  const list: bannerListType[] = []
  res.data.list.forEach((item) => {
    if (item.show) {
      list.push(item)
    }
  })
  data.list = list
}

function goItem(item: bannerListType) {
  if (item.href == "") {
    return
  }
  window.open(item.href, "_blank")
}

getData()
const isClose = ref(false)

function close() {
  isClose.value = true
}

</script>

<template>
  <div v-if="!isClose" class="q_banner_list_com">
    <!--    <IconClose class="close" title="删除" @click="close"></IconClose>-->
    <a-carousel v-if="data.list.length" auto-play class="q_banner_com" show-arrow="hover">
      <a-carousel-item v-for="item in data.list">
        <img
            :class="{isHref: item.href !== ''}"
            :src="item.cover"
            :style="{
          width: '100%',
        }"
            @click="goItem(item)"
        />
      </a-carousel-item>
    </a-carousel>
  </div>

</template>

<style lang="less">
.q_banner_com {
  height: 400px;

  .arco-carousel-item-current {
    border-radius: 5px;

    img.isHref {
      cursor: pointer;
    }
  }
}
</style>