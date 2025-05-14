<template>
  <div id="addPicturePage">
    <h2 style="margin-bottom: 16px">{{ route.query?.id ? "修改库存" : "创建库存" }}</h2>
    <PictureUpload :picture="picture" :onSuccess="onSuccess" />
    <!--    图片信息表单-->
    <a-form
      class="select"
      layout="vertical"
      :model="pictureForm"
      @finish="handleSubmit"
    >
      <a-form-item label="名称" name="name">
        <a-input v-model:value="pictureForm.name" placeholder="请输入名称" allow-clear />
      </a-form-item>
      <a-form-item label="金额" name="name">
        <a-input v-model:value="pictureForm.name" placeholder="请输入金额" allow-clear />
      </a-form-item>
      <a-form-item label="数量" name="name">
        <a-input v-model:value="pictureForm.name" placeholder="请输入数量" allow-clear />
      </a-form-item>
      <a-form-item label="简介" name="introduction">
        <a-textarea
          v-model:value="pictureForm.introduction"
          placeholder="请输入简介"
          :auto-size="{ minRows: 2, maxRows: 5 }"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="分类" name="category">
        <a-auto-complete
          v-model:value="pictureForm.category"
          placeholder="请输入分类"
          :auto-size="{ minRows: 2, maxRows: 5 }"
          allow-clear
          :options="categoryOptions"
        />
      </a-form-item>
      <a-form-item label="标签" name="tags">
        <a-select
          mode="tags"
          v-model:value="pictureForm.tags"
          placeholder="请输入标签"
          allow-clear
          :options="tagOptions"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">{{ route.query?.id ? "修改" : "创建" }}</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import PictureUpload from '@/components/PictureUpload.vue'
import { onMounted, reactive, ref } from 'vue'
import {
  editPictureUsingPost,
  getPictureByIdUsingGet, getPictureVoByIdUsingGet,
  listPictureTagCategoryUsingGet,
  uploadPictureUsingPost
} from "@/api/pictureController.ts";
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { listProductTagCategoryUsingGet } from "@/api/productController.ts";

const picture = ref<API.PictureVO>()
const pictureForm = reactive<API.PictureEditRequest>({})
const productForm = reactive<API.>({})
const onSuccess = (newPicture: API.PictureVO) => {
  picture.value = newPicture
  pictureForm.name = newPicture.name
}
const router = useRouter()
const handleSubmit = async (values: any) => {
  const pictureId = picture.value?.id
  if (!pictureId) {
    return
  }
  const res = await editPictureUsingPost({
    id: pictureId,
    ...values,
  })
  if (res.data.code === 0 && res.data.data) {
    message.success('创建成功')
    router.push({ path: `/picture/${pictureId}` })
  } else {
    message.error('创建失败,' + res.data.message)
  }
}

const categoryOptions = ref<string[]>([])
const tagOptions = ref<string[]>([])

const getTagCategoryOptions = async () => {
  const res = await listProductTagCategoryUsingGet({})
  if (res.data.code === 0 && res.data.data) {
    categoryOptions.value = (res.data.data.categoryList ?? []).map((data: string) => {
      return {
        value: data,
        label: data,
      }
    })
    tagOptions.value = (res.data.data.tagList ?? []).map((data: string) => {
      return {
        value: data,
        label: data,
      }
    })
  } else {
    message.error('获取标签和列表失败,' + res.data.message)
  }
}

onMounted(() => {
  getTagCategoryOptions()
})

const route = useRoute()
const getOldPicture = async () => {
  const pictureId = route.query?.id
  if (pictureId) {
    const res = await getPictureVoByIdUsingGet({
      id: pictureId
    })
    if (res.data.code === 0 && res.data.data) {
      const data = res.data.data
      picture.value = data
      pictureForm.name = data.name
      pictureForm.introduction = data.introduction
      pictureForm.category = data.category
      pictureForm.tags = data.tags
    }
  }
}
onMounted(() => {
  getOldPicture()
})
</script>

<style scoped>
#addPicturePage {
  max-width: 720px;
  margin: 0 auto;
}
</style>
