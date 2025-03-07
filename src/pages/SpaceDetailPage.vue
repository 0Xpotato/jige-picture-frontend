<template>
  <div id="pictureDetailPage">
    <!-- 空间信息 -->
    <a-flex justify="space-between">
      <h2>{{ space.spaceName }}（私有空间）</h2>
      <a-space size="middle">
        <a-button :href="`/add_picture?spaceId=${id}`" target="_self" type="primary">+ 创建图片</a-button>
        <a-tooltip :title="`占用空间:${formatSize(space.totalSize)}/${formatSize(space.maxSize)}`">
          <a-progress :percent="((space.totalSize*100)/(space.maxSize)).toFixed(1)" :size="56" type="circle" />
        </a-tooltip>
      </a-space>
    </a-flex>
    <!-- 图片列表 -->
    <PictureList :data-list="dataList" :loading="loading"/>
    <a-pagination
      v-model:current="searchParams.current"
      v-model:pageSize="searchParams.pageSize"
      :show-total="()=>`图片总数：${total}/${space.maxCount}`"
      :total="total"
      style="text-align: right"
      @change="onPageChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { listPictureVoByPageUsingPost, listPictureVoByPageWithCacheUsingPost } from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { getSpaceVoByIdUsingPost } from '@/api/spaceController.ts'
import { formatSize } from '@/utils'
import PictureList from '@/components/PictureList.vue'


const props = defineProps<{
  id: string | number
}>()
const space = ref<API.SpaceVO>({})


// -------- 获取空间详情 --------
const fetchSpaceDetail = async () => {
  try {
    const res = await getSpaceVoByIdUsingPost({
      id: props.id
    })
    if (res.data.code === 0 && res.data.data) {
      space.value = res.data.data
    } else {
      message.error('获取图片详情失败，' + res.data.message)
    }
  } catch (e: any) {
    message.error('获取图片详情失败：' + e.message)
  }
}

onMounted(() => {
  fetchSpaceDetail()
})


// --------- 获取图片列表 --------

// 定义数据
const dataList = ref<API.PictureVO[]>([])
const total = ref(0)
const loading = ref(true)


// 搜索条件
const searchParams = reactive<API.PictureQueryRequest>({
  current: 1,
  pageSize: 12,
  sortField: 'createTime',
  sortOrder: 'descend'
})

// 分页参数
const onPageChange = ((page: number, pageSize: number) => {
  searchParams.current = page
  searchParams.pageSize = pageSize
  fetchData()
})

// 获取数据
const fetchData = async () => {
  loading.value = true
  // 转换搜索参数
  const params = {
    ...searchParams,
    spaceId: props.id
  }
  //  使用缓存接口
  // const res = await listPictureVoByPageWithCacheUsingPost(params)
  const res = await listPictureVoByPageUsingPost(params)
  if (res.data.code === 0 && res.data.data) {
    dataList.value = res.data.data.records ?? []
    total.value = res.data.data.total ?? 0
  } else {
    message.error('获取数据失败，' + res.data.message)
  }
  loading.value = false
}

onMounted(() => {
  fetchData()
})



</script>

<style scoped>
#pictureDetailPage {
  margin-bottom: 16px;
}
</style>

