<script lang="ts" setup>
import {type articleAddType, articleUpdateApi} from "@/api/article_api";
import {Message} from "@arco-design/web-vue";
import router from "@/router";
import Q_card from "@/components/web/q_card.vue";
import 'md-editor-v3/lib/style.css';
import Q_article_form from "@/components/web/article/q_article_form.vue";
import {useRoute} from "vue-router";
import {userStores} from "@/stores/user_store.ts";
import {ref} from "vue";

const siteStore = userStores()
const route = useRoute()
const articleFormRef = ref()

async function edit(form: articleAddType) {
  console.log(form);
  const res = await articleUpdateApi({
    ...form,
    id: Number(route.params.id),
  })
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
    <q_card title="编辑文章">
      <template v-if="siteStore.siteInfo.ai.enable" #head>
        <a-button style="border-radius: 5px" type="primary" @click="aiAnalysis">AI分析</a-button>
      </template>
      <q_article_form ref="articleFormRef" :article-i-d="Number(route.params.id)" @ok="edit"></q_article_form>
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