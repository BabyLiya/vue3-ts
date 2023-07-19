<template>
  <div>
    <el-card class="box-card">
      <el-button :icon="Plus" type="primary" size="default" @click="">
        添加品牌
      </el-button>
      <el-table border>
        <el-table-column
          label="序号"
          type="index"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column label="品牌名称"></el-table-column>
        <el-table-column label="品牌LOGO"></el-table-column>
        <el-table-column label="品牌操作"></el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="limit"
        :page-sizes="[3,5,7,9]"
        :background="background"
        layout=" prev, pager, next, jumper, ->, sizes, total, "
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'

// 当前页码
const currentPage = ref<number>(1)
// 每页展示多少数据
let limit = ref<number>(3)

let background = ref(true)
</script>

<style lang="scss" scoped>
.box-card {
  .el-table {
    margin: 10px 0;
  }
}
</style>
