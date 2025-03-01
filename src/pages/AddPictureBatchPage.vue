<template>
  <div id="addPictureBatchPage">
    <h2 style="margin-bottom: 16px">
      批量创建图片
    </h2>
    <!--    输入框-->
    <a-form
      :model="formData"
      layout="vertical"
      @finish="handleSubmit"
    >
      <a-form-item label="关键词" name="searchText">
        <a-input
          v-model:value="formData.searchText"
          allow-clear
          placeholder="请输入关键词"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="抓取数量" name="count">
        <a-input-number
          v-model:value="formData.count"
          :auto-size="{ minRows: 2, maxRows: 5 }"
          :max="30"
          :min="1"
          allow-clear
          placeholder="请输入数量"
          style="min-width: 180px"
        >
        </a-input-number>
      </a-form-item>
      <a-form-item label="名称前缀" name="namePrefix">
        <a-input
          v-model:value="formData.namePrefix"
          allow-clear
          placeholder="请输入名称前缀，会自动补充序号"
        >
        </a-input>
      </a-form-item>
      <a-form-item>
        <!--由于批量抓取任务是同步的，可能比较慢，所以需要添加 loading 效果，防止点击过快重复执行-->
        <a-button :loading="loading" html-type="submit" style="width: 100%" type="primary">
          执行任务
        </a-button>
      </a-form-item>
    </a-form>
  </div>

</template>
<script lang="ts" setup>


import { reactive, ref } from 'vue'
import { uploadPictureByBatchUsingPost } from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'
import router from '@/router'
// 定义表单项结构和 loading 变量
const formData = reactive<API.PictureUploadRequest>({
  count: 10
})
const loading = ref<boolean>(false)

const handleSubmit = async () => {
  loading.value = true
  const res = await uploadPictureByBatchUsingPost({
    ...formData
  })
  if (res.data.code === 0 && res.data.data) {
    message.success(`批量创建成功,共${res.data.data}条`)
    router.push({
      path: '/'
    })
  } else {
    message.error('批量创建失败'+res.data.message)
  }
  loading.value = false
}
</script>
<style>
#addPictureBatchPage {
  max-width: 720px;
  margin: 0 auto 64px;
}
</style>
