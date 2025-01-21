<script lang="ts" setup>

import Q_nav from "@/components/web/q_nav.vue";
import Q_footer from "@/components/web/q_footer.vue";
import Q_main from "@/components/web/q_main.vue";
import Banner_list from "@/components/web/index/banner_list.vue";
</script>

<template>
  <div class="web_home_view">
    <q_nav no-scroll></q_nav>
    <q_main>
      <div class="left">
        <div class="banner">
          <banner_list></banner_list>
        </div>
        <div class="article_list">

        </div>
      </div>
      <div class="right">

      </div>
    </q_main>
    <q_footer></q_footer>
  </div>
</template>

<style lang="less">
.web_home_view {
  .q_container {
    display: flex;
    justify-content: space-between;

    .left {
      width: calc(100% - 280px);

      .q_banner_com {
        margin-top: 20px;
      }
    }

    .right {
      width: 260px;
    }
  }
}
</style>