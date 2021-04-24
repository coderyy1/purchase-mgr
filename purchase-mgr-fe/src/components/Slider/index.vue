<template>
  <div class="jc-component__range">
    <div class="jc-range" :class="rangeStatus?'success':''" >
        <div ref="lbg" class="backbg"></div>
        <i class="slideri" @mousedown="rangeMove">{{rangeStatus?successIcon:startIcon}}</i>
        <div class="info">{{rangeStatus?successText:startText}}</div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>