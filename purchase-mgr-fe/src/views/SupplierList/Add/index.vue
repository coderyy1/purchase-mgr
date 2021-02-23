<template>
  <div>
    <!-- modal组件 -->
    <a-modal
      title="添加供应商"
      :visible="props.isShow"
      okText="添加"
      cancelText="取消"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{span: 6}">
        <a-form-item label="供应商名称">
          <a-input v-model:value="addForm.name" allowClear/>
        </a-form-item>
        <a-form-item label="邮箱地址">
          <a-input v-model:value="addForm.email" allowClear/>
        </a-form-item>
        <a-form-item label="联系方式">
          <a-input v-model:value="addForm.tel" allowClear/>
        </a-form-item>
        <a-form-item label="联系人">
          <a-input v-model:value="addForm.contacts" allowClear/>
        </a-form-item>
        <a-form-item label="地址">
          <a-input v-model:value="addForm.address" allowClear/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>
