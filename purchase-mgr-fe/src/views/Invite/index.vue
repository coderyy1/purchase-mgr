<template>
  <div>
    <a-card class="invite-card">
      <space-between >
        <h2>注册码列表</h2>
        <div class="add">
          <a-select
            v-model:value="currentCharacter"
            style="width: 120px;"
          >
            <a-select-option 
              v-for="item of characterInfo"
              :key="item._id"
              :value="item._id"
            >
              {{item.title}}
            </a-select-option>
          </a-select>
          &nbsp;&nbsp;&nbsp;
          <a-input v-model:value="count" class="ip"></a-input>
          <a-button type="primary" @click="addCode">添加</a-button>
        </div>
      </space-between>
      <a-divider />
      <a-spin :spinning="loading" >
        <a-table
          rowKey="_id" 
          :columns="column" 
          :data-source="list" 
          bordered
          :pagination="false"
        >
          <!-- 操作 -->
          <template #actions="data" >
            <div class="actions-btn">
              <a 
                href="javascript:;" 
                class="btn btn-danger btn-sm"
                @click="removeCode(data.text._id)"
              >
                删除
              </a>
            </div>
          </template>
          <!-- 使用状态 -->
          <template #status="data" >
            {{ data.text.user ? '已使用' : '未使用' }}
          </template>
          <!-- 权限 -->
          <template #chara="data" >
            {{ getCharacterInfoById(data.text.character).title }}
          </template>
        </a-table>
        <div class="pagi">
          <a-pagination 
            v-model:current="currentPage"
            :total="total"
            :page-size="5"
            @change="setPage"
          />
        </div>
      </a-spin>
    </a-card>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>