<script lang="ts" setup>
import {userStores} from "@/stores/user_store.ts";
import router from "@/router";
import {showLogin} from "@/components/web/q_login.ts";
import {goUser} from "@/utils/go_router.ts";

const userStore = userStores()

function goRouter(name: string) {
  if (name === "exit") {
    userStore.userLogout()
    return
  }
  router.push({
    name: name
  })
}

</script>

<template>
  <a-avatar v-if="!userStore.isLogin" :size="30" class="avatar_1" @click="()=>{
    showLogin
  }">登录
  </a-avatar>
  <a-trigger v-else :unmount-on-close="false" animation-name="fade" class="q_nav_avatar_trigger" trigger="hover">
    <a-avatar :image-url="userStore.userInfo.avatar" :size="30" class="avatar_1"
              @click="goUser(userStore.userInfo.userID)">{{ userStore.userInfo.nickName[0] }}
    </a-avatar>
    <template #content>
      <div class="q_nav_avatar_com">
        <div class="avatar">
          <a-avatar :image-url="userStore.userInfo.avatar" :size="60" @click="goUser(userStore.userInfo.userID)">
            {{ userStore.userInfo.nickName[0] }}
          </a-avatar>
        </div>
        <div class="nickname">admin</div>
        <div class="data">
          <a-statistic :value="userStore.userInfo.fansCount" extra="粉丝"/>
          <a-statistic :value="userStore.userInfo.followCount" extra="关注"/>
          <a-statistic :value="userStore.userInfo.articleCount" extra="文章"/>
        </div>
        <div class="menu">
          <div class="item" @click="goRouter('userCenterInfo')"><i class="iconfont icon-list"></i><span>个人中心</span>
          </div>
          <div class="item" @click="goRouter('platformArticle')"><i class="iconfont icon-list"></i><span>文章管理</span>
          </div>
          <div class="item" @click="goRouter('msgChat')"><i class="iconfont icon-list"></i><span>我的消息</span></div>
          <div v-if="userStore.isAdmin" class="item" @click="goRouter('admin')"><i class="iconfont icon-list"></i><span>后台管理</span>
          </div>
          <div class="exit" @click="goRouter('exit')">
            <div class="item"><i class="iconfont icon-list"></i><span>退出</span></div>
          </div>
        </div>
      </div>
    </template>
  </a-trigger>
</template>

<style lang="less">
.avatar_1 {
  cursor: pointer;
  background: rgb(var(--arcoblue-6));
}

.q_nav_avatar_com {
  width: 180px;
  border-radius: 5px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
  background: var(--color-bg-1);
  color: var(--color-text-2);
  position: relative;

  .avatar {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;

    .arco-avatar {
      background: rgb(var(--arcoblue-6));
    }
  }

  .nickname {
    padding: 40px 20px 10px 20px;
    text-align: center;
  }

  .data {
    border-top: @q_border;
    border-bottom: @q_border;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 10px 10px;

    .arco-statistic {
      line-height: 1.5rem;
    }

    .arco-statistic-content {
      display: flex;
      flex-direction: column;
      align-items: center;

      .arco-statistic-value-integer {
        font-size: 18px;
        color: var(--color-text-1);
      }

      .arco-statistic-extra {
        margin-top: 0;
      }
    }
  }

  .item {
    height: 35px;
    display: flex;
    padding: 0 20px;
    align-items: center;
    cursor: pointer;

    &:hover {
      background: var(--color-fill-1);
    }

    i {
      margin-right: 8px;
      margin-top: 4px;
    }
  }

  .menu {
    border-bottom: @q_border;
    padding: 10px 0;
  }

  .exit {
    padding: 10px 0;
  }
}

.q_nav_avatar_trigger {
  .arco-trigger-popup-wrapper {
    transition: all .3s;
  }

  // 组件刚开始离开
  .fade-leave-active {
  }

  // 组件离开结束
  .fade-leave-to {
    transform: scale(0.8);
    opacity: 0;
    transform-origin: top center;
  }

  // 组件刚开始进入
  .fade-enter-active {
    transform: scale(0.8);
    transform-origin: top center;
    opacity: 1;
  }

  // 组件进入完成
  .fade-enter-to {
    transform: scale(1);
    transform-origin: top center;
    opacity: 1;
  }

}

</style>