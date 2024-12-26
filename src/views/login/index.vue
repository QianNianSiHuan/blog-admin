<script setup lang="ts">

</script>

<template>
  <div class="login_view">
    <div class="login_mask">
      <a-form :label-col-props="{span:0}" :wrapper-col-props="{span:24}">
        <div class="title">用户登录</div>
        <a-form-item label="用户名">
          <a-input placeholder="用户名" >
            <template #prefix>
              <icon-user/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="密码">
          <a-input placeholder="密码">
            <template #prefix>
            <icon-lock/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" long>登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="less">
.login_view{
  background: url(http://qiniuyun.starletter.cn/picture/202411251703921.jpg) 50% / cover no-repeat;
  position: relative;
  height: 100vh;
  .login_mask{
    width: 400px;
    height: 100vh;
    background-color: rgba(white,0.8);
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .arco-form{
      padding: 40px;
    }
    .title{
      font-size: 26px;
      font-weight: 600;
      text-align: center;
      color: @primary-6;
      margin-bottom: 20px;
    }
  }
}
</style>