<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <categoryItem v-for="item in HotList" :key="item.id" :good="item" />
  </div>
</template>
<script lang="ts" setup>
import { getHotGoodsAPI } from '@/api'
import { computed, ref, type Ref } from 'vue'
import type { HotResult } from '@/api/types'
import categoryItem from '@/components/home/category/components/category-item.vue'
type stringKey = Record<string, any>

// 1代表24小时热销榜 2代表周热销榜 3代表总热销榜
const props = defineProps<{ type: number; goodsId: string }>()
// 热点图片列表
const HotList: Ref<Array<HotResult>> = ref(
  await getHotGoodsAPI({
    id: props.goodsId,
    type: props.type,
    limit: 3,
  }),
) as Ref<Array<HotResult>>
const titleObj: stringKey = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
const title = computed(() => {
  return titleObj[props.type]
})
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
