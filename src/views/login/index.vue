<template>
  <div class="login-container">
    <el-row :gutter="20">
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login-form"
          :model="loginForm"
          ref="formRef"
          :rules="rules"
        >
          <h1>Hello</h1>
          <h2 class="login-tit">欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <!-- 也可以在script中引入icon 再使用:prefix-icon="Lock" -->
            <el-input
              v-model="loginForm.password"
              show-password
              placeholder="请输入密码"
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login-btn"
              type="primary"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
const router = useRouter()

const useStore = useUserStore()

const loading = ref(false)
const formRef = ref()

const loginForm = reactive({
  username: '',
  password: '',
})

// 自定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
  callback()
  // // rule: 位校验对象
  // // value为文本内容
  // if (/^\d{5,10}$/.test(value)) {
  //   callback()
  // } else {
  //   callback(new Error('账号长度至少五位'))
  // }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
  // rule: 位校验对象
  // value为文本内容
  if (value >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少六位'))
  }
}

const rules = reactive({
  username: [
    // {
    //   required: true,
    //   min: 5,
    //   max: 10,
    //   message: '账号长度至少6位',
    //   trigger: 'change',
    // },
    {
      trigger: 'change',
      validator: validatorUserName,
    },
  ],
  password: [
    {
      trigger: 'change',
      validator: validatorPassword,
    },
  ],
})

const handleLogin = async () => {
  // 保证表单校验通过后再发起请求
  await formRef.value.validate()

  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    router.push('/')
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${getTime()}好`,
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login-form {
    color: #fff;
    position: relative;
    width: 70%;
    top: 30vh;
    left: 10vw;
    background: url('@/assets/images/login_form.png');
    padding: 20px 40px;
    background-size: cover;
    h1 {
      font-weight: 400;
      font-size: 40px;
    }
    .login-tit {
      margin: 20px 0;
      font-weight: 400;
    }
  }
  .login-btn {
    width: 100%;
  }
}
</style>
