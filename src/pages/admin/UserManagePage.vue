<template>
  <div id="userManagerPage">
    <!--    搜索框-->
    <a-form :model="searchParams" class="search" layout="inline" @finish="doSearch">
      <a-form-item label="账号">
        <a-input v-model:value="searchParams.userAccount" allow-clear placeholder="输入账号">
        </a-input>
      </a-form-item>
      <a-form-item label="用户名">
        <a-input v-model:value="searchParams.userName" allow-clear placeholder="输入用户名">
        </a-input>
      </a-form-item>
      <a-form-item label="用户简介">
        <a-input v-model:value="searchParams.userProfile" allow-clear placeholder="输入用户简介">
        </a-input>
      </a-form-item>
      <a-form-item label="用户角色">
        <a-input v-model:value="searchParams.userRole" allow-clear placeholder="输入用户角色">
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary">
          搜索
        </a-button>
      </a-form-item>
    </a-form>
    <!--    表格-->
    <a-table :columns="columns" :data-source="dataList" :pagination class="table" @change="doTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'userAvatar'">
          <a-image :src="record.userAvatar" :width="110" />
        </template>
        <template v-else-if="column.dataIndex === 'userRole'">
          <div v-if="record.userRole==='admin'">
            <a-tag color="yellow">管理员</a-tag>
          </div>
          <div v-else-if="record.userRole==='vip'">
            <a-tag color="red">会员</a-tag>
          </div>
          <div v-else>
            <a-tag color="blue">普通用户</a-tag>
          </div>
        </template>
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
        <template v-else-if="column.key==='action'">
          <a-button :href="`/user/update?id=${record.id}`" ghost target="_self" type="link">编辑</a-button>
          <a-button danger @click="doDelete(record.id)">删除</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { deleteUserUsingPost, listUserVoByPageUsingPost } from '@/api/userController.ts'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

const columns = [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '账号',
    dataIndex: 'userAccount'
  },
  {
    title: '用户名',
    dataIndex: 'userName'
  },
  {
    title: '头像',
    dataIndex: 'userAvatar'
  },
  {
    title: '简介',
    dataIndex: 'userProfile'
  },
  {
    title: '用户角色(admin/user)',
    dataIndex: 'userRole'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '操作',
    key: 'action'
  }
]

//数据
const dataList = ref<API.UserVO>([])
const total = ref(0)

//搜索条件
const searchParams = reactive<API.UserQueryRequest>({
  current: 1,
  pageSize: 10
})

//搜索事件
const doSearch = () => {
  //重置页码
  searchParams.current = 1
  //获取数据
  fetchData()
}

//删除数据
const doDelete = async (id: string) => {
  if (!id) {
    return
  }
  const res = await deleteUserUsingPost({ id })
  if (res.data.code === 0) {
    message.success('删除成功')
    //刷新数据
    await fetchData()
  } else {
    message.error('删除失败')
  }

}

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

//表格变化处理
const doTableChange = (page: any) => {
  searchParams.current = page.current,
    searchParams.pageSize = page.pageSize,
    fetchData()
}

//获取数据
const fetchData = async () => {
  const res = await listUserVoByPageUsingPost({
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
</script>

<style>
#userManagerPage {
  margin-bottom: 80px;
}

.search {
  margin-bottom: 16px;
}
</style>
