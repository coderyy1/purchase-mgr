<template>
  <div class="auth">
    <!-- 背景图 -->
    <div class="bg"></div>
    <!-- 标题 -->
    <div class="title-info">
      <img src="@/assets/img/logo.png" alt="">
      <div class="title">采购管理系统</div>
    </div>

    <!-- 表单 -->
    <div class="form">
      <a-tabs v-model:activeKey="currentTab">
        <!-- 登陆部分 -->
        <a-tab-pane key="1" tab="登陆">
          <div class="item">
            <a-input placeholder="用户名" size="large" v-model:value="logForm.account" allow-clear>
              <template v-slot:prefix>
                <UserOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a-input-password size="large"  placeholder="密码" v-model:value="logForm.password" @keyup.enter.native="login" />
          </div>
          <div class="item">
            <Slider :successFun="sliderSucc"/>
          </div>

          <div class="item">
            <a href="javascript:;" 
              @click="resetPwd"
            >忘记密码</a>
          </div>
          <div class="item">
            <a-spin :spinning="logLoading">
              <a-button :disabled="logBtnIsOk" type="primary" @click="login">{{logBtnIsOk ? '请完成验证' : '登陆'}}</a-button>
            </a-spin>
          </div>
        </a-tab-pane>

        <!-- 注册部分 -->
        <a-tab-pane key="2" tab="注册">
          <div class="item">
            <a-input placeholder="用户名" size="large" allow-clear v-model:value="regForm.account">
              <template v-slot:prefix>
                <UserOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a-input-password size="large"  placeholder="密码" v-model:value="regForm.password"/>
          </div>

          <div class="item">
            <a-input-password size="large"  placeholder="确认密码" v-model:value="regForm.subPwd" />
          </div>

          <div class="item">
            <a-input-password size="large"  placeholder="密钥" v-model:value="regForm.key" />
          </div>

          <div class="item">
            <a-input placeholder="注册码" size="large" allow-clear v-model:value="regForm.inviteCode">
              <template v-slot:prefix>
                <DisconnectOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a-spin :spinning="regLoading">
              <a-button type="primary" @click="register">注册</a-button>
            </a-spin>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script src="./index.jsx"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>