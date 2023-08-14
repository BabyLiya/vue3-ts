<template>
  <div>
    <Category :show="show"></Category>
    <el-card
      style="margin-top: 10px"
      shadow="always"
      :body-style="{ padding: '20px' }"
    >
      <div>
        <div v-show="show === 0">
          <el-button
            type="primary"
            @click="handleAddSpu"
            :icon="Plus"
            :disabled="categoryStore.c3Id ? false : true"
          >
            添加SPU
          </el-button>
          <el-table border :data="tableData" stripe style="width: 100%">
            <el-table-column
              label="序号"
              type="index"
              width="100"
              align="center"
            />
            <el-table-column prop="spuName" label="SPU名称" />
            <el-table-column
              prop="description"
              label="SPU描述"
              show-overflow-tooltip
            />
            <el-table-column label="操作" align="center">
              <template #default="{ row, index }">
                <el-button size="small" type="primary" :icon="Plus" @click="handleAddSku"/>
                <el-button
                  size="small"
                  type="warning"
                  :icon="Edit"
                  @click="handleEdit(row)"
                ></el-button>
                <el-button size="small" type="info" :icon="Compass"></el-button>
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="handleDelete(row.id)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="currentPage"
            :page-size="limit"
            :page-sizes="[3, 5, 7, 9]"
            background
            layout=" prev, pager, next, jumper, ->, sizes, total, "
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <!-- 添加SPU / 修改SPU -->
        <AddSpu v-show="show === 1" @changeShow="changeShow"></AddSpu>
        <!-- 添加SKU子组件 -->
        <AddSku v-show="show === 2"></AddSku>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { Plus, Edit, Delete, Compass } from '@element-plus/icons-vue'
import { reactive, ref, watch } from 'vue'
import { reqData } from '@/api/product/spu/index'
import type { SpuResponseData, Records } from '@/api/product/spu/type'
import useCategoryStore from '@/store/modules/category'
import AddSpu from './components/AddSpu.vue'
import AddSku from './components/AddSku.vue'
const categoryStore = useCategoryStore()

const show = ref<number>(0)
// 当前页码
const currentPage = ref<number>(1)
// 每页展示多少数据
let limit = ref<number>(3)

let total = ref<number>(0)

let records = ref<Records>([])

const tableData = ref<Records>([])

const handleCurrentChange = (v: any) => {
  currentPage.value = v
  getSpuData()
}

// 下拉菜单发生变化时触发
const handleSizeChange = (v: any) => {
  limit.value = v
  // 数据量发生变化，页码 -> 1
  getSpuData()
}

watch(
  () => categoryStore.c3Id,
  () => {
    // 确保有三级分类id
    if (!categoryStore.c3Id) return
    getSpuData()
  },
)

const getSpuData = async () => {
  let res: SpuResponseData = await reqData(
    currentPage.value,
    limit.value,
    categoryStore.c3Id,
  )
  if (res.code === 200) {
    tableData.value = res.data.records
    total.value = res.data.total
  }
}

// 添加Sku
const handleAddSpu = () => {
  show.value = 1
}
// 添加Sku
const handleAddSku = () => {
  
}

// 接受子组件传递的自定义事件，通知父组件切换show的值
const changeShow = (num: number) => {
  show.value = num
}
</script>

<style lang="scss" scoped>
.el-table {
  margin: 15px 0;
}
</style>
