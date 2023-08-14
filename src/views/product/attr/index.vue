<template>
  <div>
    <Category :show="show"></Category>
    <el-card
      style="margin-top: 10px"
      shadow="always"
      :body-style="{ padding: '20px' }"
    >
      <template #header>
        <div>
          <el-button
            type="primary"
            :disabled="categoryStore.c3Id ? false : true"
            :icon="Plus"
            @click="addAttr"
          >
            添加平台属性
          </el-button>
        </div>
      </template>

      <div v-show="show === 0">
        <el-table border :data="attrArr" stripe style="width: 100%">
          <el-table-column label="序号" type="index" width="100" />
          <el-table-column prop="attrName" label="属性名称" />
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-tag
                style="margin: 5px"
                v-for="item in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template #default="{ row, $index }">
              <el-button
                size="small"
                type="warning"
                :icon="Edit"
                @click="handleEdit(row)"
              ></el-button>
              <el-popconfirm
                :title="`你确定要删除${row.attrName}吗?`"
                @confirm="handleDelete(row.id)"
              >
                <template #reference>
                  <el-button
                    size="small"
                    type="danger"
                    :icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="show === 1">
        <el-form :inline="true">
          <el-form-item label="属性名称" label-width="80px">
            <el-input
              v-model="attrParams.attrName"
              placeholder="请输入属性名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="default"
          @click="addAttrVal"
          :icon="Plus"
          :disabled="attrParams.attrName ? false : true"
        >
          添加属性值
        </el-button>
        <el-button @click="cancle">取消</el-button>
        <el-table
          style="margin: 15px 0px"
          :data="attrParams.attrValueList"
          border
          stripe
        >
          <el-table-column
            type="index"
            width="80"
            label="序号"
            align="center"
          />
          <el-table-column prop="name" label="属性值名称">
            <template #="{ row, $index }">
              <el-input
                v-if="row.flag"
                placeholder="请输入属性值名称"
                v-model="row.valueName"
                @blur="toLook(row, $index)"
                :ref="(vc: any) => (inputArr[$index] = vc)"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作" align="center">
            <template #="{ row, index }">
              <el-button
                type="danger"
                size="default"
                icon="Delete"
                @click="() => attrParams.attrValueList.splice(index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="default"
          @click="save"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
        >
          保存
        </el-button>
        <el-button @click="cancle">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { reactive, watch, ref, nextTick, onBeforeMount } from 'vue'
import { reqList, saveList, reqDelete } from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
const categoryStore = useCategoryStore()

let flag = ref<boolean>(true)

// 存储已有的属性和属性值
let attrArr = ref<Attr[]>([])

// 收集新增属性的数据
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3, // 三级分类
})
// card组件内容变换
let show = ref(0)

const tableData = reactive([])

// 准备一个数组存储el-input
let inputArr = ref<any>([])
// 监听三级分类id的变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 清除原有数据
    attrArr.value = []
    if (!categoryStore.c3Id) return
    getAttr()
  },
)

// 获取数据
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  let res: AttrResponseData = await reqList(c1Id, c2Id, c3Id)
  if (res.code === 200) {
    attrArr.value = res.data
  }
}

const addAttr = () => {
  // 点击清空数据
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3, // 三级分类
  })
  if (attrParams.id) {
    attrParams.id = 0
  }
  
  show.value = 1
  getAttr()
}

const handleEdit = (row: Attr) => {
  console.log(row)
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  show.value = 1
}

const handleDelete = async (id: number) => {
  let res: any = await reqDelete(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  }
  getAttr()
}

const cancle = () => {
  show.value = 0
}

// 添加属性值
const addAttrVal = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, // 控制每个table-column的编辑和查看
  })
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
  // nextTick(() => {
  //   ipt.value.focus()
  // })
}

const handler = (element: any) => {
  console.log(element)
}

const toLook = (row: AttrValue, index: number) => {
  // 非法情况判断
  // 属性值不能为空
  if (row.valueName.trim() === '') {
    attrParams.attrValueList.splice(index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
  }
  // 属性值不能重复
  let repeat = attrParams.attrValueList.find((item) => {
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    attrParams.attrValueList.splice(index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
  }
  row.flag = false
}
const toEdit = (row: AttrValue, index: number) => {
  row.flag = true
  nextTick(() => {
    inputArr.value[index].focus()
  })
}

const save = async () => {
  let res: any = await saveList(attrParams)
  if (res.code === 200) {
    show.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    // 获取原有属性和属性值
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}

// 路由(组件销毁)切换时清空仓库中的数据
onBeforeMount(() => {
  // $reset方法 清空仓库中的数据
  categoryStore.$reset()
})
</script>

<style lang="scss" scoped></style>
