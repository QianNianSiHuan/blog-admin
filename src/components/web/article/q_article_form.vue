<script lang="ts" setup>
import {type articleAddType, articleDetailApi, articleTagOptionsApi} from "@/api/article_api";
import {Message} from "@arco-design/web-vue";
import {reactive, ref} from "vue";
import {MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {getOptions, type optionsType} from "@/api";
import {articleCategoryOptionsApi} from "@/api/article_api.ts";
import {userStores} from "@/stores/user_store.ts";
import {aiAnalysisApi, type aiType} from "@/api/ai_api.ts";
import {onUploadImg} from "@/api/image_api.ts";
import Q_cover_upload from "@/components/common/q_cover_upload.vue";

const form = reactive<articleAddType>({
  title: "",
  status: 1,//1.草稿 2.发布
  content: "",
  abstract: "",
  //categoryID?:null,
  cover: "",
  tagList: [],
  openComment: false
})

const aiData = reactive<aiType>({
  title: "",
  abstract: "",
  category: "",
  tag: [],
})

interface Props {
  articleID?: number
}

const props = defineProps<Props>()

async function getData() {
  const res = await articleDetailApi(props.articleID as number);
  if (res.code) {
    Message.error(res.msg)
    return
  }
  form.title = res.data.title
  form.abstract = res.data.abstract
  form.content = res.data.content
  form.categoryID = res.data.categoryID
  form.cover = res.data.cover
  form.tagList = res.data.tagList
  form.openComment = res.data.openComment
  Message.success(res.msg)
}

if (props.articleID) {
  getData()
}

const siteStore = userStores()
const formRef = ref()
const categoryOptions = ref<optionsType[]>([])
const tagOptions = ref<optionsType[]>([])
const emits = defineEmits(["ok"])


getOptions(categoryOptions, articleCategoryOptionsApi)
getOptions(tagOptions, articleTagOptionsApi)


async function create(status: 1 | 2) {
  form.status = status
  const val = await formRef.value.validate()
  if (val) return
  emits("ok", form)
}


function coverBack(data: string) {
  form.cover = data
}


async function paste(e: ClipboardEvent) {
  if (!siteStore.siteInfo.ai.enable) {
    return
  }
  let file = e.clipboardData?.files[0];
  if (file) {
    //粘贴的是图片
    return
  }
  await aiAnalysis()
}

async function aiAnalysis() {
  if (!form.content.trim()) {
    Message.warning("请输入正文")
    return
  }
  const res = await aiAnalysisApi(form.content)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  Object.assign(aiData, res.data)
  if (form.title == "") {
    form.title = aiData.title
  }
  if (form.abstract == "") {
    form.abstract = aiData.abstract
  }
  if (form.tagList.length === 0) {
    form.tagList = aiData.tag
  }
}

function removeCover() {
  form.cover = ""
}

defineExpose({
      aiAnalysis
    }
)
</script>

<template>
  <a-form ref="formRef" :label-col-props="{ span: 0}" :model="form" :wrapper-col-props="{ span: 24 }"
          class="q_article_form_com">
    <a-form-item :rules="[{required:true,message:'请输入文章标题'}]" field="title" validate-trigger="blur">
      <a-input v-model="form.title" placeholder="请输入标题"></a-input>
    </a-form-item>
    <a-form-item>
      <a-textarea v-model="form.abstract" :auto-size="{minRows:3,maxRows:4}" placeholder="请输入简介"></a-textarea>
    </a-form-item>
    <a-form-item :rules="[{required:true,message:'请输入文章内容'}]" field="content" validate-trigger="blur">
      <MdEditor v-model="form.content" placeholder="请输入文章内容" @onUploadImg="onUploadImg"
      ></MdEditor>
    </a-form-item>
    <a-collapse :bordered="false" :default-active-key="[1]">
      <a-collapse-item :key="1" header="更多设置">
        <a-form :label-col-props="{span:4}" :model="form" :wrapper-col-props="{span:8}" class="form2"
                label-align="left">
          <a-form-item label="请选择文章分类">
            <a-select v-model="form.categoryID" :options="categoryOptions" placeholder="文章分类"></a-select>
            <template v-if="aiData.category" #help>
              <span>基于ai推荐分类:{{ aiData.category }}</span>
            </template>
          </a-form-item>
          <a-form-item content-class="article_cover_col" label="文章封面">
            <div v-if="!form.cover" class="up">
              <q_cover_upload placeholder="上传文章封面" @ok="coverBack"></q_cover_upload>
            </div>
            <div v-if="form.cover" class="show">
              <a-image :height="108" :src="form.cover">
                <template #extra>
                  <IconDelete @click="removeCover"></IconDelete>
                </template>
              </a-image>
            </div>
            <template #help>
              <div v-if="siteStore.siteInfo.qiNiu.enable">
                将上传图片到七牛云上
              </div>
            </template>
          </a-form-item>
          <a-form-item label="文章标签">
            <a-select v-model="form.tagList" :options="tagOptions" allow-clear allow-create multiple
                      placeholder="输入标签"></a-select>
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
      <a-button type="primary" @click="create(2)">{{ props.articleID ? '更新' : '发布' }}</a-button>
      <a-button @click="create(1)">存为草稿</a-button>
    </div>
  </a-form>
</template>

<style lang="less">
.q_article_form_com {

  .arco-collapse {
    margin-bottom: 10px;
  }

  .arco-collapse-item {
    .arco-collapse-item-header {
      padding: 0;
      border: none;

      .arco-collapse-item-icon-hover {
        left: 62px;
      }
    }

    .arco-collapse-item-content {
      padding-right: 0;
      background: transparent;
      padding-left: 0;
    }
  }

  .form2 {
    .arco-row {
      display: flex;
      flex-direction: column;
    }

    > div {
      margin-bottom: 0;
    }


    .article_cover_col {
      flex-direction: column;

      > div {
        width: 100%;
      }

      .show {
        margin-top: 10px;

        .arco-image-footer {
          display: flex;
          justify-content: center;

          .arco-image-footer-extra {
            padding-left: 0;

            svg {
              cursor: pointer;
              font-size: 20px;
            }
          }
        }
      }
    }
  }

  .actions {
    .arco-btn {
      margin-right: 10px;
    }
  }
}
</style>