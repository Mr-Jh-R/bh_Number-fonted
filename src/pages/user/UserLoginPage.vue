<template>
  <div id="userLoginPage">
    <h2 class="title">BH库存 - 用户登录</h2>
    <div class="desc">致敬那些活着的人</div>
    <a-form :model="formState" name="basic" autocomplete="off" @finish="handleSubmit">
      <a-form-item name="userAccount" :rules="[{ required: true, message: '请输入账号' }]">
        <a-input v-model:value="formState.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        name="userPassword"
        :rules="[
          { required: true, message: '请输入密码' },
          { min: 8, message: '密码不能小于 8 位' },
        ]"
      >
        <a-input-password v-model:value="formState.userPassword" placeholder="请输入密码" />
      </a-form-item>
      <div class="tips">
        没有账号？
        <RouterLink to="/user/register">去注册</RouterLink>
      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { userLoginUsingPost } from '@/api/userController.ts'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { message } from 'ant-design-vue'

const router = useRouter()
const loginUserStore = useLoginUserStore()

/**
 * 登录
 */
const handleSubmit = async (value: any) => {
  const res = await userLoginUsingPost(value)
  if (res.data.code === 0 && res.data.data) {
    // 登录成功，把登录态保存到全局状态中
    await loginUserStore.fetchLoginUser()
    message.success('登录成功')
    router.push({
      path: '/',
      replace: true,
    })
  } else {
    message.error('登录失败，' + res.data.message)
  }
}

const formState = reactive<API.UserLoginRequest>({
  userAccount: '',
  userPassword: '',
})
</script>

<style scoped>
#userLoginPage {
  max-width: 400px;
  margin: 0 auto;
}

.title {
  text-align: center;
  margin-bottom: 16px;
}

.desc {
  text-align: center;
  color: #bbb;
  margin-bottom: 16px;
}

.tips {
  text-align: right;
  margin-bottom: 16px;
  color: #bbb;
  font-size: 12px;
}
</style>
