<template>
  <div>
    <!-- modal组件 -->
    <a-modal
      title="修改需求信息"
      :visible="props.isShow"
      okText="确认修改"
      cancelText="取消"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{span: 6}">
        <a-form-item label="货物名称">
          <a-input 
            v-model:value="updateForm.name" 
            allowClear
            disabled
          />
        </a-form-item>
        <a-form-item label="需求数量">
          <a-input v-model:value="updateForm.num" allowClear/>
        </a-form-item>
        <a-form-item label="当前状态">
          <a-select
            v-model:value="updateForm.state"
            style="width: 220px;"
          >
            <a-select-option 
              :value="1"
            >
              未完成
            </a-select-option>
            <a-select-option 
              :value="2"
            >
              已完成
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="截止日期">
          <a-date-picker v-model:value="updateForm.endTime" :allowClear="false" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>
