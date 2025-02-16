<script lang="ts" setup>
import {onMounted, watch} from "vue";
import * as echarts from 'echarts';
import {theme} from "@/components/common/q_theme.ts";

interface Props {
  class: string
  countList: number[]
  dateList: number[]
}

const props = defineProps<Props>()

type EChartsOption = echarts.EChartsOption;
let myChart: echarts.ECharts | null = null

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
    xAxis: {
      type: 'category',
      data: props.dateList,
      show: false
    },
    grid: {
      left: 0,
      right: 0,
      top: 20,
      bottom: 20,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: lineColor
        }
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    series: [
      {
        data: props.countList,
        type: 'line',
        smooth: true,
      }
    ],
  };
  myChart?.setOption(option);
}


watch(() => props.dateList, () => {
  initEcharts()
})
watch(() => theme.value, () => {
  initEcharts()
})

onMounted(() => {
  let chartDom = document.querySelector("." + props.class) as HTMLDivElement;
  if (chartDom) {
    myChart = echarts.init(chartDom);
    return
  }
})
</script>

<template>
  <div :class="props.class" class="echarts_v1"></div>
</template>

<style lang="less">
.echarts_v1 {
  width: 100%;
  height: 100%;
}
</style>