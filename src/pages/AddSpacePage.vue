<template>
  <div id="addSpacePage">
    <h2 style="margin-bottom: 16px">
      {{ route.query?.id ? '修改空间' : '创建空间' }}
    </h2>
    <!--    输入框-->
    <a-form
      v-if="formData"
      :model="formData"
      layout="vertical"
      name="spaceForm"
      @finish="handleSubmit"
    >
      <a-form-item label="空间名称" name="spaceName">
        <a-input
          v-model:value="formData.spaceName"
          allow-clear
          placeholder="请输入空间名称"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="空间级别" name="spaceLevel">
        <a-select
          v-model:value="formData.spaceLevel"
          :options="SPACE_LEVEL_OPTIONS"
          allow-clear
          placeholder="请输入空间名称"
        >
        </a-select>
      </a-form-item>

      <a-form-item>
        <a-button :loading="loading" html-type="submit" style="width: 100%" type="primary">
          {{ route.query?.id ? '修改' : '创建' }}
        </a-button>
      </a-form-item>
      <a-form-item class="spaceCard">
        <a-card hoverable title="空间级别介绍">
          <a-typography-paragraph>
            * 目前仅支持开通普通版，如需升级空间，请联系
            <a href="https://www.baidu.com" target="_blank">程序员鸡哥</a>
          </a-typography-paragraph>
          <a-typography-paragraph v-for="spaceLevel in spaceLevelList">
            <div v-if="spaceLevel.value===0" style="color: #666666">
              <CrownTwoTone />
              {{ spaceLevel.text }}：空间大小：{{ formatSize(spaceLevel.maxSize) }}，空间数量：{{ spaceLevel.maxCount }}
            </div>
            <div v-if="spaceLevel.value===1" style="color: blueviolet">
              <a-space>
                <CrownTwoTone />
                <CrownTwoTone />
                {{ spaceLevel.text }}：空间大小：{{ formatSize(spaceLevel.maxSize) }}，空间数量：{{ spaceLevel.maxCount }}
              </a-space>
            </div>
            <div v-if="spaceLevel.value===2" style="color: orange">
              <CrownTwoTone />
              <CrownTwoTone />
              <CrownTwoTone />
              {{ spaceLevel.text }}：空间大小：{{ formatSize(spaceLevel.maxSize) }}，空间数量：{{ spaceLevel.maxCount }}
            </div>
          </a-typography-paragraph>
        </a-card>
      </a-form-item>
    </a-form>
  </div>

</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import {
  addSpaceUsingPost,
  getSpaceVoByIdUsingPost,
  listSpaceLevelUsingPost,
  updateSpaceUsingPost
} from '@/api/spaceController.ts'
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { SPACE_LEVEL_ENUM, SPACE_LEVEL_OPTIONS } from '@/constants/space.ts'
import { formatSize } from '../utils'
import { CrownTwoTone } from '@ant-design/icons-vue'


const formData = reactive<API.SpaceAddRequest | API.SpaceEditRequest>({
  spaceName: '',
  spaceLevel: SPACE_LEVEL_ENUM.COMMON
})

const loading = ref(false)
const spaceLevelList = ref<API.SpaceLevel[]>([])


const router = useRouter()

/**
 * 提交表单
 * 根据是否有 spaceId 决定是调用更新接口还是创建接口
 * @param values
 */
const handleSubmit = async (values:any) => {
  loading.value = true
  const spaceId = oldSpace.value?.id
  let res
  if (spaceId) {
    //更新
    res = await updateSpaceUsingPost({
      id: spaceId,
      ...formData
    })
  } else {
    //创建
    res = await addSpaceUsingPost({
      ...formData
    })
  }
  if (res.data.code === 0 && res.data.data) {
    message.success('操作成功')
    // 跳转到空间详情页
    let path = `/space/${spaceId ?? res.data.data}`
    router.push({
      path,
    })
  } else {
    message.error('操作失败，' + res.data.message)
  }
  loading.value = false
}

const route = useRoute()

// 获取空间级别
const fetchSpaceLevel = async () => {
  const res = await listSpaceLevelUsingPost()
  if (res.data.code === 0 && res.data.data) {
    spaceLevelList.value = res.data.data
  } else {
    message.error('加载空间级别失败' + res.data.message)
  }
}

onMounted(() => {
  fetchSpaceLevel()
})

const oldSpace = ref<API.SpaceVO>()

//获取老空间
const getOldSpace = async () => {
  loading.value = true
  //获取老数据
  const id = route?.query.id
  if (id) {
    const res = await getSpaceVoByIdUsingPost({
      id: id
    })
    if (res.data.code === 0 && res.data.data) {
      const data = res.data.data
      oldSpace.value = data
      formData.spaceName = data.spaceName
      formData.spaceLevel = data.spaceLevel
    } else {
      message.error('获取信息失败' + res.data.message)
    }
    loading.value = false
  }
}

// 页面加载时，请求老数据
onMounted(() => {
  if (route?.query.id)
    getOldSpace()
})
</script>
<style>
#addSpacePage {
  max-width: 720px;
  margin: 0 auto 64px;
}

.spaceCard {
  background-color: red;
  text-align: center;
}
</style>
