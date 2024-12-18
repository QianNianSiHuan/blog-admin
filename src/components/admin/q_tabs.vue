<script setup lang="ts">
import {IconClose} from "@arco-design/web-vue/es/icon";
import {type RouteMeta, useRoute} from "vue-router";
import router from "@/router";
import {ref} from "vue";
import {watch} from "vue";
import {Swiper, SwiperSlide} from 'swiper/vue';
import {onMounted} from "vue";

interface MateType extends RouteMeta{
  title:string
}


const route =useRoute()
interface  TabType {
  name:string
  title:string
}

const  tabs = ref<TabType[]>([
  {title:"首页",name:"home"},
])
function check(item:TabType){
  router.push({
    name:item.name
  })
  saveTabs()
}

function saveTabs(){
  localStorage.setItem("q_tabs",JSON.stringify(tabs.value))
}


function removeItem(item:TabType){
  if (item.name==='home'){
    return
  }
  const index = tabs.value.findIndex(value => item.name === value.name)
  if (index !== -1){
    //判断删除的元素，是不是我当前所在的
    if(item.name===route.name){
      router.push({
        name:tabs.value[index - 1].name
      })
    }
    tabs.value.splice(index,1)
    saveTabs()
  }
}


function removeAllItem(){
  tabs.value=[{title:"首页",name:"home"}]
  router.push({
    name:"home"
  })
  saveTabs()
}

function loadTabs(){
  const q_tabs = localStorage.getItem("q_labs")
  if (q_tabs){
  try{
    tabs.value =JSON.parse(q_tabs)
  }catch (e){
    console.log(e)
  }
  }
}
loadTabs()

watch(() => route.name, () => {
  SelectTabInView()
})

watch(() => route.name, () => {
  // 判断当前路由的名称，在不在tabs里面，如果不在就加入进去
  const index = tabs.value.findIndex((value) => route.name === value.name)
  if (index === -1) {
    tabs.value.push({
      name: route.name as string,
      title: (route.meta as MateType).title,
    })
  }
}, {immediate: true})
const slidesCount =ref(100)
onMounted(()=>{
  SelectTabInView()
})
//让选中的标签在视图中
function SelectTabInView() {
  //显示总宽度
  const  swiperDom =document.querySelector(".q_tabs_swiper")as HTMLDivElement
  const swiperWidth = swiperDom.clientWidth
  //实际总宽度
  const wrapperDom = document.querySelector(".swiper-wrapper") as  HTMLDivElement
  const wrapperWidth = wrapperDom.clientWidth

  if (swiperWidth>wrapperWidth){
    return
  }
//如果实际宽度大于显示总宽度
  let swiperSlideList = document.querySelectorAll(".swiper-wrapper .swiper-slide")

  let sum = 0
  let count = 0

  for (const slide of swiperSlideList) {
    sum += slide.clientWidth
    if (sum > swiperWidth) {
      break
    }
    count++
  }
  slidesCount.value = count

  setTimeout(()=>{
    // 算选中的tab，是不是超过视图可见位置
    const activeTab = document.querySelector(".q_tabs_swiper .swiper-slide.active") as HTMLDivElement
    const w = (activeTab.offsetLeft - swiperWidth) + activeTab.clientWidth
    const div = document.querySelector(".swiper-wrapper") as HTMLDivElement
    div.style.transform = `translate3d(-${w}px, 0px, 0px)`

  }, 0)
}


</script>

<template>
<div class="q_tabs">
  <swiper class="q_tabs_swiper" :slides-per-view = slidesCount>
    <swiper-slide v-for="item in tabs"  :class="{active:route.name===item.name}">
      <div class="item" @click="check(item)" @mousedown.middle.stop="removeItem(item)" :class="{active:route.name===item.name}" >
        {{item.title}}
        <span class="close" @click.stop="removeItem(item)" title="删除" v-if="item.name !=='home'">
        <IconClose/>
      </span>
      </div>
    </swiper-slide>
  </swiper>

  <div class="item" @click="removeAllItem">
    删除全部
  </div>
</div>
</template>

<style lang="less">
.q_tabs{
display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;

  .swiper{
    overflow: hidden;
    width: calc(100% - 94px);
    display: flex;

    .swiper-wrapper{
      display: flex;
      align-items: center;

      .swiper-slide{
        width: fit-content!important;
        flex-shrink: 0;
      }
    }

  }
  .item{
    padding: 3px 8px;
    background-color: var(--color-bg-1);
    border: @q_border;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 5px;
    flex-shrink: 0;

    &:hover{
      background-color: var(--color-fill-1);
    }

    &.active{
      background-color: @primary-6;
      color: white;
    }
  }
}
</style>