<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <!--关闭自动换行-->
      <a-col flex="200px">
        <router-link to="/">
          <div class="title-bar">
            <!--图标和标题，名字随意取-->
            <img alt="logo" class="logo" src="../assets/logo.ico" />
            <!--            <div class="title">鸡哥云图库</div>-->
            <div class="title">吉格云图库</div>
          </div>
        </router-link>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          :items="items"
          mode="horizontal"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="80px">
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            <a-dropdown>
              <ASpace>
                <div v-if="loginUserStore.loginUser.userRole==='user'">
                  <SmileTwoTone />
                </div>
                <div v-if="loginUserStore.loginUser.userRole==='vip'">
                  <CrownTwoTone />
                </div>
                <div v-if="loginUserStore.loginUser.userRole==='admin'">
                  <CrownOutlined />
                </div>

                <!--                <a-avatar v-if="loginUserStore.loginUser.userRole==='user'" alt="user" src="@/user.png" />
                                <a-avatar v-if="loginUserStore.loginUser.userRole==='vip'" alt="vip" src="@/vip.png" />
                                <a-avatar v-if="loginUserStore.loginUser.userRole==='admin'" alt="admin" src="@/admin.png" />-->
                <!--                <div style="font-size: 12px">
                                  身份：{{ loginUserStore.loginUser.userRole }}
                                </div>-->
                <!--                <a-avatar :src="loginUserStore.loginUser.userAvatar" />-->
                <!--                <a-avatar v-if="loginUserStore.loginUser.id" alt="默认头像" src="src/assets/user.png" />-->
                {{ loginUserStore.loginUser.userName ?? '无名' }}

                <!--  ??:若前面有值就用前面的值，否则就用后面的值   -->
              </ASpace>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <router-link to="/my_space" />
                    <UserOutlined />
                    我的空间
                  </a-menu-item>
                  <a-menu-item @click="doLogout">
                    <LogoutOutlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div v-else>
            <a-button href="/user/login" type="primary">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
//                      记得要引入图标
import {
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
  ContactsOutlined,
  PlusOutlined,
  PicCenterOutlined,
  DollarCircleFilled,
  CrownTwoTone,
  CrownOutlined,
  SmileTwoTone,
  BlockOutlined
} from '@ant-design/icons-vue'
import { computed, h, ref } from 'vue'
import { MenuProps, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { userLogoutUsingPost } from '@/api/userController.ts'

//引入全局状态
const loginUserStore = useLoginUserStore()

const originItems = [
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页' /*鼠标移入时显示的文字*/
  },
  {
    key: '/admin/userManage',
    icon: () => h(ContactsOutlined),
    label: '用户管理',
    title: '用户管理'
  }, {
    key: '/add_picture',
    icon: () => h(PlusOutlined),
    label: '创建图片',
    title: '创建图片'
  },
  {
    key: '/admin/pictureManage',
    icon: () => h(PicCenterOutlined),
    label: '图片管理',
    title: '图片管理'
  }, {
    key: '/admin/spaceManage',
    icon: () => h(BlockOutlined),
    label: '空间管理',
    title: '空间管理'
  },
  /*  {
      key: '',
      label: h('a', { href: 'https://gitee.com/Lucky__Style', target: '_blank' }, '联系作者'),
      title: '联系作者'
    },*/
  {
    key: '/exchange_vip',
    icon: () => h(DollarCircleFilled),
    label: '会员兑换',
    title: '会员兑换'
  },
  {
    key: '/about',
    icon: () => h(BlockOutlined),
    label: '关于作者',
    title: '关于作者'
  }
  /*,
  {
    key: 'others',
    label: h('a', { href: 'https://www.baidu.com', target: '_blank' }, '百度'),
    title: '百度'
  }*/
]


// 过滤菜单项
const filterMenus = (menus = [] as MenuProps['items']) => {
  return menus?.filter((menu) => {
    if (menu.key.startsWith('/admin')) {
      const loginUser = loginUserStore.loginUser
      if (!loginUser || loginUser.userRole !== 'admin') {
        return false
      }
    }
    return true
  })
}

// 展示在菜单的路由数组
const items = computed<MenuProps['items']>(() => filterMenus(originItems))


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

//用户注销
const doLogout = async () => {
  const res = await userLogoutUsingPost()
  console.log(res)
  if (res.data.code === 0) {
    //如果注销成功，则将用户的名称重置为未登录
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
