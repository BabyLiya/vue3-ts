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
              @click="editTrademark"
            ></el-button>
            <el-button
              :icon="Delete"
              type="danger"
              @click="deleteTrademark"
            ></el-button>
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
      title="添加品牌"
      width="60%"
    >
      <el-form label-width="100px" ref="formRef" :model="dataForm" :rules="rules">
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
            <img v-if="dataForm.logoUrl" :src="dataForm.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { Delete, Edit } from '@element-plus/icons-vue'
import { Plus } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'
import { reqTrademark, reqAddTrademark } from '@/api/product/trademark/index'
import type { Records, TrademarkResponse, Trademark } from '@/api/product/trademark/type'
import { ElNotification } from 'element-plus'
// 当前页码
const currentPage = ref<number>(1)
// 每页展示多少数据
let limit = ref<number>(3)

let total = ref<number>(0)

let background = ref(true)
let dialogVisible = ref(false)

let trademarkArr = reactive<Records>([])



const dataForm = reactive({
  tmName: '',
  logoUrl: '',
})

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

// 添加品牌
const addTrademark = () => {
  dialogVisible.value = true
}

// 修改品牌
const editTrademark = () => {
  dialogVisible.value = true
}

const rules = {
  tmName: [
    {
      required: true,
      message: '品牌名称不能为空',
      trigger: 'blur',
    },
  ],
  logoUrl: [
    {
      required: true,
      message: '品牌logo不能为空',
      trigger: 'blur',
    },
  ],
}
// 下拉菜单发生变化时触发
const handleSizeChange = (e: any) => {
  // 数据量发生变化，页码 -> 1
  getTrademarkData()
}

// 上传图片组件 -> 在上传图片之前触发， 上传之前可约束文件类型和大小
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // console.log(rawFile)
  if (rawFile.type === 'image/png' || rawFile.type === 'image/jpeg' || rawFile.type === 'image/gif') {
    return true
  } else {
    ElNotification({
    title: 'Error',
    message: '上传的文件类型应为png|jpeg|gif',
    type: 'error',
  })
  }
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response: any,
  uploadFile : any
) => {
  // response为当前上传图片post服务器返回的数据
  console.log(response,"@@@",uploadFile)
  dataForm.logoUrl = response.data
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
