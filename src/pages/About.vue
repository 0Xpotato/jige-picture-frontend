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
        <!-- 为每个h2添加动画类名和自定义属性 -->
        <h2
          class="animate-text"
          data-aos="fade-up"
          data-aos-delay="300"
          style="margin-bottom: 2%"
        >
          你好, 我是Lucky Style, 00后, 26届毕业生, 热爱计算机互联网事业
        </h2>
        <h2
          class="animate-text"
          data-aos="fade-up"
          data-aos-delay="500"
          style="margin-bottom: 2%"
        >
          练习Java时长2月半，喜欢唱、跳、rap
        </h2>
        <h2
          class="animate-text"
          data-aos="fade-up"
          data-aos-delay="700"
          style="margin-bottom: 2%"
        >
          一望无际的迷雾中, 有人在寻找光明！很高兴遇到你, 我们一直在耕耘这么一片简单的土壤, 虽然没有尽善尽美, 但以初见雏形。<br>
          十年前我们仰望星空, 十年后我们将俯视大地, 未来的天空, 必将为我们留下一片灿烂的曙光!
        </h2>
      </div>
    </div>

    <div class="about-center">
      <a-typography-title>作者技能条：</a-typography-title>
      <div class="center-top">
        <a-space>
          <div class="about-center-left-info">
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

          <div class="about-center-right-info">
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
    </div>

    <div class="about-foot">
      <div>
        <a-space>
          <a-typography-title style="font-weight: lighter;text-align: right">
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
            <!-- 在联系方式卡片中新增打赏按钮 -->
            <div class="concat-information">
              <a-card hoverable title="联系方式：">
                <a-space>
                  <!-- 原有按钮... -->
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
                  <!-- 新增打赏按钮 -->
                  <a-button style="background-color: #1b179d; border-color: #1B179DFF" type="primary" @click="showModalOfReward">
                    <GiftOutlined />
                    打赏作者
                  </a-button>
                  <a-modal v-model:open="openOfReward" title="感谢支持" @ok="handleOkOfReward">
                    <a-image src="src/assets/WXZF.jpg"></a-image>
                  </a-modal>
                </a-space>
              </a-card>
            </div>
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
// 新增图标引入
import { GiftOutlined } from '@ant-design/icons-vue'

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


// 新增打赏相关状态
const openOfReward = ref<boolean>(false)
const showModalOfReward = () => {
  openOfReward.value = true
}
const handleOkOfReward = (e: MouseEvent) => {
  openOfReward.value = false
}
</script>

<style>
/* ================= 全局基础样式 ================= */
.aboutPage {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(to bottom right, #e6f7ff 0%, #f0faff 100%);
  background-size: cover;
  background-attachment: fixed;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
}

/* ================= 头部区域样式 ================= */
.about-header {
  text-align: center;
  margin-bottom: 2rem;
}

.about-header .ant-typography-title {
  letter-spacing: 2px;
  margin-bottom: 0 !important;
}

/* 自我介绍卡片样式 */
.self-introduction {
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.self-introduction h2 {
  font-weight: 400;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1.2rem !important;
}

/* ================= 主体内容区域样式 ================= */
.about-center {
  max-width: 1200px;
  margin: 2rem auto;
}

/* 技能条区域 */
.center-top {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.center-top p {
  margin: 0.8rem 0;
  font-weight: 500;
  color: #666;
}

.center-top .ant-progress {
  width: 400% !important;
  margin: 0.5rem 0 !important;
}

.center-center .ant-comment .ant-avatar {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.center-center .ant-comment .ant-card {
  border: 1px solid #eee;
}

/* ================= 底部区域样式 ================= */
.about-foot {
  max-width: 1200px;
  margin: 3rem auto;
}

.about-foot .ant-space {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.about-foot .ant-card {
  transition: transform 0.3s;
}

.about-foot .ant-card:hover {
  transform: translateY(-5px);
}

.about-foot .ant-btn-link {
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s;
}

.about-foot .ant-btn-link:hover {
  background: #f5f5f5;
}

.about-foot img {
  vertical-align: middle;
  margin-right: 8px;
}

/* ================= 通用组件样式 ================= */
.ant-card {
  background: rgba(255, 255, 255, 0.95) !important;
  border-radius: 12px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05) !important;
}

.ant-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08) !important;
  transform: translateY(-2px);
}


.ant-btn-primary[type="button"]:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

/* ================= 动画效果 ================= */
.self-introduction .animate-text {
  color: dodgerblue;
  opacity: 0;
  transform: translateY(20px);
  animation: textReveal 6.5s cubic-bezier(0.19, 1, 0.22, 1) infinite;
}

.self-introduction h2:nth-child(1) { animation-delay: 0.3s }
.self-introduction h2:nth-child(2) { animation-delay: 0.6s }
.self-introduction h2:nth-child(3) { animation-delay: 0.9s }

@keyframes textReveal {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  18% {
    opacity: 1;
    transform: translateY(0);
  }
  95% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(0);
  }
}

/* ================= 响应式布局 ================= */
@media (max-width: 768px) {
  .aboutPage {
    padding: 1rem;
  }

  .self-introduction h2 {
    font-size: 1.1rem !important;
    animation-duration: 0.8s !important;
  }

  .center-top {
    grid-template-columns: 1fr !important;
  }

  @keyframes textReveal {
    0% { transform: translateY(10px) }
    100% { transform: translateY(0) }
  }
}

.about-center-left-info{

  width: 576px;
}
.about-center-right-info{

  width: 576px;

}
</style>


