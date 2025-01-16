<script setup lang="ts">
import {articleAddApi, type articleAddType, articleUpdateApi} from "@/api/article_api";
import {Message} from "@arco-design/web-vue";
import router from "@/router";
import Q_card from "@/components/web/q_card.vue";
import 'md-editor-v3/lib/style.css';
import Q_article_form from "@/components/web/article/q_article_form.vue";
import {useRoute} from "vue-router";


const route =useRoute()
async function edit(form:articleAddType) {
  console.log(form);
  const res = await articleUpdateApi({
    ...form,
    id:Number(route.params.id),
  })
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  router.push({name: 'platformArticle'})
}

</script>

<template>
  <div class="platform_article_add_view">
    <q_card title="编辑文章">
      <q_article_form @ok="edit" :article-i-d="Number(route.params.id)"></q_article_form>
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