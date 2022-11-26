<template>
  <div class="cart-sku">
    <div class="attrs" @click="show">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="flag" @click="$event.stopPropagation()">
      <div class="loading" v-if="!goods"></div>
      <GoodsSku @changeSku="changeSku" v-if="goods" :skuId="skuId ? skuId : ''" :goods="goods" />
      <GlobalButton v-if="goods" type="primary" size="mini" style="margin-left: 60px" @click="submit"
        >确认</GlobalButton
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getSpecsAndSkusAPI } from '@/api'
import type { Ref } from 'vue'
import type { skuResult, Skus } from '@/api/types'
import GoodsSku from '@/components/home/goodDetail/goods-sku.vue'

const props = defineProps({
  attrsText: {
    type: String,
  },
  skuId: {
    type: String,
  },
})

const emit = defineEmits<{ (e: 'change', sku: Skus | undefined): void }>()
const goods: Ref<skuResult | undefined> = ref()
const flag = ref(false)
// 点击显示的方法
const show = async (event: Event) => {
  if (props.skuId) {
    // console.log(props.skuId)
    goods.value = (await getSpecsAndSkusAPI(props.skuId)) as skuResult
  }
  event.stopPropagation()
  flag.value = !flag.value
}
// 选择SKU时候触发
const currSku: Ref<Skus | undefined> = ref()
// 改变选择的方法
const changeSku = (sku: Skus | undefined) => {
  currSku.value = sku
}
// 点击确认的时候，提交sku信息给购物车组件
const submit = () => {
  // 给购物车组件数据的前提：有sku信息，sku信息完整，sku中的skuId不能现有props.skuId一样
  if (currSku.value && currSku.value.id && currSku.value.id !== props.skuId) {
    emit('change', currSku.value)
    flag.value = false
  }
}
// 点击外面关闭
window.addEventListener('click', () => {
  flag.value = false
})

// 点击外面关闭
onBeforeUnmount(() => {
  window.removeEventListener('click', () => {
    flag.value = false
  })
})
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: '';
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(@/assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
