<template>
  <div class="logo-container" v-if="setting.logoHidden">
    <img class="logo_img" :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>
<script setup lang="ts">
import setting from '@/setting'
</script>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  align-items: center;
  padding: 5px;
  .logo_img {
    width: 50px;
    height: $base-menu-logo-height;
  }
  p {
    margin-left: 20px;
    color: #fff;
    font-size: $base-logo-fontSize;
  }
}
</style>
