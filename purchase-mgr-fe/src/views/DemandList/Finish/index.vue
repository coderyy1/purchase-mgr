<template>
  <div>
    <!-- modal组件 -->
    <a-modal
      title="添加订单"
      :visible="props.isShow"
      okText="完成"
      cancelText="取消"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{span: 6}">
        <a-form-item label="货物名称">
          <a-input 
            v-model:value="addForm.name" 
            allowClear
            disabled
          />
        </a-form-item>
        <a-form-item label="数量">
          <a-input-number v-model:value="addForm.num" id="inputNumber1" :min="0" :max="maxCount" />
        </a-form-item>
        <a-form-item label="供应商">
          <a-select
          v-model:value="addForm.supplier"
            style="width: 220px;"
          >
            <a-select-option 
              v-for="(item, index) of props.supplier"
              :key="index"
              :value="item._id"
            >
              {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="订单金额">
          <a-input-number v-model:value="addForm.money" :min="0" :max="9999999999" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>
