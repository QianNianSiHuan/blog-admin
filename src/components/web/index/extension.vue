<script lang="ts" setup>
import {bannerListApi, type bannerListType} from "@/api/banner_api";
import {reactive, ref} from "vue";
import type {listResponse} from "@/api";
import Q_card from "@/components/web/q_card.vue";

const data = reactive<listResponse<bannerListType>>({
  list: [],
  count: 0
})

async function getData() {
  const res = await bannerListApi({type: 2})
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
  <q_card title="独家推广">
    <div v-if="!isClose" class="extension_com">
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
  </q_card>
</template>

<style lang="less">
.extension_com {

  .arco-carousel {
    height: 100px;

    .arco-carousel-item-current {
      border-radius: 5px;

      img {
        height: 100%;
        width: 100%;
      }

      img.isHref {
        cursor: pointer;
      }
    }
  }
}
</style>