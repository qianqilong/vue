<template>
  <div class="xtx-goods-page" v-if="goodDetailList">
    <div class="container">
      <!-- 面包屑 -->
      <CategoryBreadVue :categorygoods="categorygoods" />
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <!-- 商品图片 -->
          <goodImageVue :images="images" />
          <!-- 商品基本信息 -->
          <GoodsSales />
        </div>
        <div class="spec">
          <!-- 商品详细信息 -->
          <GoodsName :goodDetailList="goodDetailList" />
          <!-- 商品的sku信息 -->
          <GoodsSku
            :goods="{ skus: goodDetailList.skus, specs: goodDetailList.specs }"
            :sku-id="''"
            @changeSku="changeSku" />
          <GlobalNumbox v-model="number" />
          <GlobalButton type="primary" style="margin-top: 20px" @click="addCart">加入购物车</GlobalButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <Suspense>
        <template #default>
          <GoodsRelevant :goodsId="goodDetailList.id" />
        </template>
      </Suspense>

      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <Suspense>
            <template #default>
              <GoodsTabs />
            </template>
          </Suspense>

          <!-- 注意事项 -->
          <goodsWarnVue />
        </div>
        <!-- 24热榜+专题推荐 -->
        <Suspense v-if="goodDetailList.id">
          <template #default>
            <div class="goods-aside">
              <GoodsHot :goodsId="goodDetailList.id" :type="1" />
              <GoodsHot :goodsId="goodDetailList.id" :type="2" />
            </div>
          </template>
          <template #fallback> 加载 </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CategoryBreadVue from '@/components/home/category/category-bread.vue'
import { nextTick, provide, ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { getGoodsDetailAPI } from '@/api'
import goodImageVue from '@/components/home/goodDetail/goods-image.vue'
import type { goodDetailResult, Skus } from '@/api/types'
import GoodsSales from '@/components/home/goodDetail/goods-sales.vue'
import GoodsName from '@/components/home/goodDetail/goods-name.vue'
import GoodsSku from '@/components/home/goodDetail/goods-sku.vue'
import GoodsTabs from '@/components/home/goodDetail/goods-tabs.vue'
import { defineAsyncComponent } from 'vue'
import goodsWarnVue from '@/components/home/goodDetail/goods-warn.vue'
import useStore from '@/stores'

const GoodsRelevant = defineAsyncComponent(() => import('@/components/home/goodDetail/goods-relevant.vue'))
const GoodsHot = defineAsyncComponent(() => import('@/components/home/goodDetail/goot-hot.vue'))

interface subType {
  id: string
  name: string
  sub?: {
    id: string
    name: string
    Detail?: {
      id: string
      name: string
    }
  }
}

const route = useRoute()
// 全部的信息
let goodDetailList: Ref<goodDetailResult> = ref({}) as Ref<goodDetailResult>
// 面包屑信息
let categorygoods = ref({}) as Ref<subType>
// 图片信息
let images: Ref<Array<string>> = ref([])
// 监听路由获取商品信息
watch(
  () => route.params.id,
  async () => {
    nextTick(async () => {
      if (route.path.includes('product')) {
        goodDetailList.value = (await getGoodsDetailAPI(route.params.id as string)) as goodDetailResult
        //    面包屑
        categorygoods.value = {
          id: goodDetailList.value.id,
          name: goodDetailList.value.name,
          sub: {
            id: goodDetailList.value.categories[0].id,
            name: goodDetailList.value.categories[0].name,
            Detail: {
              id: goodDetailList.value.categories[1].id,
              name: goodDetailList.value.categories[1].name,
            },
          },
        }
        // 图片
        images.value = goodDetailList.value.mainPictures
      }
    })
  },
  { immediate: true },
)
// 用户选择的商品信息
const Selectgood = ref()
// 用户选择的商品信息函数
const changeSku = (sku: Skus | undefined) => {
  if (sku && sku.id) {
    goodDetailList.value.price = sku.price
    goodDetailList.value.oldPrice = sku.oldPrice
    goodDetailList.value.inventory = sku.inventory
    Selectgood.value = sku
    Selectgood.value.specsText = sku.specs.reduce((pre, item) => pre + item.name + ':' + item.valueName, '')
  }
}

provide('goodDetailList', goodDetailList)

// 加入购物车的模块
const instance = getCurrentInstance()
const { cart } = useStore()
// 用户旋选择的商品数量
const number = ref(1)
// 选择商品的逻辑
const addCart = () => {
  // 判断是否选择了商品
  if (!Selectgood.value) {
    instance?.proxy?.$Message({ type: 'warn', text: '请选择商品' })
    return
  }
  // 判断库存
  if (number.value > goodDetailList.value.inventory) {
    instance?.proxy?.$Message({ type: 'warn', text: '库存不足' })
    return
  }
  // 加入购物车
  cart.addCartList({
    id: goodDetailList.value.id,
    skuId: Selectgood.value.id,
    name: goodDetailList.value.name,
    picture: goodDetailList.value.mainPictures[0],
    price: Selectgood.value.price,
    nowPrice: Selectgood.value.price,
    count: number.value,
    attrsText: Selectgood.value.specsText,
    selected: true,
    isEffective: true,
    stock: Selectgood.value.inventory,
  })
  instance?.proxy?.$Message({ type: 'success', text: '加入购物车成功' })
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
