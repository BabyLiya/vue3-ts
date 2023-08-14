<template>
  <!-- 三级分类全局组件 -->
  <el-card class="box-card">
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          :disabled="show === 0 ? false : true"
          v-model="categoryStore.c1Id"
          placeholder="请选择"
          @change="handleChange1"
        >
          <el-option
            v-for="item in categoryStore.c1Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="show === 0 ? false : true"
          v-model="categoryStore.c2Id"
          placeholder="请选择"
          @change="handleChange2"
        >
          <el-option
            :disabled="show === 0 ? false : true"
            v-for="item in categoryStore.c2Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="categoryStore.c3Id"
          placeholder="请选择"
          :disabled="show === 0 ? false : true"
        >
          <el-option
            v-for="item in categoryStore.c3Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
import { reqOne, reqTwo, reqThree } from '@/api/product/attr'
import { onMounted, reactive, ref, onBeforeMount } from 'vue'
import type { Attr } from '@/api/product/attr/type'
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()

// 收集新增属性的数据
let attrParams = reactive<Attr>({
  attrName: "",
  attrValueList: [],
  categoryId: "", // 三级分类的id
  categoryLevel: 3, // 三级分类

})

let c1Id = ref('')

defineProps(['show'])

// 获取一级分类数据
const getC1 = () => {
  categoryStore.getOne()
}

const handleChange1 = () => {
  // 将二级三级分类数据清除
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []
  // 获取二级分类数据
  categoryStore.getTwo()
}
const handleChange2 = () => {
  categoryStore.c3Id = ''
  categoryStore.getThree()
}

// 尽量避免在生命周期中使用await / async
onMounted(() => {
  getC1()
})
</script>

<style lang="scss" scoped></style>
