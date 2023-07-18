<template>
  <div class="tabbar-left">
    <el-icon @click="changeIcon" style="margin-right: 10px">
      <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
        :to="item.path"
        v-for="item in route.matched"
        :key="item.path"
        v-show="item.path === '/' ? false : true"
      >
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
import { ArrowRight, Fold, Expand } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// console.log(route.matched)  获取到每层路由的路径path

const layoutSettingStore = useLayoutSettingStore()

const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold
}
</script>
<script lang="ts">
export default {
  name: 'Breakcrumb',
}
</script>
<style lang="scss" scoped>
.tabbar-left {
  display: flex;
  .el-icon {
    cursor: pointer;
  }
}
</style>
