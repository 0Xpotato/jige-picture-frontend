<template>
  <div id="url-picture-upload">
    <a-input-group compact style="margin-bottom: 16px">
      <a-input v-model:value="fileUrl" placeholder="请输入图片 URL" style="width: calc(100% - 120px)" />
      <a-button :loading="loading" style="width: 80px;font-size: 16px;margin-top: 2%" type="primary" @click="handleUpload">提交</a-button>
    </a-input-group>
    <div v-if="!picture?.url" class="tip">
      <a-alert message="例如：https://www.iqiyi.com/logo.png" type="info" />
      <a-alert message="温馨提示：（仅供参考，请勿对其网站造成不良影响，若造成影响后果自负）！" style="margin-top: 1%" type="warning" />
    </div>
    <div class="img-wrapper">
      <img v-if="picture?.url" :src="picture?.url" alt="avatar" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { uploadPictureByUrlUsingPost } from '@/api/pictureController.ts'


interface Props {
  picture?: API.PictureVO,
  spaceId?: number
  onSuccess?: (newPicture: API.PictureVO) => void
}

const props = defineProps<Props>()
const loading = ref<boolean>(false)
const fileUrl = ref<String>()

/**
 * 根据URL上传文件
 */
const handleUpload = async () => {
  loading.value = true
  try {
    const params: API.PictureUploadRequest = { fileUrl: fileUrl.value }
    params.spaceId = props.spaceId;
    if (props.picture) {
      params.id = props.picture.id
    }
    const res = await uploadPictureByUrlUsingPost(params)
    if (res.data.code === 0 && res.data.data) {
      message.success('图片上传成功')
      // 将上传成功的图片信息传递给父组件
      props.onSuccess?.(res.data.data)
    } else {
      message.error('图片上传失败' + res.data.message)
    }
  } catch (error) {
    console.log('图片上传失败' + error)
    message.error('图片上传失败' + error.message)
  } finally {
    loading.value = false
  }
}


</script>

<style scoped>
#url-picture-upload {
  margin-bottom: 16px;
}

#url-picture-upload img {
  max-width: 100%;
  max-height: 480px;
}

.img-wrapper {
  text-align: center;
  margin-top: 16px;
}
</style>
