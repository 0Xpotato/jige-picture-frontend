<template>
  <div id="homePage">

    <!-- 搜索框 -->
    <div class="search-bar">
      <a-input-search
        v-model:value="searchParams.searchText"
        enter-button="搜索"
        placeholder="从海量图片中搜索"
        size="large"
        @search="doSearch"
      />
    </div>
    <!-- 图片列表 -->
    <a-list
      :data-source="dataList"
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }"

      :pagination="pagination"
    >
      <template #renderItem="{ item: picture }">
        <a-list-item style="padding: 0">
          <!-- 单张图片 -->
          <a-card hoverable>
            <template #cover>
              <img
                style="height: 180px; object-fit: cover"
                :alt="picture.name"
                :src="picture.url"
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
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>


<script lang="ts" setup>
import { LoadingOutlined } from '@ant-design/icons-vue'
import { listPictureVoByPageUsingPost } from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'
import { computed, onMounted, reactive, ref } from 'vue'

interface DataItem {
  title: string;
}

const data: DataItem[] = []


//数据
const dataList = ref<API.PictureVO>([])
const total = ref(0)

//搜索条件
const searchParams = reactive<API.PictureQueryRequest>({
  current: 1,
  pageSize: 12,
  sortField: 'createTime',
  sortOrder: 'descend'
})

//分页参数
const pagination = computed(() => {
  return {
    current: searchParams.current ?? 1,
    pageSize: searchParams.pageSize ?? 12,
    total: total.value,


    showSizeChanger: true,
    /*    showTotal: (total) => {
          return `共${total}条`
        }*/
    showTotal: (total) => `共${total}条`


  }
})

//获取数据
const fetchData = async () => {

  const res = await listPictureVoByPageUsingPost({
    ...searchParams
  })
  if (res.data.code === 0 && res.data.data) {
    dataList.value = res.data.data.records ?? []
    total.value = res.data.data.total ?? 0
  } else {
    message.error('获取信息失败' + res.data.message)
  }
}

//页面加载时，请求后端，获取一次数据
onMounted(() => {
  fetchData()
})

const doSearch = async () => {
  //获取数据
  await fetchData()
  //重置搜索后的页码
  searchParams.current = 1
}
</script>

<style>
#homePage {

}

.search-bar {
  max-width: 480px;
  margin: 0 auto 16px;
}
</style>

