<template>
  <div class="layout-basic">
    <div class="header">
      <div class="h-left">
        <img src="@/assets/img/logo.png" alt="">
        <div class="l-info">采购管理系统</div>
      </div>
      <div class="h-right">
        <div class="hello-msg">
          {{ `xxx,欢迎！` }}
        </div>
        <div class="logout" @click="logout">退出</div>
      </div>
    </div>
    <div class="header-placeholder"></div>

    <div class="content">
      <div class="left">
        <!-- <app-nav/> -->
      </div>
      <div class="right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>