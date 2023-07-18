<template>
  <div class="tabbar-right">
    <el-button @click="handleReflash" :icon="Refresh" circle />
    <el-button :icon="FullScreen" circle />
    <el-button :icon="Aim" circle />
    <img
      style="width: 32px; height: 32px; border-radius: 50%; margin: 0 5px"
      src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
      alt=""
    />
    <el-dropdown>
      <span class="el-dropdown-link">
        admin
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item>
          <el-dropdown-item divided>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { FullScreen, Refresh, Aim } from '@element-plus/icons-vue'

import useLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayoutSettingStore()

const handleReflash = () => {
  layoutSettingStore.reflash = !layoutSettingStore.reflash
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
