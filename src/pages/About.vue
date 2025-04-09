<template>
  <div class="aboutPage">

    <div class="about-header">
      <div>
        <a-space>
          <a-typography-title style="font-weight: lighter">Who is
          </a-typography-title>
          <a-typography-title>
            &nbsp;{{ name }}&nbsp;
          </a-typography-title>
          <a-typography-title style="font-weight: lighter">
            ?
          </a-typography-title>
        </a-space>
      </div>

      <a-divider orientation="left"></a-divider>

      <div class="self-introduction">
        <h2 style="margin-bottom: 2%">
          你好, 我是Lucky Style, 00后, 26届毕业生, 热爱计算机互联网事业
        </h2>
        <h2 style="margin-bottom: 2%">
          一望无际的迷雾中, 有人在寻找光明！很高兴遇到你, 我们一直在耕耘这么一片简单的土壤, 虽然没有尽善尽美, 但以初见雏形。
        </h2>
        <h2 style="margin-bottom: 2%">
          十年前我们仰望星空, 十年后我们将俯视大地, 未来的天空, 必将为我们留下一片灿烂的曙光!
        </h2>
      </div>
    </div>

    <div class="about-center">
      <a-typography-title>作者技能条：</a-typography-title>
      <div class="center-top">
        <a-space>
          <div class="top-info">
            <a-space>
              <div>
                <p>JAVA</p>
                <p>JavaScript</p>
                <p>恋爱能力</p>
              </div>
              <div>
                <a-tooltip title="主要掌握的技能">
                  <a-progress :percent="86" :success="{ percent: 86  }" style="margin-left: 44%;margin-right: 240px" />
                </a-tooltip>
                <a-tooltip title="使用现代轮子程度的能力">
                  <a-progress :percent="45" :success="{ percent: 45  }" style="margin-left: 44%;margin-right: 240px" />
                </a-tooltip>
                <a-tooltip title="爱要勇敢说出口">
                  <a-progress :percent="25" :success="{ percent: 25  }" style="margin-left: 44%;margin-right: 240px" />
                </a-tooltip>
              </div>
            </a-space>
          </div>

          <div class="center-info">
            <a-space>
              <div>
                <p>HTML5/CSS3</p>
                <p>奇思妙想</p>
                <p>洞察发现</p>
              </div>
              <div>
                <a-tooltip title="制作网站程度的能力">
                  <a-progress :percent="45" :success="{ percent: 45  }" style="margin-left: 44%;margin-right: 240px" />
                </a-tooltip>
                <a-tooltip title="总会想到一些什么">
                  <a-progress :percent="68" :success="{ percent: 68  }" style="margin-left: 44%;margin-right: 240px" />
                </a-tooltip>
                <a-tooltip title="观测世界程度的能力">
                  <a-progress :percent="75" :success="{ percent: 75  }" style="margin-left: 44%;margin-right: 240px" />
                </a-tooltip>
              </div>
            </a-space>
          </div>
        </a-space>
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
              <a-card hoverable title="空间级别介绍">
                <a-typography-paragraph>
                  * 目前仅支持开通普通版，如需升级空间，请联系
                  <a href="https://gitee.com/Lucky__Style" target="_blank">程序员鸡哥</a>
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
          <template #datetime>
            <!--          <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">-->
            <!--            <span>{{ dayjs().fromNow() }}</span>-->
            <span style="font-size: 20px;color: dodgerblue">{{ publishTime1 }}</span>
            <!--          </a-tooltip>-->
          </template>
        </a-comment>
      </div>
    </div>

    <div class="about-foot">
      <div>
        <a-space>
          <a-typography-title style="font-weight: lighter">
            Related to
          </a-typography-title>
          <a-typography-title>
            &nbsp;{{ name }}&nbsp;
          </a-typography-title>
        </a-space>
      </div>

      <a-divider orientation="left"></a-divider>

      <div>
        <a-space>
          <div class="concat-information">
            <a-card hoverable title="联系方式：">
              <a-space>
                <a-button type="primary" @click="showModalOfQQ">
                <QqOutlined />
                QQ
              </a-button>
              <a-modal v-model:open="openOfQQ" title="添加作者QQ" @ok="handleOkOfQQ">
                <a-image src="src/assets/QQ.png"></a-image>
              </a-modal>
              <a-button type="primary" @click="showModalOfWX">
                <WechatFilled />
                微信/WeChat
              </a-button>
              <a-modal v-model:open="openOfWX" title="添加作者微信" @ok="handleOkOfWX">
                <a-image src="src/assets/WX.jpg"></a-image>
              </a-modal>
              </a-space>
            </a-card>
          </div>


          <div class="community">
            <a-space>
              <a-card hoverable title="社区直达：">
                <a-button type="link">
                  <a href="https://github.com/0Xpotato" target="_blank">
                    <img alt="Github" src="../assets/GitHub.png" style="max-width: 16px;max-height: 16px">&nbsp;GitHub
                  </a>
                </a-button>
                <a-button style="margin-left: 1%" type="link">
                  <a href="https://gitee.com/Lucky__Style" target="_blank">
                    <img alt="Github" src="../assets/gitee.png" style="max-width: 16px;max-height: 16px">&nbsp;Gitee
                  </a>
                </a-button>
                <a-button style="margin-left: 1%" type="link">
                  <a href="https://blog.csdn.net/m0_73214105" target="_blank">
                    <img alt="csdn" src="../assets/csdn.png" style="max-width: 16px;max-height: 16px">&nbsp;CSDN
                  </a>
                </a-button>
              </a-card>
            </a-space>
          </div>

          <div class="product">
            <a-space>
              <a-card hoverable title="作品展示：">
                <a-button style="margin-top: 1%" type="primary">
                  <a href="/" target="_blank">
                    <img alt="Github" src="../assets/product.png" style="max-width: 16px;max-height: 16px">&nbsp;吉格云图库项目
                  </a>
                </a-button>
                <a-button style="margin-top: 1%">
                  <a target="_blank" type="link">
                    <WindowsOutlined />
                    个人博客（暂未上线）
                  </a>
                </a-button>
              </a-card>
            </a-space>
          </div>
        </a-space>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {
  CrownTwoTone,
  QqOutlined,
  WechatFilled,
  WindowsOutlined
} from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import relativeTime from 'dayjs/plugin/relativeTime'
import { formatSize } from '@/utils'
import { listSpaceLevelUsingPost } from '@/api/spaceController.ts'
import { message } from 'ant-design-vue'

const name = 'Lucky Style'

dayjs.extend(relativeTime)


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

const publishTime1 = ref('')

// 获取或设置公告发布时间
const getOrSetPublishTime = () => {
  const publishTime = localStorage.getItem('announcementPublishTime')
  if (!publishTime) {
    // 如果是第一次访问，保存当前时间
    const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    localStorage.setItem('announcementPublishTime', currentTime)
    publishTime1.value = '刚刚'
  } else {
    // 计算距离发布时间多久
    publishTime1.value = dayjs(publishTime).fromNow()
  }
}

onMounted(() => {
  fetchSpaceLevel()
  getOrSetPublishTime()
})

import { ref } from 'vue'

const openOfQQ = ref<boolean>(false)
const openOfWX = ref<boolean>(false)

const showModalOfQQ = () => {
  openOfQQ.value = true
}

const showModalOfWX = () => {
  openOfWX.value = true
}

const handleOkOfQQ = (e: MouseEvent) => {
  openOfQQ.value = false
}

const handleOkOfWX = (e: MouseEvent) => {
  openOfWX.value = false
}

</script>

<style>
.aboutPage {
  background-image: url("src/assets/background.jpg");
  margin: 1% 1% 1% 1%;

}

.about-header {
  width: 100%;
  height: 20%;
  margin-left: 1%;
}

.self-introduction {
  font-size: 14px;
  margin-bottom: 1px;
  margin-left: 1%;

}

.about-center {
  width: 100%;
  height: 30%;
  margin-top: 1%;
  margin-left: 1%;

}

.center-top {
  margin-right: 3%;
  text-align: center;
  margin-left: 1%;


}

.center-center {
  margin-top: 1%;
  width: 33%;


}

.top-info {
  width: 50%;
  margin-left: 1%;


}

.center-info {
  width: 50%;
  margin-left: 1%;


}

.about-foot {
  width: 100%;
  height: 10%;
  font-size: 18px;
  margin-top: 2%;
  margin-bottom: 36%;
  margin-left: 1%;

}

.concat-information {
  margin-top: 1%;
  width: 100%;
  margin-right: 160px;

}

.community {
  margin-top: 1%;
}

.product {
  margin-top: 1%;
}
</style>

