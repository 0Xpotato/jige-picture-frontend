<template>
  <div class="exchange-vip">
    <div>
      <a-typography-title>会员码兑换</a-typography-title>
      <a-form :model="formData" layout="vertical" @finish="handleExchange">
        <a-form-item label="会员码" name="vipCode">
          <a-input v-model:value="formData.vipCode" placeholder="请输入会员码" />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" type="primary">
            兑换
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="center-center">
      <a-typography-title>公告栏</a-typography-title>
      <a-comment>
        <template #author><a style="font-size: 16px;color: orangered">吉格</a></template>
        <template #avatar>
          <a-avatar alt="吉格" src="public/favicon.ico" />
        </template>
        <template #content>
          <p>
            <a-card hoverable title="会员价格公示">
              <a-typography-paragraph>
                <a-typography-text style="color: orangered">
                  30/年：1年会员（开通后联系管理员可免费升级专业版空间）<br><br>
                  &nbsp;&nbsp;温馨提示：开通后暂不支持退款，请务必知晓！！！<br><br>
                  &nbsp;&nbsp;tips：以后可能会随着业务涨价，提早开通提早享受<br><br>
                </a-typography-text>
                <!--            <a target="_blank" type="link">程序员鸡哥</a>-->
                <div class="concat-information">
                  <a-card hoverable title="开通方式：">
                    <a-space>
                      <!-- 新增打赏按钮 -->
                      <a-button style="background-color: #1b179d; border-color: #1B179DFF" type="primary" @click="showModalOfReward">
                        <GiftOutlined />
                        微信支付
                      </a-button>
                      <a-modal v-model:open="openOfReward" style="width: fit-content;height: fit-content;" title="感谢支持" @ok="handleOkOfReward">
                        <img src="../assets/WXZF30.jpg" style="max-width: 800px;max-height: 800px"></img>
                      </a-modal>
                    </a-space>
                  </a-card>
                </div>
              </a-typography-paragraph>
            </a-card>
            <a-card hoverable style="margin-top: 2%" title="会员权益介绍">
              <a-typography-paragraph>
                开通会员即可享受如下权益：<br>
                <a-typography-paragraph style="color: dodgerblue">
                  1、AI扩图免费体验<br>
                  2、以图搜图免费体验<br>
                  3、私有空间升级为专业版，即空间大小：1000.00 MB，空间数量：1000<br>
                  4、高清原图下载<br>
                  5、更多VIP专享功能敬请期待~~~<br>
                </a-typography-paragraph>
                如果您有任何疑问，请联系：
                <a href="/About" target="_blank">程序员鸡哥</a>
                <!--            <a target="_blank" type="link">程序员鸡哥</a>-->
              </a-typography-paragraph>
            </a-card>
            <a-card hoverable style="margin-top: 3%" title="空间级别介绍">
              <a-typography-paragraph>
                * 普通用户目前仅支持开通普通版，如需升级空间，请&nbsp;开通会员&nbsp;或请联系
                <a href="/About" target="_blank">程序员鸡哥</a>
                <!--            <a target="_blank" type="link">程序员鸡哥</a>-->
              </a-typography-paragraph>
              <a-typography-paragraph v-for="spaceLevel in spaceLevelList">
                <div v-if="spaceLevel.value===0" style="color: #666666">
                  <CrownTwoTone />
                  {{ spaceLevel.text }}：空间大小：{{ formatSize(spaceLevel.maxSize) }}，空间数量：{{ spaceLevel.maxCount
                  }}
                </div>
                <div v-if="spaceLevel.value===1" style="color: blueviolet">
                  <a-space>
                    <CrownTwoTone />
                    <CrownTwoTone />
                    {{ spaceLevel.text }}：空间大小：{{ formatSize(spaceLevel.maxSize)
                    }}，空间数量：{{ spaceLevel.maxCount }}
                  </a-space>
                </div>
                <div v-if="spaceLevel.value===2" style="color: orange">
                  <CrownTwoTone />
                  <CrownTwoTone />
                  <CrownTwoTone />
                  {{ spaceLevel.text }}：空间大小：{{ formatSize(spaceLevel.maxSize) }}，空间数量：{{ spaceLevel.maxCount
                  }}
                </div>
              </a-typography-paragraph>
            </a-card>
          </p>
        </template>
      </a-comment>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { exchangeVipUsingPost } from '@/api/userController' // 引入兑换会员的请求函数
import { message } from 'ant-design-vue'
import { CrownTwoTone, GiftOutlined, QqOutlined, WechatFilled } from '@ant-design/icons-vue'
import { formatSize } from '@/utils'
import { listSpaceLevelUsingPost } from '@/api/spaceController.ts'
import { useRouter } from 'vue-router'
import Router from '@/router'

// 初始化表单数据
const formData = reactive({
  vipCode: ''
})

const router = useRouter()

// 处理兑换操作
const handleExchange = async () => {
  try {
    const res = await exchangeVipUsingPost({
      vipCode: formData.vipCode
    })
    if (res.data.code === 0 && res.data.data) {
      message.success('兑换成功')
      formData.vipCode = '' // 清空输入框
      await router.push({
        path: '/'
      })
    } else {
      message.error('兑换失败，' + res.data.message)
    }
  } catch (error) {
    message.error('请求出错，请稍后重试')
  }
}

// 新增打赏相关状态
const openOfReward = ref<boolean>(false)
const showModalOfReward = () => {
  openOfReward.value = true
}
const handleOkOfReward = (e: MouseEvent) => {
  openOfReward.value = false
}

const spaceLevelList = ref<API.SpaceLevel[]>([])
// 获取空间级别
const fetchSpaceLevel = async () => {
  const res = await listSpaceLevelUsingPost()
  if (res.data.code === 0 && res.data.data) {
    spaceLevelList.value = res.data.data
  } else {
    message.error('加载空间级别失败' + res.data.message)
  }
}

onMounted(()=>{
  fetchSpaceLevel()
})
</script>

<style scoped>
.exchange-vip {
  width: 30%;
  margin-top: 2%;
  margin-left: 4%;
  margin-right: 15%;
}


</style>
