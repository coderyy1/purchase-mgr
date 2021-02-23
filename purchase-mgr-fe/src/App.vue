<template>
  <a-config-provider :locale="zhCN">
    <router-view/>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
export default {
  setup() {
    return {
      zhCN
    }
  }
}
</script>

<style lang="scss">
  body {
    background-color: #fafafa !important;
    min-width: 1200px;
  }

  .hover-card {
    &:hover {
      box-shadow: 0 0 7px 0 rgba(100, 100, 100, .3);
    }
  }
</style>