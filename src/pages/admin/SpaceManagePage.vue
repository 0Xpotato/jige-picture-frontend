<template>
  <div id="spaceManagePage">
    <a-flex class="header" justify="space-between">
      <h2 style="font-weight: revert">图片管理</h2>
      <a-space>
        <a-button href="/add_space" target="_self" type="primary">+ 创建空间</a-button>
      </a-space>
    </a-flex>

    <!-- 搜索表单 -->
    <a-form :model="searchParams" class="search" layout="inline" @finish="doSearch">
      <a-form-item label="空间名称" name="spaceName">
        <a-input v-model:value="searchParams.spaceName" allow-clear placeholder="从空间名称搜索">
        </a-input>
      </a-form-item>
      <a-form-item label="空间级别" name="spaceLevel">
        <a-select v-model:value="searchParams.spaceLevel" :options="SPACE_LEVEL_OPTIONS" allow-clear
                  placeholder="选择空间级别">
        </a-select>
      </a-form-item>
      <a-form-item label="用户id" name="userId">
        <a-input v-model:value="searchParams.userId" allow-clear placeholder="输入用户id">
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary">
          搜索
        </a-button>
      </a-form-item>

      <a-space>
        <a-button href="/add_space" target="_self" type="primary">+ 创建空间</a-button>
        <a-button ghost href="/space_analyze?queryPublic=1" target="_self" type="primary">
          分析公共图库
        </a-button>
        <a-button ghost href="/space_analyze?queryAll=1" target="_self" type="primary">
          分析全空间
        </a-button>
      </a-space>

    </a-form>
    <!-- 表格 -->
    <a-table :columns="columns" :data-source="dataList" :pagination="pagination" class="table" @change="doTableChange">
      <template #bodyCell="{ column, record }">
        <!-- 空间级别 -->
        <template v-if="column.dataIndex === 'spaceLevel'">
          <a-tag v-if="record.spaceLevel===0" color="blue">
            {{ SPACE_LEVEL_MAP[record.spaceLevel] }}
          </a-tag>
          <a-tag v-if="record.spaceLevel===1" color="red">
            {{ SPACE_LEVEL_MAP[record.spaceLevel] }}
          </a-tag>
          <a-tag v-if="record.spaceLevel===2" color="orange">
            {{ SPACE_LEVEL_MAP[record.spaceLevel] }}
          </a-tag>
        </template>
        <!--使用情况-->
        <template v-if="column.dataIndex === 'tags'">
          <a-tag v-for="tag in JSON.parse(record.tags || '[]')" :key="tag" style="color: orange">{{ tag }}</a-tag>
        </template>
        <!-- 空间信息 -->
        <template v-if="column.dataIndex==='spaceUseInfo'">
          <div>大小：{{ formatSize(record.totalSize) }}/{{ formatSize(record.maxSize) }}</div>
          <div>数量：{{ record.totalCount }}/{{ record.maxCount }}</div>
        </template>
        <!-- 创建时间-->
        <template v-else-if="column.dataIndex === 'createTime'">
          <a-space>
            <div>
              {{ dayjs(record.createTime).format('YYYY-MM-DD') }}
            </div>
            <div style="color: blue">
              {{ dayjs(record.createTime).format('HH:mm:ss') }}
            </div>
          </a-space>
        </template>
        <!-- 编辑时间-->
        <template v-else-if="column.dataIndex === 'editTime'">
          <a-space>
            <div>
              {{ dayjs(record.editTime).format('YYYY-MM-DD') }}
            </div>
            <div style="color: blue">
              {{ dayjs(record.editTime).format('HH:mm:ss') }}
            </div>
          </a-space>
        </template>
        <!-- 操作按钮-->
        <template v-else-if="column.key==='action'">
          <a-space wrap>
            <a-button :href="`/space_analyze?spaceId=${record.id}`" target="_self" type="link">
              分析
            </a-button>
            <a-button :href="`/add_space?id=${record.id}`" target="_self" type="link">
              编辑
            </a-button>
            <a-button danger @click="doDelete(record.id)">删除</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
import { deleteSpaceUsingPost, listSpaceByPageUsingPost } from '@/api/spaceController.ts'
import { SPACE_LEVEL_MAP, SPACE_LEVEL_OPTIONS } from '../../constants/space.ts'
import { format } from 'pathe'
import { formatSize } from '../../utils'

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    width: 80
  },
  {
    title: '空间名称',
    dataIndex: 'spaceName'
  },
  {
    title: '空间级别',
    dataIndex: 'spaceLevel'
  },
  {
    title: '使用情况',
    dataIndex: 'spaceUseInfo'
  },
  {
    title: '用户 id',
    dataIndex: 'userId',
    width: 80
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
const searchParams = reactive<API.SpaceQueryRequest>({
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
    showQuickJumper: true,
    /*    showTotal: (total) => {
          return `共${total}条`
        }*/
    showTotal: (total) => `共${total}条`


  }
})

//获取数据
const fetchData = async () => {
  const res = await listSpaceByPageUsingPost({
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
  const res = await deleteSpaceUsingPost({ id })
  if (res.data.code === 0 && res.data.data) {
    //刷新数据
    message.success('删除成功')
    await fetchData()
  } else {
    message.error('删除失败' + res.data.message)
  }
}


</script>

<style>
#spaceManagePage {
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
