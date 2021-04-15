<template>
  <div>
    <!-- 基础信息 -->
    <a-spin :spinning="topLoading">
      <a-card class="hover-card card-wrapper">
        <space-between>
          <h2>{{ s.name }}</h2>
          <div class="actions" v-over-storeman>
            <a-button type="primary"
            @click="showUpdate = true">
              编辑
            </a-button>
            &nbsp;
            <a-button type="danger" @click="removeStock">
              删除
            </a-button>
          </div>
        </space-between>
        <a-divider />
        <div class="info">
          <div class="item-row">
            <div class="item-col">
              <div class="title">名称：</div>
              <div class="content">{{ s.name }}</div>
            </div>
            <div class="item-col">
              <div class="title">库存：</div>
              <div class="content">{{ s.count }}</div>
            </div>
            <div class="item-col">
              <div class="title">仓库名称：&nbsp;&nbsp;&nbsp;</div>
              <div class="content">{{ s.storeName }}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="item-col">
              <div class="title">添加日期：&nbsp;&nbsp;&nbsp;</div>
              <div class="content">{{ formatTimestamp(createdAt) }}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="item-col">
              <div class="title">上次修改时间：&nbsp;&nbsp;&nbsp;</div>
              <div class="content">&nbsp;&nbsp;{{ formatTimestamp(updatedAt) }}</div>
            </div>
          </div>
        </div>
        <a-button class="back" @click="back">
          返回列表
        </a-button>
      </a-card>
    </a-spin>
    <!-- 出入库日志 -->
    <div class="log">
      <a-spin :spinning="bottomLoading">
        <a-card :headStyle="{fontSize: '22px', fontWeight: '500'}" title="出入库日志">
          <!-- <space-between>
            <h3>出入库日志</h3>
            <div class="actions">
              <a href="">出库日志</a>
              <a href="">入库日志</a>
            </div>
          </space-between>
          <a-divider /> -->
          <template #extra >
            <span class="logFlagTitle">
              <a href="javascript:;" 
                @click="toggleFlag('IN_COUNT')">
                <span 
                  v-if="logFlag === 'IN_COUNT'"
                >
                  >
                </span>
                入库日志
              </a>
            </span>
            <span class="logFlagTitle" style="margin-left: 12px;">
              <a href="javascript:;" 
                @click="toggleFlag('OUT_COUNT')">
                <span 
                  v-if="logFlag === 'OUT_COUNT'"
                >
                  >
                </span>
                出库日志
              </a>
            </span>
              <!-- <a-select
                v-model:value="logFlag"
                style="width: 120px"
                @change="toggleFlag"
              >
                <a-select-option value="IN_COUNT">入库日志</a-select-option>
                <a-select-option value="OUT_COUNT">出库日志</a-select-option>
              </a-select> -->
          </template>
          {{logFlag}}
          <a-table 
            rowKey="_id" 
            :columns="column" 
            :data-source="logInfo"
            bordered 
            :pagination="false"
          >
            <template #type="data">
              {{ data.text.type === 'IN_COUNT' ? '入库' : '出库' }}
            </template>
            <template #createdAt="data">
              {{ formatTimestamp(data.text.meta.createdAt) }}
            </template>
            <template #user="data">
              {{ data.text.user.account }}
            </template>
          </a-table>
          <space-between class="pagi">
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
    </div>
    <!-- 修改的modal -->
    <update 
      v-model:isShow="showUpdate" 
      :info="s" 
      @updateList="getData"
      v-over-storeman
    />
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>