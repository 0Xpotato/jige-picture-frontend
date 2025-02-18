import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * 定义存储登录用户信息的状态（store）
 * 一个store就是一个状态
 */
export const useLoginUserStore = defineStore('loginUser', () => {
  // *********************************************************************************************             指定一个状态的名称，这里叫loginUser
  const loginUser = ref<any>({
    //登录用户是一个响应式变量，将来要更新每一个页面
    userName: '未登录', //给一个初始值
  })

  async function fetchLoginUser() {
    //todo 由于后端还没提供接口，暂时注释
    //const res = await getCurrentUser()
    //if (res.data.code === 0 && res.data.data) {
    //  loginUser.value = res.data.data
    //}

    //测试用户登录，3秒后自动登录
    setTimeout(() => {
      loginUser.value = {
        userName: '测试用户',
        id: 1,
      }
    }, 3000)
  }

  /**
   * 函数：设置登录用户，接收外层传来的新用户并设置为登录用户
   * @param newLoginUser
   */
  function setLoginUser(newLoginUser: any) {
    loginUser.value = newLoginUser
  }

  //返回
  return { loginUser, fetchLoginUser, setLoginUser }
})
