<template>
  <div class="layout-basic">
    <div class="header">
      <a href="javascript:;" class="h-left" title="返回首页" @click="goHome">
        <img src="@/assets/img/logo.png" alt="">
        <div class="l-info">采购管理系统</div>
      </a>
      <div class="h-right">
        <div class="hello-msg" title="我的" @click="goProfile">
          {{ `${store.state.userInfo.account},欢迎！` }}
        </div>
        <div class="logout" @click="logout" title="登出">退出</div>
      </div>
    </div>
    <div class="header-placeholder"></div>

    <div class="content">
      <div class="left">
        <app-nav/>
      </div>
      <div class="right">
        <!-- <router-view /> -->
        <router-view v-slot="{ Component }">
          <!-- 缓存页面 -->
          <keep-alive :include="store.state.keepComps">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>