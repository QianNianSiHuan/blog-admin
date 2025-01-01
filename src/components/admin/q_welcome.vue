<script setup lang="ts">


import {computed} from "vue";

interface Props {
  noWeather?:boolean
  noHelp?:boolean
}
const props = defineProps<Props>()



const welcomeTitle =computed(()=>{
  const now =new Date().getHours()
  console.log(now)
  if (now<=9&&now>6){
    return "早安"
  }
  if(now<=12&&now>9){
    return "上午好"
  }
  if(now<=14&&now>12){
    return "中午好"
  }
  if(now<=16&&now>14){
    return "下午好"
  }
  if(now<=20&&now>16){
    return "晚上好"
  }
  if(now<=24&&now>20){
    return "晚上好"
  }
  return "早安"
})


</script>

<template>
  <div class="q_welcome">
    <div class="title">{{ welcomeTitle }} 欢迎!!!</div>
    <div class="weather" v-if="!props.noWeather">天气</div>
    <div class="statistics">
      <a-statistic animation title="用户总数" :value="12354" show-group-separator/>
      <a-statistic animation title="文章总数" :value="55555" show-group-separator/>
    </div>
    <div class="extra" v-if="!props.noHelp">
      跳转<a href="https://332luntan.xyz">系统帮助</a>
    </div>
  </div>
</template>

<style lang="less">
.q_welcome{
  width: 100%;
  background-color: var(--color-bg-1);
  border-radius: 5px;
  margin-bottom: 20px;
  background-image: url("@/assets/image/home_bg.svg");
  background-size: 430px;
  background-repeat: no-repeat;
  background-position: right center;
  padding: 40px 20px;
  color: var(--color-text-2);
  .title{
    font-size: 22px;
    color: var(--color-text-1);
  }
  .weather{
    margin-top: 20px;
  }
  .statistics{
    margin-top: 20px;
    .arco-statistic{
      margin-right: 30px;
      &:last-child{
        margin-right: 0;
      }
    }
  }
  .extra{
    margin-top: 20px;
    a{
      text-decoration: none;
      color: @primary-6;
    }
  }

}
</style>