<template>
  <div class="wrapper">
    <a-card 
      :title="simple ? '最近添加的供应商' : ''"
    >
      <div v-if="!simple">
        <!-- 标题 -->
        <h2 class="title">供应商列表</h2>
        <a-divider />
        <!-- 搜索框 -->
        <space-between>
          <div class="search-wrapper">
            <a-input-search
              class="search"
              placeholder="根据名称搜索"
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
          <!-- 添加需求按钮  -->
          <div>
            <a-button @click="showAdd = true" 
            v-only-admin>
              添加供应商
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
                @click="updateSupplier(data.text)"
                v-only-admin
              >
                修改
              </a>
              <a href="javascript:;"
                class="btn btn-danger btn-sm"
                @click="removeSupplier(data.text)"
                v-only-admin
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

    <!-- 添加的modal -->
    <add 
      v-model:isShow="showAdd"
      @updateList="updateList"
      v-only-admin
    />

    <!-- 修改的modal -->
    <update 
      v-model:isShow="showUpdate" 
      :info="currentInfo"
      @updateList="updateList"
      v-only-admin
    />
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>