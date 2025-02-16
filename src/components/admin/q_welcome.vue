<script lang="ts" setup>


import {computed, reactive} from "vue";
import {dataSumApi, type dataSumType} from "@/api/data_api.ts";
import {Message} from "@arco-design/web-vue";

interface Props {
  noWeather?: boolean
  noHelp?: boolean
}

const props = defineProps<Props>()
const data = reactive<dataSumType>({
  "flowCount": 0,
  "userCount": 0,
  "articleCount": 0,
  "messageCount": 0,
  "commentCount": 0,
  "newLoginCount": 0,
  "newSignCount": 0
})

async function getData() {
  const res = await dataSumApi()
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}

getData()

const welcomeTitle = computed(() => {
  const now = new Date().getHours()
  if (now <= 9 && now > 6) {
    return "早安"
  }
  if (now <= 12 && now > 9) {
    return "上午好"
  }
  if (now <= 14 && now > 12) {
    return "中午好"
  }
  if (now <= 16 && now > 14) {
    return "下午好"
  }
  if (now <= 20 && now > 16) {
    return "晚上好"
  }
  if (now <= 24 && now > 20) {
    return "晚上好"
  }
  return "早安"
})


</script>

<template>
  <div class="q_welcome">
    <div class="title">{{ welcomeTitle }} 欢迎!!!</div>
    <div v-if="!props.noWeather" class="weather">天气</div>
    <div class="statistics">
      <a-statistic :value="data.flowCount" animation show-group-separator title="当日流量"/>
      <a-statistic :value="data.userCount" animation show-group-separator title="用户总数"/>
      <a-statistic :value="data.articleCount" animation show-group-separator title="文章总数"/>
      <a-statistic :value="data.messageCount" animation show-group-separator title="消息总数"/>
      <a-statistic :value="data.commentCount" animation show-group-separator title="评论总数"/>
      <a-statistic :value="data.newLoginCount" animation show-group-separator title="今日登录"/>
      <a-statistic :value="data.newSignCount" animation show-group-separator title="今日注册"/>
    </div>
    <div v-if="!props.noHelp" class="extra">
      跳转<a href="https://332luntan.xyz">系统帮助</a>
    </div>
  </div>
</template>

<style lang="less">
.q_welcome {
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

  .title {
    font-size: 22px;
    color: var(--color-text-1);
  }

  .weather {
    margin-top: 20px;
  }

  .statistics {
    margin-top: 20px;

    .arco-statistic {
      margin-right: 30px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .extra {
    margin-top: 20px;

    a {
      text-decoration: none;
      color: @primary-6;
    }
  }

}
</style>