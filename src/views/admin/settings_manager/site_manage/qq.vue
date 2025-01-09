<script setup lang="ts">
import Q_site from "@/components/admin/site/q_site.vue";
import Q_title from "@/components/admin/q_title.vue";
import type {qqResponse} from "@/api/site_api.ts";
</script>

<template>
  <div class="email_view">
    <a-row>
      <a-col :span="8">
        <q_site name="qq" v-slot="{form}:{form:qqResponse}">
          <q_title>QQ设置</q_title>
          <div class="body">
            <a-form :label-col-props="{span: 4}" :wrapper-col-props="{span: 20}" :model="form">
              <a-form-item label="appID">
                <a-input placeholder="appID" v-model="form.appID"></a-input>
                <template #help>
                  先去qq互联 <a href="https://connect.qq.com/" target="_blank">进行实名认证</a>
                </template>
              </a-form-item>
              <a-form-item label="appKey">
                <a-input placeholder="appKey" v-model="form.appKey"></a-input>
              </a-form-item>
              <a-form-item label="回调地址">
                <a-input placeholder="回调地址" v-model="form.redirect"></a-input>
                <template #help>
                  回调地址为线上网址
                </template>
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