<script lang="ts" setup>
import Q_site from "@/components/admin/site/q_site.vue";
import Q_title from "@/components/admin/q_title.vue";
import {type aiResponse, aiSearchIndexApi} from "@/api/site_api.ts";
import Q_image_upload from "@/components/common/q_image_upload.vue";
import {Message} from "@arco-design/web-vue";

async function aiSearchIndex() {
  const res = await aiSearchIndexApi();
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}

</script>

<template>
  <div class="email_view">
    <a-row>
      <a-col :span="8">
        <q_site v-slot="{form}:{form:aiResponse}" name="ai">
          <q_title>AI设置</q_title>
          <div class="body">
            <a-form :label-col-props="{span: 4}" :model="form" :wrapper-col-props="{span: 20}">
              <div class="body-header">
                <a-form-item label="是否启用AI">
                  <a-switch v-model="form.enable"></a-switch>
                </a-form-item>
                <a-form-item label="RGA">
                  <a-button type="primary" @click="aiSearchIndex">索引重建</a-button>
                </a-form-item>
              </div>
              <a-form-item label="秘钥">
                <a-input v-model="form.secretKey" placeholder="秘钥"></a-input>
              </a-form-item>
              <a-form-item label="AI昵称">
                <a-input v-model="form.nickname" placeholder="昵称"></a-input>
              </a-form-item>
              <a-form-item label="AI头像">
                <q_image_upload v-model="form.avatar" placeholder="头像地址"></q_image_upload>
              </a-form-item>
              <a-form-item label="AI昵称">
                <a-input v-model="form.nickname" placeholder="昵称"></a-input>
              </a-form-item>
              <a-form-item label="开场白">
                <a-textarea v-model="form.abstract" placeholder="AI开场白"></a-textarea>
              </a-form-item>
              <div class="site_update_btn"></div>
            </a-form>
          </div>
        </q_site>
      </a-col>
    </a-row>
  </div>
</template>

<style lang="less">
.email_view {
  .arco-form {
    margin-top: 10px;


  }
}
</style>