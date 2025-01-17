<script setup lang="ts">
import Q_site from "@/components/admin/site/q_site.vue";
import Q_title from "@/components/admin/q_title.vue";
import type {qiNiuResponse} from "@/api/site_api.ts";
</script>

<template>
  <div class="email_view">
    <a-row>
      <a-col :span="8">
        <q_site name="qiNiu" v-slot="{form}:{form:qiNiuResponse}">
          <q_title>七牛云设置</q_title>
          <div class="body">
            <a-form :label-col-props="{span: 4}" :wrapper-col-props="{span: 20}" :model="form">
              <a-form-item label="accessKey">
                <a-input placeholder="accessKey" v-model="form.accessKey"></a-input>
              </a-form-item>
              <a-form-item label="secretKey">
                <a-input placeholder="secretKey" v-model="form.secretKey"></a-input>
              </a-form-item>
              <a-form-item label="存储桶">
                <a-input placeholder="bucket" v-model="form.bucket"></a-input>
              </a-form-item>
              <a-form-item label="前置uri">
                <a-input placeholder="uri" v-model="form.uri"></a-input>
              </a-form-item>
              <a-form-item label="地区">
                <a-input placeholder="region" v-model="form.region"></a-input>
              </a-form-item>
              <a-form-item label="大小限制">
                <a-input-number placeholder="size" v-model="form.size"></a-input-number>
              </a-form-item>
              <a-form-item label="过期时间">
                <a-input-number placeholder="expiry" v-model="form.expiry"></a-input-number>
              <template #help>
                用于生成客户端上传凭证的时间
              </template>
              </a-form-item>
              <a-form-item label="是否启用">
                <a-switch v-model="form.enable"></a-switch>
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