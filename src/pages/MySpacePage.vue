<template>
  <div id="mySpace">
<!--    <p>正在跳转中，请稍后...</p>-->
  </div>
</template>

<script lang="ts" setup>

import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { listSpaceVoByPageUsingPost } from '@/api/spaceController.ts'
import { message } from 'ant-design-vue'
import { onMounted } from 'vue'

const router = useRouter()
const loginUserStore = useLoginUserStore()

// 检查用户是否有个人空间
//  在页面加载时会检查用户是否登录、是否已有空间，并使用 router.replace 重定向页面，这样点击浏览器的后退按钮时，不会回到中间页。
const checkUserSpace = async () => {
  const loginUser = loginUserStore.loginUser
  //用户没有登录，跳转到用户登录页面
  if (!loginUser?.id) {
    router.replace('/user/login')
    return
  }
  // 获取用户空间信息
  const res = await listSpaceVoByPageUsingPost({
    userId: loginUser.id,
    current: 1,
    pageSize: 1
  })
  if (res.data.code === 0) {
    if (res.data.data?.records?.length > 0) {
      const space = res.data.data.records[0]
      router.replace(`/space/${space.id}`)
    } else {
      router.replace('/add_space')
      message.warn('请先创建空间')
    }
  } else {
    message.error('加载我的空间失败，' + res.data.message)
  }
}


//页面加载时先校验
onMounted(() => {
  checkUserSpace()
})
</script>
