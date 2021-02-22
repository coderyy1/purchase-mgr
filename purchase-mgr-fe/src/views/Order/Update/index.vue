<template>
  <div>
    <!-- modal组件 -->
    <a-modal
      title="修改订单信息"
      :visible="props.isShow"
      okText="确认修改"
      cancelText="取消"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{span: 6}">
        <a-form-item label="货物名称">
          <a-input v-model:value="updateForm.name" allowClear
          disabled
           />
        </a-form-item>
        <a-form-item label="供应商">
          <a-input v-model:value="updateForm.supplier" allowClear/>
        </a-form-item>
        <a-form-item label="金额">
          <a-input-number v-model:value="updateForm.money" :min="0" :max="99999999" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>
