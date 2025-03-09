<template>
  <div id="searchPicturePage">
    <h2 style="margin-bottom: 16px">以图搜图</h2>
    <h3 style="margin: 16px 0">原图</h3>
    <a-card style="width: 240px">
      <template #cover>
        <img
          :alt="picture.name"
          :src="picture.thumbnailUrl ?? picture.url"
          style="height: 180px; object-fit: cover"
        />
      </template>
    </a-card>
    <h3 style="margin: 16px 0">识图结果</h3>
    <!-- 图片列表 -->
    <a-list
      :data-source="dataList"
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"
    >
      <template #renderItem="{ item }">
        <a-list-item style="padding: 0">
          <a :href="item.fromUrl" target="_blank">
            <a-card>
              <template #cover>
                <img :src="item.thumbUrl" style="height: 180px; object-fit: cover" />
              </template>
            </a-card>
          </a>
        </a-list-item>
      </template>
    </a-list>
  </div>

</template>

<script lang="ts" setup>


import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { getPictureVoByIdUsingGet, searchPictureByPictureUsingPost } from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'

const route = useRoute()

//图片id
const pictureId = computed(() => {
  return route.query?.pictureId
})

const picture = ref<API.PictureVO>({})

const getOldPicture = async () => {
  //获取数据
  const id = route.query?.PictureId
  if (id) {
    const res = await getPictureVoByIdUsingGet({
      id: id
    })
    if (res.data.code === 0 && res.data.data) {
      const data = res.data.data
      picture.value = data
    }
  }
}

onMounted(() => {
  getOldPicture()
})

const dataList = ref<API.ImageSearchResult[]>([])
//获取搜图结果
const fetchData = async () => {
  const res = await searchPictureByPictureUsingPost({
    pictureId: pictureId.value
  })
  if (res.data.code === 0 && res.data.data) {
    dataList.value = res.data.data ?? []
  } else {
    message.error('获取数据失败,' + res.data.message)
  }
}

// 页面加载时请求一次
onMounted(() => {
  fetchData()
})

</script>

<style>
#searchPicturePage {

}

</style>
