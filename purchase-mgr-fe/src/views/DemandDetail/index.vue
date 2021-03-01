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
              <div class="content">{{ publisher }}</div>
            </div>
            <div class="item-col">
              <div class="title">已完成数量</div>
              <div class="content">{{ d.finishNum }}</div>
            </div>
            <div class="item-col"></div>
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
        </div>
        <a-button class="back" @click="back">
          返回需求列表
        </a-button>
      </a-card>
    </a-spin>

    <a-spin :spinning="bottomLoading">
      <a-card class="hover-card wrapper log" title="订单列表">
        <a-table 
          rowKey="_id" 
          :columns="column" 
          :data-source="list" 
          bordered
          :pagination="false"
          :scroll="{ x: 'max-content' }"
        >
          <!-- 供应商 -->
          <template #supplier="data">
            {{ data.text.supplier.name }}
          </template>
          <!-- 操作者 -->
          <template #user="data">
            {{ data.text.user.account }}
          </template>
          <!-- 添加时间 -->
          <template #time="data">
            {{ formatTimestamp(data.text.meta.createdAt) }}
          </template>
          <!-- 操作 -->
          <template #actions="data">
            <space-between>
              <a href="javascript:;" 
                class="btn btn-info btn-sm"
                @click="goOrderDetail(data.text)"
              >
                  详情
              </a>
              <a href="javascript:;"
                  class="btn btn-danger btn-sm"
                  @click="removeOrder(data.text)"
              >
                  删除
              </a>
            </space-between>
          </template>
        </a-table>
        <!-- 分页组件 -->
        <space-between class="pagi">
          <div></div>
          <a-pagination 
            v-model:current="currentPage"
            :total="total"
            :page-size="4"
            @change="setPage"
          />
        </space-between>
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