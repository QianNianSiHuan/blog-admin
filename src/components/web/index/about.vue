<script lang="ts" setup>
import {userStores} from "@/stores/user_store.ts";
import Q_card from "@/components/web/q_card.vue";

const store = userStores()
const version = import.meta.env.VITE_VERSION;
</script>

<template>
  <q_card class="about_com" title="关于我们">
    <div v-if="store.siteInfo.about.siteDate" class="item">
      <span>建站日期</span>
      <span>{{ store.siteInfo.about.siteDate }}</span>
    </div>
    <div class="item">
      <span>网站版本</span>
      <span>{{ version }}</span>
    </div>
    <div class="item">
      <span>联系作者</span>
    </div>
    <div class="item icons">
      <div v-if="store.siteInfo.about.QQ" class="icon qq_icon">
        <img :src="store.siteInfo.about.QQ" alt="" class="qq">
        <img alt="" src="@/assets/image/QQ.svg">
      </div>
      <div v-if="store.siteInfo.about.wechat" class="icon wechat_icon">
        <img :src="store.siteInfo.about.wechat" alt="" class="wechat">
        <img alt="" src="@/assets/image/index_about/微信.svg">
      </div>
      <div v-if="store.siteInfo.about.bilibili" class="icon">
        <a :href="store.siteInfo.about.bilibili" target="_blank"> <img alt=""
                                                                       src="@/assets/image/index_about/bilibili.svg"></a>
      </div>
      <div v-if="store.siteInfo.about.gitee" class="icon">
        <a :href="store.siteInfo.about.gitee" target="_blank"> <img alt=""
                                                                    src="@/assets/image/index_about/gitee.svg"></a>
      </div>
      <div v-if="store.siteInfo.about.gitHub" class="icon">
        <a :href="store.siteInfo.about.gitHub" target="_blank"><img alt="" src="@/assets/image/index_about/github.svg"></a>
      </div>
    </div>
    <div class="beian">
      <div v-if="store.siteInfo.siteInfo.icpBeian" class="item icpBeian">
        <a href="http://beian.miit.gov.cn"> <img alt="" src="@/assets/image/index_about/ICPbeian.svg">
          <span>{{ store.siteInfo.siteInfo.icpBeian }}</span></a>
      </div>
      <div v-if="store.siteInfo.siteInfo.policeBeian" class="item policeBeian">
        <a href="http://beian.miit.gov.cn"> <img alt="" src="@/assets/image/index_about/beian.png">
          <span>{{ store.siteInfo.siteInfo.policeBeian }}</span></a>
      </div>
    </div>
  </q_card>
</template>

<style lang="less">
.about_com {
  .item {
    display: flex;
    align-items: center;
    color: var(--color-text-2);
    font-size: 15px;
    margin-bottom: 10px;

    span:nth-child(2) {
      margin-left: 5px;
    }
  }

  .icons {
    display: flex;
    justify-content: space-around;
    margin-top: 15px;

    .icon {
      cursor: pointer;
      position: relative;

      img {
        width: 30px;
        height: 30px;
      }

      .qq, .wechat {
        position: absolute;
        width: 100px;
        height: 100px;
        bottom: 40px;
        left: -35px;
        opacity: 0;
        padding: 10px;
      }

    }

    .qq_icon {
      &:hover {
        .qq {
          opacity: 1;
        }
      }
    }

    .wechat_icon {
      &:hover {
        .wechat {
          opacity: 1;
        }
      }
    }
  }

  .beian {
    justify-content: center;

    img {
      width: 15px;
    }

    a {
      display: flex;
      align-items: center;
      color: var(--color-text-2);
    }
  }
}
</style>