<template>
<!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
        <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayoutSettingStore()
</script>
<script lang="ts">
export default {
  name: 'Main'
}
</script>
<style lang="scss" scoped>
.fade-enter-from {
    opacity: 0;

}
.fade-enter-active {
    transition: all 1s;
}
.fade-enter-to {
    opacity: 1;
}
</style>
