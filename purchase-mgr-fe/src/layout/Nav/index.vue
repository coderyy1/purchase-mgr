<template>
  <div>
    <a-menu
      id="dddddd"
      style="width: 100%"
      v-model:selectedKeys="keys"
      mode="inline"
      v-for="item of menu"
      :key="item.url"
    >
      <!-- 一级目录items -->
      <a-menu-item 
        @click="to(item.url)"
        :key="item.url" 
      >
        {{item.title}}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>