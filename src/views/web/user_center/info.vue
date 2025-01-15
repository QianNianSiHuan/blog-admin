<script setup lang="ts">
import {userCenterStores} from "@/stores/user_center_store.ts";
import {registerSourceOptions} from "@/options/options.ts";
import Q_label from "@/components/admin/q_label.vue";
import Q_edit_input from "@/components/common/input/q_edit_input.vue";
import { userDetailUpdateApi, type userDetailUpdateRequest} from "@/api/user_api.ts";
import {Message} from "@arco-design/web-vue";
import Q_avatar_cutter from "@/components/web/q_avatar_cutter.vue";
import Q_tags_input from "@/components/common/input/q_tags_input.vue";
import {ref} from "vue";
const userCenterStore = userCenterStores()
const tags =ref<string[]>([])


async function userUpdateColumn(column:"username"|"nickname"|"avatar"|"abstract"|"likeTags",value:string|string[]){
  const data:userDetailUpdateRequest = {}
  if (column==="likeTags"){
    value = value as string[]
    data[column]=value
  }else{
    value = value as string
    data[column]=value
  }
  const res =await userDetailUpdateApi(data)
  if(res.code){
    Message.error(res.msg)
  }
  Message.success(res.msg)
  userCenterStore.getUserDetail()
}

function isUpdateUsername(updateTime?:string):boolean {
  if(!updateTime){
    return true
  }
  const  t1 =new Date(updateTime)
  const  t2 =new Date()
  const subDay =(t2-t1)/1000/60/60/24
  return subDay > 30;
}


function editTags(val:string[]) {
  tags.value=val
}

function updateTags(oldTags?:string[]) {
  if(JSON.stringify(JSON.stringify(oldTags))===JSON.stringify(tags.value)){
    return
  }
  userUpdateColumn("likeTags",tags.value)
}

</script>

<template>
  <div class="user_center_info_view">
    <div class="top">
      <div class="avatar">
        <div class="avatar_inner">
          <q_avatar_cutter v-if="userCenterStore.userDetail.registerSource !== 2"
                           @ok="userUpdateColumn('avatar', $event)">
            <div class="camera_bg" title="头像上传">
              <IconCamera></IconCamera>
            </div>
          </q_avatar_cutter>
          <a-avatar :image-url="userCenterStore.userDetail.avatar" :size="60"></a-avatar>
        </div>
      </div>
      <div class="info">
        <div class="title">{{userCenterStore.userDetail.nickname}}</div>
        <div class="code_age">
          <a-tag>注册{{userCenterStore.userDetail.codeAge}}年</a-tag>
        </div>
      </div>
    </div>
    <div class="base_info">
      <div class="head">基本信息</div>
      <div class="body">
        <a-form :model="userCenterStore.userDetail" :label-col-props="{span:2}" label-align="left" :wrapper-col-props="{span:22}" >
          <a-form-item label="用户昵称">
            <q_edit_input placeholder="用户昵称" @ok="userUpdateColumn('nickname',$event)" :value="userCenterStore.userDetail.nickname"></q_edit_input>
          </a-form-item>
          <a-form-item label="用户名">
            {{userCenterStore.userDetail.username}}
            <template #help>登录唯一标识,30天可修改</template>
          </a-form-item>
          <a-form-item label="用户简介">
            <q_edit_input placeholder="用户简介" @ok="userUpdateColumn('abstract',$event)" type="textarea" :value="userCenterStore.userDetail.abstract"></q_edit_input>
          </a-form-item>
          <a-form-item label="注册时间">{{userCenterStore.userDetail.createdAt}}</a-form-item>
          <a-form-item label="注册来源">
            <q_label :options="registerSourceOptions" :value="userCenterStore.userDetail.registerSource"></q_label>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="tags">
      <div class="head">
       <div class="title">兴趣标签</div>
        <div class="abs">请选择兴趣标签</div>
      </div>
      <div class="body">
        <div>
          <q_tags_input
              :value="userCenterStore.userDetail.likeTags" @ok="editTags"></q_tags_input>
        </div>
        <div>
          <a-button type="primary" @click="updateTags(userCenterStore.userDetail.likeTags)" size="mini">更新</a-button>
        </div>
      </div>
    </div>


  </div>
</template>

<style lang="less">
.user_center_info_view{
  >div{
    background: var(--color-bg-1);
    border-radius: 5px;
  }

  .top{
    margin-bottom: 20px;
    display: flex;
    padding: 20px;
    align-items: center;

    .avatar{
      width: 80px;

      .avatar_inner{
        position: relative;
        width: 60px;

        .camera_bg{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          z-index: 2;
          background: rgba(0,0,0,0.4);
          opacity: 0;
          transition: all .3s;
          cursor: pointer;

          svg{
            color: white;
            font-size: 20px;
          }
        }

        &:hover{
          .camera_bg{
            opacity: 1;
          }
        }
      }
    }
    .info{
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title{
        font-size: 18px;
        color: var(--color-text-1);
        margin-bottom: 10px;
      }
    }
  }

  .base_info{
    margin-top: 20px;
    .head{
      font-size: 16px;
      padding: 20px 20px 10px 20px;
      border-bottom: @q_border;
      font-weight: 600;
      color: var(--color-text-1);
    }
    .body{
      padding: 10px 20px 20px  20px;
      color:var(--color-text-2);

    }
  }
  .tags{
    .head{
      padding: 20px 20px 10px 20px;
      border-bottom: @q_border;
      display: flex;
      align-items: center;
      .title{
        font-weight: 600;
        color: var(--color-text-1);
        font-size: 16px;
      }
      .abs{
        margin-left: 10px;
        color: var(--color-text-2);
      }
    }
    .body{
      padding: 10px 20px 20px  20px;
      span{
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>