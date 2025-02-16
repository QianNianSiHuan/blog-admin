<script lang="ts" setup>
import Q_welcome from "@/components/admin/q_welcome.vue";
import Q_title from "@/components/admin/q_title.vue";
import Q_quick_entrance from "@/components/admin/q_quick_entrance.vue";
import Q_version from "@/components/common/q_version.vue";
import Q_home_charts_v1 from "@/components/admin/q_home_charts_v1.vue";
import {dataGrowthApi, type dataGrowthType} from "@/api/data_api.ts";
import {reactive} from "vue";
import {Message} from "@arco-design/web-vue";
import Echarts_v2 from "@/components/echarts/echarts_1/echarts_v2.vue";
import Echarts_v3 from "@/components/echarts/echarts_1/echarts_v3.vue";

const data = reactive<dataGrowthType>({
      "growthRate": 0,
      "growthNum": 0,
      "countList": [],
      "dateList": [],
    }
)

async function getData() {
  const res = await dataGrowthApi(1)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}

getData()
</script>

<template>
  <div class="home_view">
    <div class="left">
      <q_welcome></q_welcome>
      <div class="charts charts_3">
        <div class="item">
          <q_title :type="2">访问人数</q_title>
          <q_home_charts_v1 :type="1"></q_home_charts_v1>
        </div>
        <div class="item">
          <q_title :type="2">发布文章</q_title>
          <q_home_charts_v1 :type="2"></q_home_charts_v1>
        </div>
        <div class="item">
          <q_title :type="2">新增用户</q_title>
          <q_home_charts_v1 :type="3"></q_home_charts_v1>
        </div>
      </div>
      <div class="charts charts_2">
        <div class="item">
          <q_title :type="2">发布文章</q_title>
          <div class="body">
            <echarts_v2></echarts_v2>
          </div>
        </div>
        <div class="item">
          <q_title :type="2">系统资源</q_title>
          <div class="body">
            <echarts_v3></echarts_v3>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <q_quick_entrance></q_quick_entrance>
      <q_version></q_version>
    </div>
  </div>
</template>

<style lang="less">
.home_view {
  background-color: inherit !important;
  display: flex;
  justify-content: space-between;

  > .left {
    width: 75%;

    .charts {
      margin-bottom: 20px;
      grid-column-gap: 20px;
      display: grid;

      .item {
        background: var(--color-bg-1);
        border-radius: 5px;
        padding: 20px 10px;
      }
    }

    .charts_3 {
      grid-template-columns: repeat(3, 1fr);


    }

    .charts_2 {
      grid-template-columns: 7fr 3fr;
    }

  }

  > .right {
    width: calc(25% - 20px);

    .f_quick_entrance {
      margin-bottom: 20px;
    }
  }
}
</style>