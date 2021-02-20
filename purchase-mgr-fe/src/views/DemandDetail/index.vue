<template>
  <div>
    <!-- 基础信息 -->
    <a-spin :spinning="topLoading">
      <a-card class="hover-card wrapper">
        <space-between>
          <h2>需求详情</h2>
          <div class="actions">
            <a-button type="primary"
            @click="showUpdate = true">
              编辑
            </a-button>
            &nbsp;
            <a-button type="danger" @click="removeDemand">
              删除
            </a-button>
          </div>
        </space-between>
        <a-divider />
        <div class="info">
          <div class="item-row">
            <div class="item-col">
              <div class="title">货物名称</div>
              <div class="content">{{ d.name }}</div>
            </div>
            <div class="item-col">
              <div class="title">需求数量</div>
              <div class="content">{{ d.num }}</div>
            </div>
            <div class="item-col">
              <div class="title">状态</div>
              <div class="content">{{ d.state === 1 ? '未完成' : '已完成' }}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="item-col">
              <div class="title">发布者</div>
              <div class="content">{{ d.publisher }}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="item-col">
              <div class="title">发布日期</div>
              <div class="content">{{ formatTimestamp(createdAt) }}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="item-col">
              <div class="title">截止日期</div>
              <div class="content">{{ formatTimestamp2(d.endTime) }}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="item-col">
              <div class="title">对应订单信息</div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div class="content">asdadadad</div>
            </div>
          </div>
        </div>
        <a-button class="back" @click="back">
          返回需求列表
        </a-button>
      </a-card>
    </a-spin>
    <!-- 修改的modal -->
    <update 
      v-model:isShow="showUpdate" 
      :info="d" 
      @updateList="getData(id)"
    />
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>