import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import UserLoginPage from '@/pages/user/UserLoginPage.vue'
import UserRegisterPage from '@/pages/user/UserRegisterPage.vue'
import AddPicturePage from '@/pages/AddPicturePage.vue'
import PictureManagePage from '@/pages/admin/PictureManagePage.vue'
import PictureDetailPage from '@/pages/PictureDetailPage.vue'
import AddPictureBatchPage from '@/pages/AddPictureBatchPage.vue'
import UserUpdatePage from '@/pages/admin/UserUpdatePage.vue'
import UserManagePage from '@/pages/admin/UserManagePage.vue'
import SpaceManagePage from '@/pages/admin/SpaceManagePage.vue'
import AddSpacePage from '@/pages/AddSpacePage.vue'
import MySpacePage from '@/pages/MySpacePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '主页',
      component: HomePage
    },

    /*    {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue'),
        },*/

    {
      path: '/user/login',
      name: '用户登录',
      component: UserLoginPage
    },
    {
      path: '/user/register',
      name: '用户注册',
      component: UserRegisterPage
    },
    {
      path: '/admin/userManage',
      name: '用户管理',
      component: UserManagePage
    },
    {
      path: '/admin/pictureManage',
      name: '图片管理',
      component: PictureManagePage
    },
    {
      path: '/add_picture',
      name: '创建图片',
      component: AddPicturePage
    },
    {
      path: '/add_picture/batch',
      name: '批量创建图片',
      component: AddPictureBatchPage
    },
    {
      path: '/picture/:id',
      name: '图片详情',
      component: PictureDetailPage,
      props: true
    }, {
      path: '/user/update',
      name: '用户更新',
      component: UserUpdatePage
    },{
      path:'/admin/spaceManage',
      name:'空间管理',
      component:SpaceManagePage
    },{
      path:'/add_space',
      name:'创建空间',
      component:AddSpacePage
    },
    {
      path:'/my_space',
      name:'我的空间',
      component:MySpacePage
    }

  ]
})

export default router
