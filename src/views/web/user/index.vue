<script lang="ts" setup>
import Q_main from "@/components/web/q_main.vue";
import Q_nav from "@/components/web/q_nav.vue";
import {userBaseStores} from "@/stores/user_base_store.ts";
import {userStores} from "@/stores/user_store.ts";
import Q_a from "@/components/common/q_a.vue";
import {ref, watch} from "vue";
import router from "@/router";
import {useRoute} from "vue-router";

const route = useRoute()
const userBaseInfo = userBaseStores()
userBaseInfo.getUserBaseInfo(Number(route.params.id))
const userStore = userStores()
const text = ref<string>("")

async function search() {
  router.push({
    name: route.name as string,
    query: {
      ...route.query,
      key: text.value
    },
    params: route.params
  })
}

watch(() => route.params.id, () => {
  const id = Number(route.params.id)
  if (!isNaN(id)) {
    userBaseInfo.getUserBaseInfo(Number(id))
  }
}, {immediate: true});


async function focus() {
}
</script>

<template>
  <div :class="`user_style_${userBaseInfo.userBase.homeStyleID}`" class="user_view">
    <q_nav no-scroll></q_nav>
    <q_main>
      <div class="user_info">
        <div class="avatar">
          <a-avatar :image-url="userBaseInfo.userBase.avatar" :size="50"></a-avatar>
        </div>
        <div class="info">
          <div class="nick">
            <span>{{ userBaseInfo.userBase.nickname }}</span>
            <span>码龄:{{ userBaseInfo.userBase.codeAge }}年</span>
          </div>
          <div class="data">
            <span>
              <span>{{ userBaseInfo.userBase.lookCount }}</span> <span>总访问量</span>
            </span>
            <span>
              <span>{{ userBaseInfo.userBase.articleCount }}</span> <span>文章</span>
            </span>
            <span>
              <span>{{ userBaseInfo.userBase.fansCount }}</span> <span>粉丝</span>
            </span>
            <span>
              <span>{{ userBaseInfo.userBase.followCount }}</span><span>粉丝</span>
            </span>
          </div>
          <div class="place">
            ip归属:{{ userBaseInfo.userBase.place }}
          </div>
        </div>
        <div class="actions">
          <template v-if="userBaseInfo.userBase.userID !== userStore.userInfo.userID">
            <q_a>
              <a-button size="mini" type="outline">
                <template #icon>
                  <icon-plus></icon-plus>
                </template>
                关注
              </a-button>
            </q_a>
            <router-link to="">
              <a-button size="mini" type="outline">
                <template #icon>
                  <icon-message></icon-message>
                </template>
                私信
              </a-button>
            </router-link>
          </template>
          <template v-else>
            <router-link :to="{name:'userCenterInfo'}">
              <a-button size="mini" type="outline">编辑资料</a-button>
            </router-link>
            <router-link :to="{name:'platformArticle'}">
              <a-button size="mini" type="outline">管理文章</a-button>
            </router-link>
          </template>
        </div>
      </div>
      <div class="user_sub_view">
        <div class="head">
          <div class="left">
            <router-link v-if="userStore.isAdmin" :to="{name:'userArticle'}">
              {{ userBaseInfo.isMe ? '我的文章' : '他的文章' }}
            </router-link>
            <router-link v-if="!userBaseInfo.userBase.openCollect||!userBaseInfo.isMe"
                         :to="{name:'userArticleCollect'}">
              {{ userBaseInfo.isMe ? '我的收藏' : '他的收藏' }}
            </router-link>
            <!--            <router-link v-if="!userBaseInfo.userBase.openFollow||!userBaseInfo.isMe" to="">-->
            <!--              {{ userBaseInfo.isMe ? '我的关注' : '他的关注' }}-->
            <!--            </router-link>-->
            <!--            <router-link v-if="!userBaseInfo.userBase.openFans||!userBaseInfo.isMe" to="">-->
            <!--              {{ userBaseInfo.isMe ? '我的粉丝' : '他的粉丝' }}-->
            <!--            </router-link>-->
          </div>
          <a-input-search v-model="text" :on-search="search" placeholder="搜索内容"
                          @keydown.enter="search"></a-input-search>
        </div>
        <div class="body">
          <router-view></router-view>
        </div>
      </div>
    </q_main>
  </div>
</template>

<style lang="less">
.user_view {
  display: flex;
  height: calc(100vh - 60px);

  .user_info {
    background: var(--color-bg-1);
    border-radius: 5px;
    padding: 10px;
    position: relative;
    display: flex;
    margin-top: 20px;

    .avatar {
      width: 100px;

      .arco-avatar {
        position: absolute;
        left: 20px;
        top: -10px;
      }
    }

    .info {
      width: calc(100% - 100px);

      .nick {
        span:nth-child(1) {
          color: var(--color-text-2);
          margin-right: 10px;
        }
      }

      .data {
        margin: 5px 0;

        > span {
          span:nth-child(1) {
            font-size: 18px;
            color: var(--color-text-1);
          }

          span:nth-child(2) {
            color: var(--color-text-2);
          }
        }
      }

      .place {
        color: var(--color-text-2);
        font-size: 12px;
        margin-top: 5px;
      }
    }


    .actions {
      position: absolute;
      right: 10px;

      a {
        margin-left: 20px;

        .arco-btn {
          border-radius: 100px;
        }
      }
    }
  }

  .user_sub_view {
    margin-top: 20px;
    border-radius: 5px;
    background: var(--color-bg-1);

    .head {
      border-bottom: @q_border;
      display: flex;
      padding: 10px 20px 10px 20px;
      align-items: center;
      justify-content: space-between;

      .arco-input-wrapper {
        width: 200px;
        border-radius: 100px;
      }

      .left {
        a {
          color: var(--color-text-1);
          font-size: 15px;
          margin-right: 20px;
        }

        a.router-link-active {
          color: rgb(var(--arcoblue-6));
        }
      }

    }

    .body {
      height: calc(100vh - 250px);
    }
  }
}
</style>