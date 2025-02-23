<template>
  <div id="addPicture">
    <h2 style="margin-bottom: 16px">创建图片</h2>
    <PictureUpload :picture="picture" :onSuccess="onSuccess" />
<!--    可以再做一些优化，比如像某视频网站投稿一样，上传图片后才展示更多表单项。-->
<!--    直接用 v-if 判断即可，picture 为空则表示图片未上传-->
    <a-form v-if="picture" layout="vertical" :model="pictureForm" @finish="handleSubmit" class="search">
      <a-form-item label="名称" name="name">
        <a-input v-model:value="pictureForm.name" placeholder="请输入名称" allow-clear />
      </a-form-item>
      <a-form-item label="简介" name="introduction">
        <a-textarea
          v-model:value="pictureForm.introduction"
          placeholder="请输入简介"
          :auto-size="{minRows:2,maxRows:5}"
          allowClear
        />
      </a-form-item>
      <a-form-item label="分类" name="category">
        <a-auto-complete v-model:value="pictureForm.category" :options="categoryOptions" placeholder="请输入分类"
                         allowClear />
      </a-form-item>
      <a-form-item label="标签" name="tags">
        <a-select v-model:value="pictureForm.tags" :options="tagOptions" mode="tags" placeholder="请输入标签"
                  allowClear />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">
          创建
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { editPictureUsingPost, listPictureTagCategoryUsingGet } from '@/api/pictureController.ts'
import PictureUpload from '@/components/PictureUpload.vue'


const picture = ref<API.PictureVO>()

/**
 * 上传图片后，可以将得到的图片信息（比如名称）填充到表单，直接赋值即可
 * @param newPicture
 */
const onSuccess = (newPicture: API.PictureVO) => {
  picture.value = newPicture
  pictureForm.name = newPicture.name
}

const pictureForm = ref<API.PictureEditRequest>({})

const router = useRouter()

/**
 * 提交表单
 * @param values
 */
const handleSubmit = async (values: any) => {
  const pictureId = picture.value.id
  if (!pictureId) {
    return
  }
  const res = await editPictureUsingPost({
    id: pictureId,
    ...values,
  })
  if (res.data.code === 0 && res.data.data) {
    message.success('创建成功')
    // 跳转到图片详情页
    router.push({
      path: `/picture/${pictureId}`,
    })
  } else {
    message.error('创建失败，' + res.data.message)
  }
}


const categoryOptions = ref<string[]>([])

const tagOptions = ref<String[]>([])

//获取标签和分类选项
const getTagCategoryOptions = async () => {
  const res = await listPictureTagCategoryUsingGet()
  if (res.data.code === 0 && res.data.data) {
    //转换成下拉选项组件接受的格式
    tagOptions.value = (res.data.data.tagList ?? []).map((data: string) => {
      return {
        value: data,
        label: data
      }
    })
    categoryOptions.value = (res.data.data.categoryList ?? []).map((data: string) => {
      return {
        value: data,
        label: data
      }
    })
  } else {
    message.error('加载选项失败' + res.data.message)
  }
}

onMounted(() => {
  getTagCategoryOptions()
})


</script>

<style>
#addPicture {
  max-width: 720px;
  margin: 0 auto;
}
</style>
