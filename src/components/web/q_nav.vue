<script lang="ts" setup>
import {ref} from "vue";
import Q_nav_msg from "@/components/web/q_nav_msg.vue";
import Q_nav_avatar from "@/components/web/q_nav_avatar.vue";
import Q_text_search_modal from "@/components/web/q_text_search_modal.vue";


interface Props {
  noScroll?: boolean
  scrollTop?: number
}

const props = defineProps<Props>()
const {noScroll = false, scrollTop = 200} = props

const isShow = ref(noScroll)

if (!noScroll) {
  window.onscroll = function () {
    const top = document.documentElement.scrollTop
    isShow.value = top >= scrollTop;
  }
}
const visible = ref(false);
const textSearchRef = ref()
const key = ref("")

function search() {
  visible.value = !visible.value;
  if (key.value) {
    textSearchRef.value.setSearch(key.value)
  }
}


</script>

<template>
  <div :class="{isShow: isShow}" class="q_nav">
    <div class="container">
      <div class="logo">
        <a href="/">
          <span class="n1">首页</span>
          <span class="n2"></span>
        </a>
      </div>
      <q_text_search_modal ref="textSearchRef" v-model:visible="visible"></q_text_search_modal>
      <div class="center">
        <i class="iconfont icon-dengpao"></i>
        <a-input-search v-model="key" placeholder="搜索你喜欢的文章" @search="search"
                        @keydown.enter="search"></a-input-search>
      </div>
      <div class="right">
        <q_nav_avatar></q_nav_avatar>
        <q_nav_msg></q_nav_msg>
        <a href="javascript:void 0">历史</a>
        <router-link :to="{name: 'platformArticleAdd'}">
          <a-button type="primary"><i class="iconfont icon-jia"></i> <span>发布</span></a-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.q_nav {
  width: 100vw;
  height: 60px;
  position: fixed;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  color: white;
  transition: all .3s;

  &.isShow {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.06);
    background-color: var(--color-bg-1);
    color: var(--color-text-2);

    .cnSlogan {
      color: var(--color-text-1);
    }

    .enSlogan {
      color: var(--color-text-2);
    }

    a {
      color: var(--color-text-2) !important;
    }

    .theme {
      color: var(--color-text-2) !important;
    }
  }

  .container {
    width: 1200px;
    display: flex;
    align-items: center;

    .logo {
      width: 20%;

      a {
        .n1 {
          font-size: 16px;
          color: var(--color-text-1);
        }

        .n2 {
          margin-left: 10px;
          font-size: 14px;
          color: var(--color-text-2);
        }
      }
    }

    .center {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        margin-right: 20px;
        font-size: 20px;
        color: rgb(var(--arcoblue-6));
        cursor: pointer;
      }

      .arco-input-wrapper {
        width: 400px;
        border-radius: 20px;
      }
    }

    .arco-avatar {
      margin-right: 20px;
    }

    .right {
      display: flex;
      align-items: center;
      width: 30%;
      justify-content: end;

      > a {
        margin-right: 20px;
      }
    }

    .q_nav_mag_com {
      margin-right: 20px;
    }

    .arco-btn {
      border-radius: 200px;
      font-size: 12px;

      i {
        font-size: 14px;
        margin-right: 5px;
        display: flex;
        align-items: center;
      }
    }
  }
}

</style>