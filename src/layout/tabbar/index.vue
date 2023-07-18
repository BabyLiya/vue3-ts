<template>
  <div class="tabbar-container">
    <Breakcrumb></Breakcrumb>
    <Setting></Setting>
  </div>
</template>
<script setup lang="ts">
import Breakcrumb from './breakcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<style lang="scss" scoped>
.tabbar-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: #d8d1ce;
}
</style>
