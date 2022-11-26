<template>
  <GlobalDialog title="添加收货地址" v-model:flag="flag">
    <div class="address-edit">
      <div class="xtx-form">
        <div class="xtx-form-item">
          <div class="label">收货人：</div>
          <div class="field">
            <input class="input" placeholder="请输入收货人" v-model="addrinfo.Consignee" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">手机号：</div>
          <div class="field">
            <input class="input" placeholder="请输入手机号" v-model="addrinfo.mobile" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地区：</div>
          <div class="field">
            <GlobalCity placeholder="请选择所在地区" :fullLocation="fullLocation" @changeCity="changeCity" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">详细地址：</div>
          <div class="field">
            <input class="input" placeholder="请输入详细地址" v-model="addrinfo.address" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <input class="input" placeholder="请输入邮政编码" v-model="addrinfo.postalCode" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <input class="input" placeholder="请输入地址标签，逗号分隔" v-model="addrinfo.addressLabel" />
          </div>
        </div>
      </div>
    </div>
    <template v-slot:footer>
      <GlobalButton type="gray" style="margin-right: 20px" @click="flag = false">取消</GlobalButton>
      <GlobalButton type="primary" @click="confirm">确认</GlobalButton>
    </template>
  </GlobalDialog>
</template>
<script lang="ts" setup>
import type { addrType } from '@/api/types'
type stringKey = Record<string, any>

const emit = defineEmits<{ (e: 'editAddress', addrinfo: addrType): void }>()
// 控制对话框的显示和隐藏
const flag = ref(false)
// 控制其显示
const show = () => {
  flag.value = true
}
// 控制其隐藏
const hide = () => {
  flag.value = false
}
// 默认地址
const fullLocation = ref('北京 北京市 东城区')
// 表单信息
const addrinfo: stringKey = reactive({
  provinceCode: '110000',
  cityCode: '110100',
  countyCode: '110101',
  Consignee: '', // 收货人
  mobile: '', // 电话
  Region: fullLocation.value, // 地区
  address: '', // 地址
  postalCode: '', //邮政编码
  addressLabel: '', //地址标签
})
// 切换地址
const changeCity = (city: any) => {
  fullLocation.value = city.fullLocation
  addrinfo.provinceCode = city.provinceCode
  addrinfo.cityCode = city.cityCode
  addrinfo.countyCode = city.countyCode
}
const instance = getCurrentInstance()
// 点击确认按键
const confirm = () => {
  for (let i in addrinfo) {
    if (addrinfo[i] == '') {
      instance?.proxy?.$Message({ type: 'error', text: `请填写${i}的信息` })
      return
    }
  }
  emit('editAddress', addrinfo as addrType)
  flag.value = false
  // 清理表单
  for (let i in addrinfo) {
    if (i !== 'provinceCode' && i !== 'cityCode' && i !== 'countyCode') {
      addrinfo[i] = ''
    }
  }
}

// 监听flag，关闭清理表单
watch(
  () => flag.value,
  () => {
    if (flag.value === false)
      for (let i in addrinfo) {
        if (i !== 'provinceCode' && i !== 'cityCode' && i !== 'countyCode') {
          addrinfo[i] = ''
        }
      }
  },
)

// 方便父组件调用
defineExpose({
  show,
  hide,
})
</script>
<style scoped lang="less">
.address-edit {
  .xtx-dialog {
    :deep(.wrapper) {
      width: 780px;
      .body {
        font-size: 14px;
      }
    }
  }
  .xtx-form {
    padding: 0;
    input {
      outline: none;
      &::placeholder {
        color: #ccc;
      }
    }
  }
  .xtx-city {
    width: 320px;
    :deep(.select) {
      height: 50px;
      line-height: 48px;
      display: flex;
      padding: 0 10px;
      justify-content: space-between;
      .placeholder {
        color: #ccc;
      }
      i {
        color: #ccc;
        font-size: 18px;
      }
      .value {
        font-size: 14px;
      }
    }
    :deep(.option) {
      top: 49px;
    }
  }
}
</style>
