<template>
  <div class="wrapper">
    <a-spin :spinning="false">
      <a-card 
        :title="simple ? '最近添加的采购需求' : ''"
      >
        <div v-if="!simple">
          <!-- 标题 -->
          <h2 class="title">采购需求列表</h2>
          <a-divider />
          <!-- 搜索框 -->
          <space-between>
            <!-- 下拉选择 -->
            <!-- <a-select
              v-model:value="value1"
              style="width: 60px"
              ref="select"
            >
              <a-select-option value="jack">
                Jack
              </a-select-option>
              <a-select-option value="111">
                111
              </a-select-option>
            </a-select>
            {{value1}} -->
            <div class="search-wrapper">
              <a-input-search
                class="search"
                placeholder="根据需求货物搜索"
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
            <!-- 添加需求按钮  -->
            <div>
              <a-button @click="showAdd = true" >
                添加采购需求
              </a-button>
            </div>
          </space-between>
          <a-divider />
        </div>
        <!-- 表格 -->
        <a-table 
          rowKey="_id" 
          :columns="column" 
          :data-source="list" 
          bordered
          :pagination="false"
          :scroll="{ x: 'max-content' }"
        >
          <!-- 状态 -->
          <template #state="data">
            {{ data.text.state === 1 ? '未完成' : '已完成' }}
          </template>
          <!-- 发布日期 -->
          <template #startTime="data">
            {{ formatTimestamp(data.text.meta.createdAt) }}
          </template>
          <!-- 截止日期 -->
          <template #endTime="data">
            {{ formatTimestamp(data.text.endTime) }}
          </template>
          <!-- 操作 -->
          <template #actions="data" v-if="!simple">
            <space-between>
              <a href="javascript:;" 
                class="btn btn-info btn-sm">
                详情
              </a>
              <a href="javascript:;" 
                class="btn btn-success btn-sm">
                完成订单
              </a>
              <a href="javascript:;" 
                class="btn btn-warning btn-sm">
                修改
              </a>
              <a href="javascript:;"
                class="btn btn-danger btn-sm">
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
      </a-card>
    </a-spin>

    <!-- 添加的modal -->
    <add 
      v-model:isShow="showAdd"
      @updateList="updateList"
    />

    <!-- 修改的modal -->
    <!-- <update 
      v-model:isShow="showUpdate" 
      :info="currentBookInof"
      @updateList="updateList"
      :classify="classifyList"
    /> -->
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>