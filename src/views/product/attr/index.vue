<template>
  <div>
    <Category></Category>
    <el-card
      style="margin-top: 10px"
      shadow="always"
      :body-style="{ padding: '20px' }"
    >
      <template #header>
        <div>
          <el-button type="primary" :icon="Plus">添加平台属性</el-button>
        </div>
      </template>

      <el-table border :data="tableData" stripe style="width: 100%">
        <el-table-column label="序号" type="index" width="100" align="center" />
        <el-table-column prop="attrName" label="属性名称" align="center" />
        <el-table-column prop="attrValName" label="属性值名称" align="center" />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              size="small"
              type="warning"
              :icon="Edit"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
            <el-button
              size="small"
              type="danger"
              :icon="Delete"
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { reactive } from 'vue'
const tableData = reactive([
  {
    attrName: '1112',
    attrValName: '22222',
  },
  {
    attrName: '1112',
    attrValName: '22222',
  },
  {
    attrName: '1112',
    attrValName: '22222',
  },
])
</script>

<style lang="scss" scoped></style>
