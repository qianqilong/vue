<template>
  <div class="checkout-address">
    <div class="text" v-if="defaultAddr && defaultAddr.contact">
      <!-- <div class="none">您需要先添加收货地址才可提交订单。</div> -->
      <ul>
        <li>
          <span>收<i />货<i />人：</span>{{ defaultAddr.receiver }}
        </li>
        <li><span>联系方式：</span>{{ defaultAddr.contact.slice(0, 3) }}****{{ defaultAddr.contact.slice(7) }}</li>
        <li><span>收货地址：</span>{{ defaultAddr.fullLocation }}{{ defaultAddr.address }}</li>
      </ul>
      <a href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <GlobalButton class="btn" @click="checkAddr">切换地址</GlobalButton>
      <GlobalButton class="btn" @click="editAddr">添加地址</GlobalButton>
    </div>
  </div>
  <!-- 切换地址对话框 -->
  <PayAddressCheck ref="addrcheck" v-if="addr" :addr="addr" @checkAddress="checkAddress" :defaultId="defaultId" />
  <!-- 添加地址对话框 -->
  <PayAddressEdit ref="addredit" @editAddress="editAddress" @editAddr="editAddr" />
</template>
<script lang="ts" setup>
import PayAddressCheck from '@/components/pay/components/pay-address-check.vue'
import PayAddressEdit from '@/components/pay/components/pay-address-edit.vue'
import type { addrType, UserAddress, PayResult } from '@/api/types'
import { addAddressAPI } from '@/api'
import type { Ref } from 'vue'

const props = defineProps({
  addr: {
    type: Object,
    default: {} as PayResult,
  },
})

const emit = defineEmits(['editAddr', 'getAddrid'])
// 默认地址的信息的id
const defaultId = ref(props.addr.userAddresses.length !== 0 ? props.addr.userAddresses[0].id : '')

// 监听默认id的变化得出默认地址
const defaultAddr: Ref<UserAddress | undefined> = ref()
watch(
  () => defaultId.value,
  () => {
    const addr = props.addr.userAddresses.find((item: { id: string }) => item.id === defaultId.value)
    defaultAddr.value = addr ? addr : {}
    emit('getAddrid', defaultId.value)
  },
  { deep: true, immediate: true },
)
// 子组件选择改变id
const checkAddress = (id: string) => {
  defaultId.value = id
}
const addrcheck: any = ref(null)
const addredit: any = ref(null)
// 地址的信息
const formData = reactive({
  receiver: '',
  contact: '',
  provinceCode: '',
  cityCode: '',
  countyCode: '',
  address: '',
  postalCode: '',
  addressTags: '',
  isDefault: 0,
  fullLocation: '',
})

// 切换地址
const checkAddr = () => {
  // console.log(addrlist.value)

  addrcheck.value.show()
}
// 添加地址
const editAddr = () => {
  addredit.value.show()
}
// 添加地址的方法
const editAddress = async (addrinfo: addrType) => {
  formData.receiver = addrinfo.Consignee
  formData.contact = addrinfo.mobile
  formData.fullLocation = addrinfo.Region
  formData.address = addrinfo.address
  formData.postalCode = addrinfo.postalCode
  formData.addressTags = addrinfo.addressLabel
  formData.provinceCode = addrinfo.provinceCode
  formData.cityCode = addrinfo.cityCode
  formData.countyCode = addrinfo.countyCode
  await addAddressAPI(formData)
  emit('editAddr')
}
</script>
<style scoped lang="less">
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
