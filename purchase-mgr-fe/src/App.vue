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
      zhCN,
    }
  }
}
</script>

<style lang="scss">
  body {
    background-color: #fafafa !important;
    min-width: 1200px;
  }



    


</style>