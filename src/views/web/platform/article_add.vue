<script setup lang="ts">
import {articleAddApi, type articleAddType} from "@/api/article_api";
import {Message} from "@arco-design/web-vue";
import router from "@/router";
import {reactive, ref} from "vue";
import Q_card from "@/components/web/q_card.vue";
import {MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import Q_cover_cutter from "@/components/web/q_cover_cutter.vue";

const form =reactive<articleAddType>({
  title: "",
  status: 1,//1.草稿 2.发布
  content:"",
  //categoryID?:null,
  cover:"",
  tagList:[],
  openComment: false
})

const formRef =ref()
async function create(status: 1|2) {
  const val = await formRef.value.validate()
  if(val)return
  form.status = status
  const res = await articleAddApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  router.push({name: 'platformArticle'})
}


function coverBack(data:string){
  form.cover=data
}

</script>

<template>
  <div class="platform_article_add_view">
    <q_card title="发布文章">
      <a-form ref="formRef" :model="form" :label-col-props="{ span: 0}" :wrapper-col-props="{ span: 24 }">
        <a-form-item field="title" validate-trigger="blur" :rules="[{required:true,message:'请输入文章标题'}]">
          <a-input v-model="form.title" placeholder="请输入标题"></a-input>
        </a-form-item>
        <a-form-item field="content" validate-trigger="blur" :rules="[{required:true,message:'请输入文章内容'}]">
          <MdEditor v-model="form.content" placeholder="请输入文章内容"></MdEditor>
        </a-form-item>
        <a-collapse :default-active-key="[1]" :bordered="false">
          <a-collapse-item header="更多设置"  :key="1">
            <a-form  :model="form" class="form2" label-align="left" :label-col-props="{span:4}" :wrapper-col-props="{span:8}">
              <a-form-item label="请选择文章分类">
                <a-select placeholder="文章分类" v-model="form.categoryID"></a-select>
              </a-form-item>
              <a-form-item label="文章封面" content-class="article_cover_col">
                <div class="up">
                  <q_cover_cutter @ok="coverBack" style="width: 100%">
                    <div class="cover_mask">
                      <IconCamera></IconCamera>
                      <span>点击上传封面</span>
                    </div>
                  </q_cover_cutter>
                </div>
                <div class="show" v-if="form.cover">
                  <a-image :src="form.cover" :height="60"></a-image>
                </div>
              </a-form-item>
              <a-form-item label="文章标签">
                <a-input-tag v-model="form.tagList" placeholder="输入标签"></a-input-tag>
              </a-form-item>
              <a-form-item label="设置评论状态">
                <a-radio-group v-model="form.openComment">
                  <a-radio :value="true">开启</a-radio>
                  <a-radio :value="false">关闭</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-form>
          </a-collapse-item>
        </a-collapse>
        <div class="actions">
          <a-button type="primary" @click="create(2)">发布文章</a-button>
          <a-button  @click="create(1)">存为草稿</a-button>
        </div>
      </a-form>
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
  .arco-collapse{
    margin-bottom: 10px;
  }
  .arco-collapse-item {
    .arco-collapse-item-header{
      padding: 0;
      border: none;
      .arco-collapse-item-icon-hover{
        left: 62px;
      }
    }
    .arco-collapse-item-content {
      padding-right: 0;
      background: transparent;
      padding-left: 0;
    }
  }
  .form2{
    .arco-row{
      display: flex;
      flex-direction: column;
    }
    >div{
      margin-bottom: 0;
    }
    .cover_mask{
      width: 100%;
      height: 120px;
      cursor: pointer;
      border: @q_border;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--color-text-2);
      span{
        font-size: 12px;
      }
      svg{
        font-size: 30px;
      }
    }
    .article_cover_col{
      flex-direction: column;
      >div{
        width: 100%;
      }
      .show{
        margin-top: 10px;
      }
    }
  }
  .actions {
    .arco-btn{
      margin-right: 10px;
    }
  }
}
</style>