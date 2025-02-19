<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <!--关闭自动换行-->
      <a-col flex="200px">
        <router-link to="/">
          <div class="title-bar">
            <!--图标和标题，名字随意取-->
            <img src="../assets/logo.ico" alt="logo" class="logo" />
            <div class="title">鸡哥云图库</div>
          </div>
        </router-link>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="120px">
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            <a-dropdown>
              <ASpace>
                <a-avatar :src="loginUserStore.loginUser.userAvatar" />
                {{ loginUserStore.loginUser.userName ?? '无名' }}
                <!--  ??:若前面有值就用前面的值，否则就用后面的值   -->
              </ASpace>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="doLogout">
                    //todo 这里的图标出不来
                    <LogoutOutlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div v-else>
            <a-button type="primary" href="/user/login">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { DownOutlined } from '@ant-design/icons-vue';
import { h, ref } from 'vue'
import { HomeOutlined } from '@ant-design/icons-vue'
import { MenuProps, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { userLogoutUsingPost } from '@/api/userController.ts'

//引入全局状态
const loginUserStore = useLoginUserStore()

const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页' /*鼠标移入时显示的文字*/
  },
  {
    key: '/about',
    icon: () => h(HomeOutlined),
    label: '关于',
    title: '关于'
  },
  {
    key: 'others',
    label: h('a', { href: 'https://www.baidu.com', target: '_blank' }, '百度'),
    title: '百度'
  }
])

//拿到跳转的router对象
const router = useRouter()
//理由跳转事件
const doMenuClick = ({ key }) => {
  router.push({
    path: key
  })
}

//当前要高亮的菜单项
const current = ref<string[]>([])
//监听路由变化，更新高亮菜单项
//钩子函数，（每次跳转到哪个页面都会执行）  (to:去哪个页面，from：从哪个页面来的，next：接下来要去哪个页面)
router.afterEach((to, from, next) => {
  current.value = [to.path]
})

const doLogout = async () => {
  const res = await userLogoutUsingPost()
  console.log(res)
  if (res.data.code === 0) {
    //如果注销成功，则清除用户的登录态
    loginUserStore.setLoginUser({
      userName: '未登录'
    })
    message.success('退出登录成功')
    router.push({
      path: '/user/login'
    })
  } else {
    message.error('退出登录失败' + res.data.message)
  }
}
</script>

<style scoped>
#globalHeader .title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 48px;
}

.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}
</style>
