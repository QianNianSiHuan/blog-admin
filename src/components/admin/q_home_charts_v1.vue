<script lang="ts" setup>
import Echarts_v1 from "@/components/echarts/echarts_1/echarts_v1.vue";
import {reactive} from "vue";
import {dataGrowthApi, type dataGrowthType} from "@/api/data_api";
import {Message} from "@arco-design/web-vue";

interface Props {
  type: 1 | 2 | 3
}

const props = defineProps<Props>()
const data = reactive<dataGrowthType>({
  growthRate: 0,
  growthNum: 0,
  countList: [],
  dateList: [],
})

async function getData() {
  const res = await dataGrowthApi(props.type)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}

getData()

</script>

<template>
  <div class="q_charts_v1_com">
    <div class="left">
      <a-statistic :value="data.growthNum">
        <template #extra>
                  <span :class="{
                    green: data.growthRate > 0,
                    grey: data.growthRate === 0,
                    red: data.growthRate < 0,
                  }">{{ data.growthRate.toFixed(2) }}%</span>
        </template>
      </a-statistic>
    </div>
    <div class="right">
      <echarts_v1 :class="`growth_${props.type}`" :count-list="data.countList" :date-list="data.dateList"></echarts_v1>
    </div>
  </div>
</template>

<style lang="less">
.q_charts_v1_com {
  display: flex;
  justify-content: space-between;
  height: 110px;

  .left {
    width: 40%;
    display: flex;
    align-items: center;

    .arco-statistic-extra {
      .green {
        color: rgb(var(--success-6));
        font-weight: 600;
        font-size: 16px;

        &::before {
          content: "+";
        }

        &::after {
          content: "↑";
        }
      }

      .red {
        color: rgb(var(--danger-6));
        font-weight: 600;
        font-size: 16px;

        &::before {

        }

        &::after {
          content: "↓";
        }
      }
    }
  }

  .right {
    width: 60%;
  }
}
</style>