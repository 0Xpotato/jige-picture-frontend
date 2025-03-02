<template>
  <div id="pictureManagePage">
    <a-flex class="header" justify="space-between">
      <h2 style="font-weight: revert">图片管理</h2>
      <a-space>
        <a-button href="/add_picture" target="_self" type="primary">+ 创建图片</a-button>
        <a-button ghost href="/add_picture/batch" target="_self" type="primary">+ 批量创建图片</a-button>
      </a-space>
    </a-flex>

    <!-- 搜索表单 -->
    <a-form :model="searchParams" class="search" layout="inline" @finish="doSearch">
      <a-form-item label="关键词" name="searchText">
        <a-input v-model:value="searchParams.searchText" allow-clear placeholder="从名称和简介搜索">
        </a-input>
      </a-form-item>
      <a-form-item label="类型" name="category">
        <a-input v-model:value="searchParams.category" allow-clear placeholder="输入图片类型">
        </a-input>
      </a-form-item>
      <a-form-item label="标签" name="tags">
        <a-select v-model:value="searchParams.tags" allow-clear mode="tags" placeholder="输入图片标签"
                  style="min-width: 180px">
        </a-select>
      </a-form-item>
      <a-form-item label="用户id" name="userId">
        <a-input v-model:value="searchParams.userId" allow-clear placeholder="输入用户id">
        </a-input>
      </a-form-item>
      <a-form-item label="审核状态" name="reviewStatus">
        <a-select v-model:value="searchParams.reviewStatus" :options="PIC_REVIEW_STATUS_OPTIONS" allow-clear
                  placeholder="请选择审核状态" style="min-width: 180px">
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary">
          搜索
        </a-button>
      </a-form-item>
    </a-form>
    <!-- 表格 -->
    <a-table :columns="columns" :data-source="dataList" :pagination="pagination" class="table" @change="doTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'url'">
          <a-image :src="record.url" :width="110" />
        </template>
        <template v-if="column.dataIndex === 'tags'">
          <a-tag v-for="tag in JSON.parse(record.tags || '[]')" :key="tag" style="color: orange">{{ tag }}</a-tag>
        </template>
        <!-- 图片信息 -->
        <template v-if="column.dataIndex==='picInfo'">
          <div>格式：{{ record.picFormat }}</div>
          <div>宽度：{{ record.picWidth }}</div>
          <div>高度：{{ record.picHeight }}</div>
          <div>宽高比：{{ record.picScale }}</div>
          <div>大小：{{ (record.picSize / 1024).toFixed(2) }}KB</div>
        </template>
        <!-- 审核信息 -->
        <template v-if="column.dataIndex==='reviewMessage'">
          <div class="reviewInfo" style="color: orange">审核状态：{{ PIC_REVIEW_STATUS_MAP[record.reviewStatus] }}</div>
          <div class="reviewInfo">审核人：{{ record.reviewerId }}</div>
          <div class="reviewInfo" style="color: blue">审核信息：{{ record.reviewMessage }}</div>
          <div v-if="record.reviewTime" class="reviewInfo">
            审核时间：{{ dayjs(record.reviewTime).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-else-if="column.dataIndex === 'editTime'">
          {{ dayjs(record.editTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-else-if="column.key==='action'">
          <a-space wrap>
            <a-button v-if="record.reviewStatus!==PIC_REVIEW_STATUS_ENUM.PASS" type="link"
                      @click="handleReview(record,PIC_REVIEW_STATUS_ENUM.PASS)">
              通过
            </a-button>
            <a-button v-if="record.reviewStatus!==PIC_REVIEW_STATUS_ENUM.REJECT" danger
                      type="link" @click="handleReview(record,PIC_REVIEW_STATUS_ENUM.REJECT)">
              拒绝
            </a-button>
            <a-button :href="`/add_picture?id=${record.id}`" link style="color: lightgreen" target="_blank" type="link">
              编辑
            </a-button>
            <a-button danger type="link" @click="doDelete(record.id)">
              删除
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import {
  deletePictureUsingPost,
  doPictureReviewUsingPost,
  listPictureByPageUsingPost
} from '@/api/pictureController.ts'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
import { PIC_REVIEW_STATUS_ENUM, PIC_REVIEW_STATUS_MAP, PIC_REVIEW_STATUS_OPTIONS } from '@/constants/picture.ts'

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    width: 80
  },
  {
    title: '图片',
    dataIndex: 'url'
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '简介',
    dataIndex: 'introduction',
    ellipsis: true
  },
  {
    title: '类型',
    dataIndex: 'category'
  },
  {
    title: '标签',
    dataIndex: 'tags'
  },
  {
    title: '图片信息',
    dataIndex: 'picInfo'
  },
  {
    title: '用户 id',
    dataIndex: 'userId',
    width: 80
  },
  {
    title: '审核信息',
    dataIndex: 'reviewMessage'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '编辑时间',
    dataIndex: 'editTime'
  },
  {
    title: '操作',
    key: 'action'
  }
]

//数据
const dataList = ref([])
const total = ref(0)

//搜索条件
const searchParams = reactive<API.PictureQueryRequest>({
  current: 1,
  pageSize: 10,
  sortField: 'createTime',
  sortOrder: 'descend'
})

//分页参数
const pagination = computed(() => {
  return {
    current: searchParams.current ?? 1,
    pageSize: searchParams.pageSize ?? 10,
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
  const res = await listPictureByPageUsingPost({
    ...searchParams
  })
  if (res.data.data) {
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

//搜索事件
const doSearch = () => {
  //重置页码
  searchParams.current = 1
  //获取数据
  fetchData()
}

//表格变化处理
const doTableChange = (page: any) => {
  searchParams.current = page.current,
    searchParams.pageSize = page.pageSize,
    fetchData()
}

//删除数据
const doDelete = async (id: number) => {
  if (id == null) {
    message.error('id 为空')
    return
  }
  const res = await deletePictureUsingPost({ id })
  if (res.data.code === 0 && res.data.data) {
    //刷新数据
    message.success('删除成功')
    await fetchData()
  } else {
    message.error('删除失败' + res.data.message)
  }
}

//图片审核
const handleReview = async (record: API.Picture, reviewStatus: number) => {
  const reviewMessage = reviewStatus === PIC_REVIEW_STATUS_ENUM.PASS ? '管理员操作通过' : '管理员操作拒绝'
  const res = await doPictureReviewUsingPost({
    id: record.id,
    reviewStatus,
    reviewMessage
  })
  if (res.data.code === 0) {
    message.success('审核操作成功')
    // 重新获取列表
    fetchData()
  } else {
    message.error('审核操作失败，' + res.data.message)
  }
}

</script>

<style>
#pictureManagePage {
  margin-bottom: 80px;
}

.header {
  margin-bottom: 16px;

}

.search {
  margin-bottom: 16px;
}

.reviewInfo {
  font-size: 12px;
}
</style>
