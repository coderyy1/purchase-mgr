<template>
  <div class="wrapper">
    <a-card 
      :title="simple ? '最近添加的供货信息' : ''"
    >
      <div v-if="!simple">
        <!-- 标题 -->
        <h2 class="title">供货信息</h2>
        <a-divider />
        <!-- 搜索框 -->
        <space-between>
          <div class="search-wrapper">
            <a-input-search
              class="search"
              placeholder="根据货物名称搜索"
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
          @change="toggleSort"
        >
        <!-- 报价 -->
          <template #price="data">
            {{ `${data.text.price}  ￥/` + (data.text.unit || '个') }}
          </template>
          <!-- 供应商 -->
          <template #supplier="data">
            {{ data.text.supplier.name }}
          </template>
          <!-- 供应商联系人 -->
          <template #contacts="data">
            {{ data.text.supplier.contacts }}
          </template>
          <!-- 供应商联系方式 -->
          <template #tel="data">
            {{ data.text.supplier.tel }}
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
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>