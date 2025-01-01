<script setup lang="ts">
import * as echarts from 'echarts';
import {onMounted, reactive, watch} from "vue";
import {theme} from "@/components/common/q_theme.ts";

let myChart:echarts.ECharts|null = null


function initEcharts(){
  type EChartsOption = echarts.EChartsOption;
  let option: EChartsOption;
  const textColor = getComputedStyle(document.body).getPropertyValue("--color-text-1")
  const lineColor = getComputedStyle(document.body).getPropertyValue("--color-neutral-2")

  let themeColor =[
    '#3a91d5',
    '#2ebdd8'
  ]
  if (theme.value ==="dark"){
    themeColor=[
      '#ae3243',
      '#9c3e29'
    ]
  }

  option = {
    color:themeColor,
    title: {
      text: '用户登录'
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
    legend: {
      data: ['登录', '注册'],
      textStyle:{
        color:textColor
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine:{
          lineStyle:{
            color:lineColor
          }
        }
      }
    ],
    series: [
      {
        name: '登录',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210],
        smooth: true,
      },
      {
        name: '注册',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310],
        smooth: true,
      },
    ]
  };

  option && myChart?.setOption(option);
}

onMounted(()=>{
  const chartDom = document.querySelector('.user_login_echarts') as HTMLDivElement;
  myChart = echarts.init(chartDom);
  initEcharts()
})
watch(()=>theme.value,()=>{

  initEcharts()
})


</script>

<template>
  <div class="user_login_echarts">

  </div>
</template>

<style lang="less">
.user_login_echarts{
  width: 100%;
  height: 300px;
  background-color: var(--color-bg-1);
  border-radius: 5px;
}
</style>