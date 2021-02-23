<template>
  <div>
    <!-- modal组件 -->
    <a-modal
      title="修改供应商信息"
      :visible="props.isShow"
      okText="确认修改"
      cancelText="取消"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{span: 6}">
        <a-form-item label="名称">
          <a-input 
            v-model:value="updateForm.name" 
            allowClear
          />
        </a-form-item>
        <a-form-item label="邮箱地址">
          <a-input v-model:value="updateForm.email" allowClear/>
        </a-form-item>
        <a-form-item label="联系方式">
          <a-input v-model:value="updateForm.tel" allowClear/>
        </a-form-item>
        <a-form-item label="联系人">
          <a-input v-model:value="updateForm.contacts" allowClear/>
        </a-form-item>
        <a-form-item label="地址">
          <a-input v-model:value="updateForm.address" allowClear/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>
