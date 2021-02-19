<template>
  <div>
    <!-- modal组件 -->
    <a-modal
      title="发布需求"
      :visible="props.isShow"
      okText="发布"
      cancelText="取消"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{span: 6}">
        <a-form-item label="货物名称">
          <a-input v-model:value="addForm.name" allowClear/>
        </a-form-item>
        <a-form-item label="需求数量">
          <a-input-number v-model:value="addForm.num" id="inputNumber1" :min="0" :max="999999" />
        </a-form-item>
        <a-form-item label="截止日期">
          <a-date-picker v-model:value="addForm.endTime" :allowClear="false" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>
