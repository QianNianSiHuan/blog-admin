<script lang="ts" setup>
import * as echarts from 'echarts';
import {onMounted, reactive, watch} from "vue";
import {theme} from "@/components/common/q_theme.ts";
import type {dataGrowthType} from "@/api/data_api";
import {dataArticleGrowthApi} from "@/api/data_api";
import {Message} from "@arco-design/web-vue";

type EChartsOption = echarts.EChartsOption;
let myChart: echarts.ECharts | null = null

const data = reactive<dataGrowthType>({
  growthRate: 0,
  growthNum: 0,
  countList: [],
  dateList: [],
})

async function getData() {
  const res = await dataArticleGrowthApi()
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}


function initEcharts() {
  let option: EChartsOption;

  const textColor = getComputedStyle(document.body).getPropertyValue("--color-text-1")
  const lineColor = getComputedStyle(document.body).getPropertyValue("--color-neutral-2")

  let themeColor = [
    '#1c5ae0',
    '#15c5be'
  ]
  if (theme.value === "dark") {
    themeColor = [
      '#1c5ae0',
      '#15c5be'
    ]
  }

  option = {
    color: themeColor,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: "10%",
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: data.dateList
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: lineColor
          }
        }
      }
    ],
    series: [
      {
        type: 'line',
        // stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: data.countList,
        smooth: true,
      },
    ]
  };
  option && myChart?.setOption(option);
}

onMounted(async () => {
  await getData()
  const chartDom = document.querySelector('.article_year_charts') as HTMLDivElement;
  myChart = echarts.init(chartDom);
  initEcharts()
})

watch(() => theme.value, () => {
  initEcharts()
})


</script>

<template>
  <div class="article_year_charts"></div>
</template>

<style lang="less">
.article_year_charts {
  width: 100%;
  height: 260px;
  background-color: var(--color-bg-1);
  border-radius: 5px;
}
</style>