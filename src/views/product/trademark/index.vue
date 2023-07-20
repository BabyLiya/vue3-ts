<template>
  <div>
    <el-card class="box-card">
      <el-button
        :icon="Plus"
        type="primary"
        size="default"
        @click="addTrademark"
      >
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
            <el-button
              :icon="Edit"
              type="primary"
              @click="($event) => editTrademark(row)"
            >
              修改
            </el-button>
            <el-popconfirm
              @confirm="deleteTrademark(row.id)"
              :title="`是否删除${row.tmName}?`"
            >
              <template #reference>
                <el-button :icon="Delete" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
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
        @current-change="getTrademarkData"
      />
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      :title="dataForm.id ? '修改品牌' : '添加品牌'"
      width="60%"
    >
      <el-form
        label-width="100px"
        ref="formRef"
        :model="dataForm"
        :rules="rules"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            v-model="dataForm.tmName"
            placeholder="请输入品牌名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <!-- action: 图片上传路径，需要带上/api 否则代理服务器不发送post请求 -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="dataForm.logoUrl"
              :src="dataForm.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancle">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { Delete, Edit } from '@element-plus/icons-vue'
import { Plus } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'
import {
  reqTrademark,
  reqAddTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark/index'
import type {
  Records,
  TrademarkResponse,
  Trademark,
} from '@/api/product/trademark/type'
import { ElMessage, ElMessageBox } from 'element-plus'
import { nextTick } from 'process'

// 当前页码
const currentPage = ref<number>(1)
// 每页展示多少数据
let limit = ref<number>(3)

let total = ref<number>(0)

let background = ref(true)
let dialogVisible = ref(false)

let trademarkArr = reactive<Records>([])
let formRef = ref()

const dataForm: Trademark = reactive({
  tmName: '',
  logoUrl: '',
})

// 获取数据
const getTrademarkData = async (pager = 1) => {
  currentPage.value = pager
  const res: TrademarkResponse = await reqTrademark(
    currentPage.value, // v-model 自更改
    limit.value,
  )
  if (res.code === 200) {
    total.value = res.data.total
    trademarkArr = res.data.records
  }
}

// 下拉菜单发生变化时触发
const handleSizeChange = (e: any) => {
  // 数据量发生变化，页码 -> 1
  getTrademarkData()
}

// 添加品牌
const addTrademark = () => {
  dataForm.tmName = ''
  dataForm.logoUrl = ''
  dataForm.id = 0
  // 清除校验 获取更新后的DOM 用nextTick钩子
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
  // nextTick(() => {
  //   formRef.value.clearValidate('tmName')
  //   formRef.value.clearValidate('logoUrl')
  // })
  dialogVisible.value = true
}

// 修改品牌
const editTrademark = async (row: Trademark) => {
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
  // ES6合并对象
  Object.assign(dataForm, row)
  // dataForm.id = row.id
  // dataForm.tmName = row.tmName
  // dataForm.logoUrl = row.logoUrl

  dialogVisible.value = true
}

// 删除品牌
const deleteTrademark = async (id: number) => {
  let res = await reqDeleteTrademark(id)
  console.log(res)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    // 重新获取数据
    getTrademarkData(
      trademarkArr.length > 1 ? currentPage.value : currentPage.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

// 取消
const cancle = () => {
  dialogVisible.value = false
}

// 确认
const confirm = async () => {
  // 在请求之前对表单进行校验
  await formRef.value.validate()
  let res: any = await reqAddTrademark(dataForm)
  console.log(res)
  if (res.code === 200) {
    ElMessage({
      message: dataForm.id ? '修改品牌成功' : '新增品牌成功',
      type: 'success',
    })
    // 再次请求数据
    getTrademarkData(dataForm.id ? currentPage.value : 1)
  } else {
    ElMessage({
      message: dataForm.id ? '修改品牌失败' : '新增品牌失败',
      type: 'error',
    })
  }
  dialogVisible.value = false
}

// 上传图片组件 -> 在上传图片之前触发， 上传之前可约束文件类型和大小
const beforeAvatarUpload: any['beforeUpload'] = (rawFile: any) => {
  // console.log(rawFile)
  if (
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/gif'
  ) {
    return true
  } else {
    ElMessage({
      title: 'Error',
      message: '上传的文件类型应为png|jpeg|gif',
      type: 'error',
    })
    return false
  }
}

const handleAvatarSuccess: any['onSuccess'] = (
  response: any,
  uploadFile: any,
) => {
  // response为当前上传图片post服务器返回的数据
  dataForm.logoUrl = response.data
  // 图片上传成功后清除图片校验结果
  formRef.value.clearValidate('logoUrl')
}

// 品牌自定义校验规则
const validatorTmName = (rule: any, value: any, callBack: any) => {
  // 自定义校验规则
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名称数大于等于两位'))
  }
}

const validatorlogoUrl = (rule: any, value: any, callBack: any) => {
  // 上传图片的value为图片地址
  if (value) {
    callBack()
  } else {
    callBack(new Error('LOGO图片必须上传'))
  }
}

const rules = {
  tmName: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorTmName,
    },
  ],
  logoUrl: [
    {
      required: true,
      trigger: 'change',
      validator: validatorlogoUrl,
    },
  ],
}

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
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
