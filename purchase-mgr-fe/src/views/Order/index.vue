<template>
  <div class="wrapper">
    <a-card 
      :title="simple ? '最近添加的订单' : ''"
    >
      <div v-if="!simple">
        <!-- 标题 -->
        <h2 class="title">订单列表</h2>
        <a-divider />
        <!-- 搜索框 -->
        <space-between>
          <div class="search-wrapper">
            <a-input-search
              class="search"
              placeholder="根据需求货物搜索"
              v-model:value="keyword"
              enter-button
              @search="search"
            />
            <a href="javascript:;"
              @click="back"
              v-if="showBack"
            >
              返回
            </a>
          </div>
          <div></div>
        </space-between>
        <a-divider />
      </div>
      <!-- 表格 -->
      <a-spin :spinning="loading">
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
          <template #actions="data" v-if="!simple">
            <space-between>
              <a href="javascript:;" 
                class="btn btn-info btn-sm"
                @click="goToDetail(data.text)"
              >
                详情
              </a>
              <a href="javascript:;" 
                class="btn btn-warning btn-sm"
                @click="updateOrder(data.text)"
                v-over-buyer
              >
                修改
              </a>
              <a href="javascript:;"
                class="btn btn-danger btn-sm"
                @click="removeOrder(data.text)"
                v-over-buyer
              >
                删除
              </a>
            </space-between>
          </template>
        </a-table>
        <!-- 分页组件 -->
        <space-between v-if="!simple" class="pagi">
          <div></div>
          <a-pagination 
            v-model:current="currentPage"
            :total="total"
            :page-size="5"
            @change="setPage"
          />
        </space-between>
      </a-spin>
    </a-card>

    <!-- 修改的modal -->
    <update 
      v-model:isShow="showUpdate" 
      :info="currentDemandInfo"
      @updateList="updateList"
      :supplier="supplierInfo"
      v-over-buyer
    />
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>