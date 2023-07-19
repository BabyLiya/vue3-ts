<template>
  <div>
    <el-card class="box-card">
      <el-button :icon="Plus" type="primary" size="default" @click="">
        添加品牌
      </el-button>
      <el-table border :data="trademarkArr">
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column label="品牌名称" prop="tmName" align="center">
          <template #="{ row, column, $index }">
            <pre>{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO" prop="logoUrl" align="center">
          <template #="{ row, column, $index }">
            <img
              :src="row.logoUrl"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center">
          <template #="{ row, column, $index }">
            <el-button :icon="Edit" type="primary" @click=""></el-button>
            <el-button :icon="Delete" type="danger" @click=""></el-button>
            
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="background"
        layout=" prev, pager, next, jumper, ->, sizes, total, "
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import {
  Delete,
  Edit,
} from '@element-plus/icons-vue'
import { Plus } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'
import { reqTrademark } from '@/api/product/trademark/index'

// 当前页码
const currentPage = ref<number>(1)
// 每页展示多少数据
let limit = ref<number>(3)

let total = ref(0)

let background = ref(true)

let trademarkArr = reactive<any>([])

const getTrademarkData = async () => {
  const res = await reqTrademark(currentPage.value, limit.value)
  // tableData = res.data.records
  console.log(res)
  if (res.code === 200) {
    total.value = res.data.total
    trademarkArr = res.data.records
    console.log(trademarkArr)
  }
}

const handleSizeChange = () => {}

const handleCurrentChange = () => {}

onMounted(() => {
  getTrademarkData()
})
</script>

<style lang="scss" scoped>
.box-card {
  .el-table {
    margin: 10px 0;
  }
}
</style>
