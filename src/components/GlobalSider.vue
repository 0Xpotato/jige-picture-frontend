<template>
  <div id="globalSider">
    <a-layout-sider v-if="LoginUserStore.loginUser.id" breakpoint="lg" class="sider"
                    collapsed-width="0" width="200">
      <a-menu
        v-model:selectedKeys="current"
        :items="menuItems"
        mode="inline"
        @click="doMenuClick"
      />
    </a-layout-sider>
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import { PictureOutlined, UserOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'

const LoginUserStore = useLoginUserStore()

// 菜单列表
const menuItems = [
  {
    key: '/',
    label: '公共图库',
    icon: () => h(PictureOutlined)
  },
  {
    key: '/my_space',
    label: '我的空间',
    icon: () => h(UserOutlined)
  }
]

const router = useRouter()

//当前选中菜单
const current = ref<string[]>([])
//监听路由变化，更新当前选中菜单
router.afterEach((to, from, failure) => {
  current.value = [to.path]
})

//路由跳转事件
const doMenuClick = ({ key }) => {
  router.push({
    path: key
  })
}

</script>

<style>


</style>
