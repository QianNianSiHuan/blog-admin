<script lang="ts" setup>
import {articleAddApi, type articleAddType} from "@/api/article_api";
import {Message} from "@arco-design/web-vue";
import router from "@/router";
import Q_card from "@/components/web/q_card.vue";
import 'md-editor-v3/lib/style.css';
import Q_article_form from "@/components/web/article/q_article_form.vue";
import {ref} from "vue";
import {userStores} from "@/stores/user_store.ts";

const siteStore = userStores()
const articleFormRef = ref()

async function create(form: articleAddType) {
  const res = await articleAddApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  router.push({name: 'platformArticle'})
}

async function aiAnalysis() {
  await articleFormRef.value.aiAnalysis()
}

</script>

<template>
  <div class="platform_article_add_view">
    <q_card title="发布文章">
      <template v-if="siteStore.siteInfo.ai.enable" #head>
        <a-button style="border-radius: 5px" type="primary" @click="aiAnalysis">AI分析</a-button>
      </template>
      <q_article_form ref="articleFormRef" @ok="create"></q_article_form>
    </q_card>
  </div>
</template>

<style lang="less">
.platform_article_add_view {
  .q_card_com {
    .body {
      overflow-y: auto;
      max-height: calc(100vh - 160px);
    }
  }
}
</style>