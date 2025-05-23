<template>
  <div class="pictureDetailPage">
    <a-row :gutter="[16, 16]">
      <!-- 图片展示区 -->
      <a-col :sm="24" :md="16" :xl="18">
        <a-card title="图片预览">
          <a-image style="max-height: 600px; object-fit: contain" :src="picture.url" />
        </a-card>
      </a-col>
      <!-- 图片信息区 -->
      <a-col :sm="24" :md="8" :xl="6">
        <a-card title="图片信息">
          <a-descriptions :column="1">
            <a-descriptions-item label="作者">
              <a-space>
                <a-avatar :size="24" :src="picture.user?.userAvatar" />
                <div>{{ picture.user?.userName }}</div>
              </a-space>
            </a-descriptions-item>
            <a-descriptions-item label="名称">
              {{ picture.name ?? '未命名' }}
            </a-descriptions-item>
            <a-descriptions-item label="简介">
              {{ picture.introduction ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="分类">
              {{ picture.category ?? '默认' }}
            </a-descriptions-item>
            <a-descriptions-item label="标签">
              <a-tag v-for="tag in picture.tags" :key="tag">
                {{ tag }}
              </a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="格式">
              {{ picture.picFormat ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="宽度">
              {{ picture.picWidth ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="高度">
              {{ picture.picHeight ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="宽高比">
              {{ picture.picScale ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="大小">
              {{ formatSize(picture.picSize) }}
            </a-descriptions-item>
          </a-descriptions>
          <a-space wrap>
            <a-button v-if="canEdit" :icon="h(EditOutlined)" type="primary" @click="doEdit">编辑</a-button>
            <a-button :icon="h(DeleteOutlined)" danger @click="doDelete">删除</a-button>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { computed, h, onMounted, ref } from "vue";
import { deletePictureUsingPost, getPictureVoByIdUsingGet } from "@/api/pictureController.ts";
import { message } from 'ant-design-vue'
import { formatSize } from '../utils'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoginUserStore } from "@/stores/useLoginUserStore.ts";
import * as path from "path";

const props = defineProps<{
  id: string | number
}>()

const picture = ref<API.PictureVO>({})

const fetchPictureDetail = async () => {
  try {
    const res = await getPictureVoByIdUsingGet({
      id: props.id,
    })
    if (res.data.code === 0 && res.data.data) {
      picture.value = res.data.data
    } else {
      message.error('图片获取失败,' + res.data.message)
    }
  } catch (error) {
    message.error('图片获取失败,' + error)
  }
}

const loginUserState = useLoginUserStore()

const canEdit = computed(() => {
  const loginUser = loginUserState.loginUser
  if (!loginUser.id) {
    return false
  }
  const user = picture.value.user
  return loginUser.id === user?.id || loginUser.userRole === 'admin'

})

const router = useRouter()

const doEdit = () => {
  router.push( `/add_picture?id=` + picture.value.id )
  console.log('编辑图片', picture.value.id)
}


const doDelete = async () => {
  const id = picture.value.id
  if (!id) {
    return
  }
  const res = await deletePictureUsingPost({
    id,
  })
  if (res.data.code === 0) {
    message.success('删除成功')
    router.push({ path: `/` })
  }else {
    message.error('删除失败,' + res.data.message)
  }
}

onMounted(() => {
  fetchPictureDetail()
})
</script>

<style scoped>
#pictureDetailPage {
}
</style>
