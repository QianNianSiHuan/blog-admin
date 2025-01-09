<script setup lang="ts">
import Q_site from "@/components/admin/site/q_site.vue";
import Q_title from "@/components/admin/q_title.vue";
import type {aiResponse} from "@/api/site_api.ts";
import Q_image_upload from "@/components/common/q_image_upload.vue";
</script>

<template>
  <div class="email_view">
    <a-row>
      <a-col :span="8">
        <q_site name="ai" v-slot="{form}:{form:aiResponse}">
          <q_title>AI设置</q_title>
          <div class="body">
            <a-form :label-col-props="{span: 4}" :wrapper-col-props="{span: 20}" :model="form">
              <a-form-item label="是否启用AI">
                <a-switch v-model="form.enable"></a-switch>
              </a-form-item>
              <a-form-item label="秘钥">
                <a-input placeholder="秘钥" v-model="form.secretKey"></a-input>
              </a-form-item>
              <a-form-item label="AI昵称">
                <a-input placeholder="昵称" v-model="form.nickname"></a-input>
              </a-form-item>
              <a-form-item label="AI头像">
                <q_image_upload :model-value="form.avatar" placeholder="头像地址"></q_image_upload>
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
.email_view{
  .arco-form{
    margin-top: 10px;
  }
}
</style>