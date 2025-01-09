<script setup lang="ts">
import type {optionsColorType} from "@/options/options.ts";
import {computed} from "vue";

interface Props{
  value:number|string
  options:optionsColorType[]
}

const props =defineProps<Props>()

const item = computed(()=>{const obj = props.options.find((value) => value.value === props.value)
  if(obj){
    return obj
  }
  return{label:"-",color:""}
})

</script>

<template>
  <a-tag :color="item.color">{{item.label}}</a-tag>
</template>

<style lang="less">

</style>