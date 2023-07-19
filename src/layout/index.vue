<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
      :class="{ fold: layoutSettingStore.fold ? true : false }"
    >
      <Logo></Logo>
      <el-menu
        :collapse="layoutSettingStore.fold"
        :default-active="route.path"
        background-color="00162A"
        text-color="white"
        active-text-color="pink"
      >
        <!-- 根据路由动态生成菜单 -->
        <Menu :menuList="userStore.menuRoutes"></Menu>
      </el-menu>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: layoutSettingStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示 -->
    <div
      class="layout_main"
      :class="{ fold: layoutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '@/store/modules/user'
import { useRoute } from 'vue-router'

import useLayoutSettingStore from '@/store/modules/setting'

const layoutSettingStore = useLayoutSettingStore()

let userStore = useUserStore()

const route = useRoute()
console.log(route.path)
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  .layout_slider {
    color: #fff;
    width: $base-menu-width;
    background: $base-menu-background;
    height: 100vh;
    transition: all 0.3s;
    .el-menu {
      color: #fff;
      border-right: 0;
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;
    top: 0;
    left: $base-menu-width;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    padding: 20px;
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100% - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
