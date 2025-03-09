<template>
  <a-list
    :data-source="dataList"
    :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
    :loading="loading"
  >
    <template #renderItem="{ item: picture }">
      <a-list-item style="padding: 0">
        <!-- 单张图片 -->
        <a-card hoverable @click="doClickPicture(picture)">
          <template #cover>
            <img
              :alt="picture.name"
              :src="picture.thumbnailUrl ?? picture.url"
              loading="lazy"
              style="height: 180px; object-fit: cover"
            />
          </template>
          <a-card-meta :title="picture.name">
            <template #description>
              <a-flex>
                <a-tag color="green">
                  {{ picture.category ?? '默认' }}
                </a-tag>
                <a-tag v-for="tag in picture.tags" :key="tag" style="color: dodgerblue">
                  {{ tag }}
                </a-tag>
              </a-flex>
            </template>
          </a-card-meta>
          <template v-if="showOp" #actions>
            <a-space @click="(e) => doSearch(picture, e)">
              <SearchOutlined />
              搜索
            </a-space>
            <a-space @click="(e) => doEdit(picture, e)">
              <EditOutlined />
              编辑
            </a-space>
            <a-space @click="(e) => doDelete(picture, e)">
              <DeleteOutlined />
              删除
            </a-space>
          </template>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts" setup>

// 定义数据
import { SearchOutlined, EditOutlined,DeleteOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { deletePictureUsingPost } from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'

interface Props {
  dataList?: API.PictureVO[],
  loading?: boolean,
  showOp?: boolean
  onReload?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  dataList: () => [],
  loading: false,
  showOp: false
})

const router = useRouter()
// 跳转至图片详情页
const doClickPicture = (picture: API.PictureVO) => {
  router.push({
    path: `/picture/${picture.id}`
  })
}

// 编辑
// 需要用 e.stopPropagation 阻止事件传播，否则会同时触发卡片点击事件，跳转到图片详情页
const doEdit = (picture, e) => {
  // 阻止冒泡
  e.stopPropagation()
  // 跳转时一定要携带 spaceId
  router.push({
    path: '/add_picture',
    query: {
      id: picture.id,
      spaceId: picture.spaceId
    }
  })
}

// 删除数据
// 需要用 e.stopPropagation 阻止事件传播，否则会同时触发卡片点击事件，跳转到图片详情页
const doDelete = async (picture, e) => {
  // 阻止冒泡
  e.stopPropagation()
  const id = picture.id
  if (!id) {
    return
  }
  const res = await deletePictureUsingPost({ id })
  if (res.data.code === 0) {
    message.success('删除成功')
    props.onReload?.()
  } else {
    message.error('删除失败')
  }
}

// 搜索
const doSearch = (picture, e) => {
  e.stopPropagation()
  window.open(`/search_picture?pictureId=${picture.id}`)
}


</script>

<style scoped></style>


