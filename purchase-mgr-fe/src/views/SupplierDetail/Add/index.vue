<template>
  <div>
    <!-- modal组件 -->
    <a-modal
      title="添加供货信息"
      :visible="props.isShow"
      okText="添加"
      cancelText="取消"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{span: 6}">
        <a-form-item label="货物名称">
          <a-input v-model:value="addForm.name" allowClear/>
        </a-form-item>
        <a-form-item label="报价">
          <a-input-number v-model:value="addForm.price"  :min="0" :max="999999" />
        </a-form-item>
        <a-form-item label="产地">
          <a-input v-model:value="addForm.place" allowClear/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>
