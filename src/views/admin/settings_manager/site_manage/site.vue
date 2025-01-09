<script setup lang="ts">
import Q_title from "@/components/admin/q_title.vue";
import Q_image_upload from "@/components/common/q_image_upload.vue";
import Q_index_right from "@/components/admin/site/q_index_right.vue";
import Q_site from "@/components/admin/site/q_site.vue";

</script>

<template>
<div class="site_view" >
  <q_site name="site" v-slot="{form}">
    <a-form :model="form">
      <a-row>
        <a-col :span="8">
          <div class="form site_form">
            <q_title>网站设置</q_title>
            <div class="body">
              <a-form-item :label-col-props="{span:4}" :wrapper-col-props="{span:18}" label="网站标题">
                <a-input placeholder="网站标题" v-model="form.siteInfo.title"></a-input>
              </a-form-item>
              <a-form-item :label-col-props="{span:4}" :wrapper-col-props="{span:18}" label="logo">
                <q_image_upload v-model="form.siteInfo.logo" placeholder="logo图片"></q_image_upload>
              </a-form-item>
              <a-form-item :label-col-props="{span:4}" :wrapper-col-props="{span:18}" label="备案号">
                <a-input placeholder="备案号" v-model="form.siteInfo.beian"></a-input>
              </a-form-item>
              <a-form-item :label-col-props="{span:4}" :wrapper-col-props="{span:18}" label="运行模式">
                <a-radio-group v-model="form.siteInfo.mode">
                  <a-radio :value="1">社区模式</a-radio>
                  <a-radio :value="2">博客模式</a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </div>
          <div class="form project_form">
            <q_title>项目设置</q_title>
            <div class="body">
              <a-form-item :label-col-props="{span:4}" :wrapper-col-props="{span:18}" label="网站title">
                <a-input placeholder="网站标题" v-model="form.project.title"></a-input>
              </a-form-item>
              <a-form-item :label-col-props="{span:4}" :wrapper-col-props="{span:18}" label="网站icon">
                <q_image_upload v-model="form.project.icon" placeholder="网站icon"></q_image_upload>
              </a-form-item>
              <a-form-item :label-col-props="{span:4}" :wrapper-col-props="{span:18}" label="前端地址">
                <a-input placeholder="前端地址" v-model="form.project.webPath"></a-input>
              </a-form-item>
            </div>
          </div>
          <div class="form seo_form">
            <q_title>seo设置</q_title>
            <div class="body">
              <a-form-item :label-col-props="{span:4}" :wrapper-col-props="{span:18}" label="keywords">
                <a-input placeholder="keywords" v-model="form.project.title"></a-input>
              </a-form-item>
              <a-form-item :label-col-props="{span:4}" :wrapper-col-props="{span:18}" label="description">
                <a-textarea placeholder="description":auto-size="{minRows:2,maxRows:3}" v-model="form.project.webPath"></a-textarea>
              </a-form-item>
            </div>
          </div>
          <div class="site_update_btn"></div>
        </a-col>
        <a-col :span="8">
          <div class="form about_form">
            <q_title>关于我们</q_title>
            <div class="body">
              <a-form-item :label-col-props="{span:4}" :wrapper-col-props="{span:18}" label="建站日期">
                <a-input placeholder="建站日期" v-model="form.about.siteDate"></a-input>
              </a-form-item>
              <a-form-item :label-col-props="{span:4}" :wrapper-col-props="{span:18}" label="网站版本">
                <span>10.0.1</span>
                <span>/</span>
                <span>{{ form.about.version}}</span>
              </a-form-item>
              <a-form-item :label-col-props="{span:4}" :wrapper-col-props="{span:18}" label="qq二维码">
                <q_image_upload v-model="form.about.QQ" shape="" placeholder="qq二维码地址"></q_image_upload>
              </a-form-item>
              <a-form-item :label-col-props="{span:4}" :wrapper-col-props="{span:18}" label="微信二维码">
                <q_image_upload v-model="form.about.wechat"  placeholder="微信二维码地址"></q_image_upload>
              </a-form-item>
              <a-form-item :label-col-props="{span:4}" :wrapper-col-props="{span:18}" label="gitee">
                <a-input placeholder="gitee" v-model="form.about.gitee"></a-input>
              </a-form-item>
              <a-form-item :label-col-props="{span:4}" :wrapper-col-props="{span:18}" label="bilibili">
                <a-input placeholder="bilibili" v-model="form.about.bilibili"></a-input>
              </a-form-item>
              <a-form-item :label-col-props="{span:4}" :wrapper-col-props="{span:18}" label="gitHub">
                <a-input placeholder="github" v-model="form.about.gitHub"></a-input>
              </a-form-item>
            </div>
          </div>
          <div class="form login_form">
            <div class="body">
              <q_title>登录设置</q_title>
              <a-form-item :label-col-props="{span:6}" :wrapper-col-props="{span:16}" label="启用qq登录">
                <a-switch v-model="form.login.qqLogin"> </a-switch>
              </a-form-item>
              <a-form-item :label-col-props="{span:6}" :wrapper-col-props="{span:16}" label="用户名密码登录">
                <a-switch v-model="form.login.usernamePwdLogin"> </a-switch>
              </a-form-item>
              <a-form-item :label-col-props="{span:6}" :wrapper-col-props="{span:16}" label="启用邮箱注册">
                <a-switch v-model="form.login.emailLogin"> </a-switch>
              </a-form-item>
              <a-form-item :label-col-props="{span:6}" :wrapper-col-props="{span:16}" label="启用图片验证码">
                <a-switch v-model="form.login.captcha"> </a-switch>
              </a-form-item>
            </div>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="form index_right_form">
            <q_title>首页右侧组件展示</q_title>
            <q_index_right v-model="form.indexRight.List"></q_index_right>
          </div>
          <div class="form article_form">
            <q_title>文章设置</q_title>
            <div class="body">
              <a-form-item :label-col-props="{span:5}" :wrapper-col-props="{span:13}" label="文章免审核">
                <a-switch v-model="form.article.noExamine"> </a-switch>
              </a-form-item>
              <a-form-item :label-col-props="{span:5}" :wrapper-col-props="{span:13}" label="评论层数">
                <a-input-number placeholder="评论层数" v-model="form.article.commentLine"></a-input-number>
              </a-form-item>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </q_site>
</div>
</template>

<style lang="less">
.f_site{
  .form{
    margin-bottom: 20px;
  }
}
</style>