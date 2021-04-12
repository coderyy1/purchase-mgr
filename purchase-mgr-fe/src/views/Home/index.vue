<template>
  <div>
    <!-- 总数据 -->
    <div class="total-info">
      <a-card
      >
        <div class="total-list">
          <div class="total-item">
            <div class="num">{{ `共${totalDemand}条` }}</div>
            <div class="des">需求</div>
          </div>
          <div class="total-item">
            <div class="num">{{ `共${totalGoods}个` }}</div>
            <div class="des">商品</div>
          </div>
          <div class="total-item">
            <div class="num">{{ `共${totalSupplier}个` }}</div>
            <div class="des">供应商</div>
          </div>
        </div>
      </a-card>
    </div>
    <!-- 图表开始 -->
    <div class="table-car">
      <a-card>
        <div class="t-wrapper">
          <div id="demand-finish" class="t-left"></div>
          <div id="user-character" class="t-right"></div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>