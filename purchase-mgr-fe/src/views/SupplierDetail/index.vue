<template>
  <div>
    <!-- 基础信息 -->
    <a-spin :spinning="topLoading">
      <a-card class="hover-card wrapper">
        <space-between>
          <h2>供应商详情</h2>
          <div class="actions">
            <a-button type="primary"
            >
              添加商品
            </a-button>
            &nbsp;
            <a-button type="primary"
            @click="showUpdate = true">
              编辑
            </a-button>
            &nbsp;
            <a-button type="danger" @click="removeSupplier">
              删除
            </a-button>
          </div>
        </space-between>
        <a-divider />
        <div class="info">
          <div class="item-row">
            <div class="item-col">
              <div class="title">名称</div>
              <div class="content">{{ s.name }}</div>
            </div>
            <div class="item-col">
              <div class="title">联系人</div>
              <div class="content">{{ s.contacts }}</div>
            </div>
            <div class="item-col">
              <div class="title">联系方式</div>
              <div class="content">{{ s.tel }}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="item-col">
              <div class="title">邮箱地址</div>
              <div class="content">{{ s.email }}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="item-col">
              <div class="title">地址</div>
              <div class="content">{{ s.address }}</div>
            </div>
          </div>
        </div>
        <a-button class="back" @click="back">
          返回列表
        </a-button>
      </a-card>
    </a-spin>

    <a-spin :spinning="bottomLoading">
      <a-card class="hover-card wrapper log">
        <a-table 
          rowKey="_id" 
          :columns="column" 
          :data-source="list" 
          bordered
          :pagination="false"
          :scroll="{ x: 'max-content' }"
        >
          <template #time="data">
            {{ formatTimestamp(data.text.meta.createdAt) }}
          </template>
          <template #actions="data">
            <a href="javascript:;" 
                class="btn btn-info btn-sm"
                @click="goOrderDetail(data.text)"
            >
                详情
            </a>
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
      :info="s" 
      @updateList="getData(id)"
    />
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>