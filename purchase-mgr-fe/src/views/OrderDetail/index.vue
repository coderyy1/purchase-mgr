<template>
  <div>
    <!-- 基础信息 -->
    <a-spin :spinning="topLoading">
      <a-card class="hover-card wrapper">
        <space-between>
          <h2>订单详情</h2>
          <div class="actions">
            <a-button type="primary"
            @click="showUpdate = true">
              编辑
            </a-button>
            &nbsp;
            <a-button type="danger" @click="removeOrder">
              删除
            </a-button>
          </div>
        </space-between>
        <a-divider />
        <div class="info">
          <div class="item-row">
            <div class="item-col">
              <div class="title">货物名称</div>
              <div class="content">{{ o.name }}</div>
            </div>
            <div class="item-col">
              <div class="title">数量</div>
              <div class="content">{{ o.num }}</div>
            </div>
            <div class="item-col">
              <div class="title">供应商</div>
              <div class="content">{{ o.supplier }}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="item-col">
              <div class="title">操作者</div>
              <div class="content">{{ o.user }}</div>
            </div>
            <div class="item-col">
              <div class="title">总金额</div>
              <div class="content">{{ o.money }}</div>
            </div>
            <div class="item-col"></div>
          </div>
          <div class="item-row">
            <div class="item-col">
              <div class="title">提交日期</div>
              <div class="content">{{ formatTimestamp(createdAt) }}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="item-col">
              <div class="title">需求详情</div>
              <div class="content">
                <a href="javascript:;" @click="goDemandDetail">
                  查看需求信息
                </a>
              </div>
            </div>
          </div>
        </div>
        <a-button class="back" @click="back">
          返回
        </a-button>
      </a-card>
    </a-spin>
    <!-- 修改的modal -->
    <update 
      v-model:isShow="showUpdate" 
      :info="o" 
      @updateList="getData(id)"
    />
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>