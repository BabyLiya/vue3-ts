<template>
  <div class="tabbar-right">
    <el-button @click="handleReflash" :icon="Refresh" circle />
    <el-button @click="fullScreen" :icon="FullScreen" circle />
    <el-button :icon="Aim" circle />
    <img
      style="width: 32px; height: 32px; border-radius: 50%; margin: 0 5px"
      :src="userStore.avatar"
      alt=""
    />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { FullScreen, Refresh, Aim } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting'

const layoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const handleReflash = () => {
  layoutSettingStore.reflash = !layoutSettingStore.reflash
}

// 处理全屏 document.fullscreenElement 判断当前页面是否全屏 否: null
const fullScreen = () => {
  const full = document.fullscreenElement
  // 切换为全屏
  if (!full) {
    // 利用文档根结点的requestFullscreen()方法可进入全屏
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// 退出登录
const logout = async () => {
  await userStore.userLogout()
  router.push({ path: '/login', query: { redirect: route.path } })
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style lang="scss" scoped>
.tabbar-right {
  display: flex;
  justify-content: center;
  align-items: center;
  .el-button {
    margin: 0 5px;
  }
  .el-dropdown {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
