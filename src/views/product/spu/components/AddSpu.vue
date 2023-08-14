<template>
  <div>
    <el-form
      :model="forms"
      ref="form"
      label-width="100px"
      :inline="false"
    >
      <el-form-item label="spu名称">
        <el-input
          v-model="forms.spuName"
          placeholder="请输入SPU名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="spu品牌">
        <el-select v-model="spuTrademark" placeholder="请选择品牌">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="spu描述">
        <el-input
          type="textarea"
          v-model="forms.spuName"
          placeholder="请输入描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="spu照片">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="spu销售属性">
        <el-select v-model="spuTrademark">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
        <el-button
          style="margin-left: 10px"
          type="primary"
          size="default"
          :icon="Plus"
        >
          添加销售属性
        </el-button>
        <el-table style="margin: 10px 0px" :data="tableData" border>
          <el-table-column
            label="序号"
            type="index"
            width="100"
            align="center"
          />
          <el-table-column label="属性名" prop="attrName"></el-table-column>
          <el-table-column
            label="属性值"
            prop="attrVal"
            width="800"
          ></el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="{ row, index }">
              <el-button
                type="danger"
                :icon="Delete"
                size="default"
                @click="handleDelete"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item >
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancle">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
const spuTrademark = ref("")
const forms = reactive({})
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
    disabled: true,
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

const tableData = [
  {
    attrName: 'qwq',
    attrVal: '12',
  },
]

const handleDelete = () => {}

let emit = defineEmits(['changeShow'])
// 单击子组件 触发父组件中的方法
const cancle = () => {
    emit('changeShow',0)
}
</script>

<style scoped>
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
