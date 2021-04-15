<template>
  <div>
    <!-- modal组件 -->
    <a-modal
      title="修改库存信息"
      :visible="props.isShow"
      okText="确认修改"
      cancelText="取消"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{span: 6}">
        <a-form-item label="货物名称">
          <a-input v-model:value="updateForm.name" allowClear/>
        </a-form-item>
        <a-form-item label="仓库名称">
          <a-input v-model:value="updateForm.storeName" allowClear/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>
