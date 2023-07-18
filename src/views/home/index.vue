<template>
  <div>
    <h1>展示登录成功后的数据: {{userStore.username}}</h1>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { onMounted } from 'vue'
const userStore = useUserStore()

onMounted(() =>{
  userStore.userInfo()
})
</script>

<style></style>
