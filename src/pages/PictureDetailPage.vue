<script>
import { onMounted, ref } from 'vue'
import { getPictureVoByIdUsingGet } from '@/api/pictureController.js'
import { message } from 'ant-design-vue'

const props = defineProps < {
  id: string | number
} > ()

const picture = ref < API.PictureVO > ({})
// 获取图片详情
const fetchPictureDetail = async () => {
  try {
    const res = await getPictureVoByIdUsingGet({
      id: props.id
    })
    if (res.data.code === 0 && res.data.data) {
      picture.value = res.data.data
    } else {
      message.error('获取图片详情失败' + res.data.message)
    }
  } catch (e: any) {
    message.error('获取图片详情失败'+e.message)
  }
}

onMounted(()=>{
  fetchPictureDetail()
})
</script>
