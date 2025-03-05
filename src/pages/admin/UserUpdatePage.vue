<template>
  <div id="userUpdatePage">
    <h2 style="margin-bottom: 16px">
      更新用户信息
    </h2>
    <!--    输入框-->
    <a-form
      :model="userForm"
      layout="vertical"
      name="userForm"
      @finish="handleSubmit"
    >
      <a-form-item label="名称" name="userName">
        <a-input
          v-model:value="userForm.userName"
          allow-clear
          placeholder="请输入名称"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="简介" name="userProfile">
        <a-textarea
          v-model:value="userForm.userProfile"
          :auto-size="{ minRows: 2, maxRows: 5 }"
          allow-clear
          placeholder="请输入简介"
        >
        </a-textarea>
      </a-form-item>
      <a-form-item label="身份" name="userRole">
        <a-select
          v-model:value="userForm.userRole"
          :options="userRoleOptions"
          allow-clear
          placeholder="请选择身份"
        >
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" style="width: 100%" type="primary">
          确认
        </a-button>
      </a-form-item>
    </a-form>
  </div>

</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { getUserVoByIdUsingGet, listUserRoleUsingGet, updateUserUsingPost } from '@/api/userController.ts'


const user = ref<API.UserVO>()
const userForm = reactive<API.UserUpdateRequest>({})


const router = useRouter()

/**
 * 提交表单
 * @param values
 */
const handleSubmit = async (values: any) => {
  const userId = user.value.id
  if (!userId) {
    return
  }
  const res = await updateUserUsingPost({
    id: userId,
    ...values
  })
  if (res.data.code === 0 && res.data.data) {
    message.success('更新成功')
    // 跳转到用户管理页
    router.push({
      path: `/admin/userManage`
    })
  } else {
    message.error('更新失败，' + res.data.message)
  }
}


const route = useRoute()

//获取老用户数据
const getOldUser = async () => {
  //获取到id
  const id = route.query?.id
  if (id) {
    const res = await getUserVoByIdUsingGet({ id })
    if (res.data.code === 0 && res.data.data) {
      const data = res.data.data
      user.value = data
      userForm.userName = data.userName
      userForm.userProfile = data.userProfile
      userForm.userRole = data.userRole
    }
  }
}

onMounted(() => {
  getOldUser()
})

const userRoleOptions = ref<string[]>([])


// 获取用户角色选项
const getUserRoleOptions = async () => {
  const res = await listUserRoleUsingGet()
  if (res.data.code === 0 && res.data.data) {
    // 转换成下拉选项组件接受的格式
    userRoleOptions.value = (res.data.data.userRoleList ?? []).map((data: string) => {
      return {
        value: data,
        label: data
      }
    })
  } else {
    message.error('加载选项失败，' + res.data.message)
  }
}

onMounted(()=>{
  getUserRoleOptions()
})

</script>
<style>
#userUpdatePage {
  max-width: 720px;
  margin: 0 auto 64px;
}
</style>
