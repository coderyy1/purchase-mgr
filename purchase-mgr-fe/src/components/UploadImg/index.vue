<template>
  <div class="upload-wrapper">
    <input 
      ref="inputEl" 
      class="input-el"
      accept="image/*" 
      type="file"
      @change="previewImg"
    >
    <div class="priview" @click="handleClick">
      <img :src="imgSrc" alt="">
    </div>
    <a-button 
      size="large" 
      type="primary"
      @click="uploadClick"
    >
      上传
    </a-button>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import './index.scss'
</style>