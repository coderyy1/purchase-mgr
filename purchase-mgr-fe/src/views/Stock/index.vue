<template>
  <div class="wrapper">
    <a-card 
      :title="simple ? '仓库最近添加的货物' : ''"
    >
      <div v-if="!simple">
        <!-- 标题 -->
        <h2 class="title">仓库库存</h2>
        <a-divider />
        <!-- 搜索框 -->
        <space-between>
          <div class="search-wrapper">
            <a-input-search
              class="search"
              placeholder="根据货物名称搜索"
              v-model:value="keyword"
              enter-button
              allowClear
              @search="search"
            />
            <a href="javascript:;"
              @click="back"
              v-if="showBack"
            >
              返回
            </a>
          </div>
          <!-- 添加按钮  -->
          <div>
            <a-button @click="showAdd = true" v-over-storeman>
              添加库存货物
            </a-button>
          </div>
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
          <!-- 仓库信息 -->
          <template #storeName="data">
            {{ data.text.storeName || '无仓库信息' }}
          </template>
          <!-- 创建日期 -->
          <template #addDate="data">
            {{ formatTimestamp(data.text.meta.createdAt) }}
          </template>
          <!-- 最后修改日期 -->
          <template #updateDate="data">
            {{ formatTimestamp(data.text.meta.updatedAt) }}
          </template>
          <!-- 操作 -->
          <template #actions="data" v-if="!simple">
            <space-between>
              <a href="javascript:;" 
                class="btn btn-success btn-sm"
                @click="gotoDetail(data.text)">
                详情
              </a>
              <a href="javascript:;" 
                class="btn btn-warning btn-sm"
                @click="updateStock(data.text)"
                v-over-storeman
              >
                修改
              </a>
              <a href="javascript:;"
                class="btn btn-danger btn-sm"
                @click="removeStock(data.text)"
                v-over-storeman
              >
                删除
              </a>
            </space-between>
          </template>

          <template #count="data">
            <space-between>
              <a href="javascript:;" @click="editCount('OUT_COUNT', data.text)" v-over-storeman>出库</a>
              {{ data.text.count }}
              <a href="javascript:;" @click="editCount('IN_COUNT', data.text)" v-over-storeman>入库</a>
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

    <!-- 添加的modal -->
    <add 
      v-model:isShow="showAdd"
      @updateList="getList" 
      v-over-storeman
    />

    <!-- 修改的modal -->
    <update 
      v-model:isShow="showUpdate" 
      :info="currentInof"
      @updateList="getList"
      v-over-storeman
    />
  </div>
</template>

<script src="./index.jsx"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>