<template>
  <div class="goods-list">
    <!-- 排序 -->
    <CategorySubSortVue @sort="sort" />
    <!-- 列表 -->
    <ul>
      <li v-for="item in sublist" :key="item.id">
        <categoryItemVue :good="item" />
      </li>
    </ul>
    <!-- 检测触底 -->
    <Globalloading @infinite="point" :loading="loading" :finished="finished" />
  </div>
</template>

<script setup lang="ts">
import { getSubCategoryGoodsAPI } from '@/api'
import CategorySubSortVue from '@/components/home/category/category-sub-sort.vue'
import categoryItemVue from '@/components/home/category/components/category-item.vue'
import { reactive, ref, type Ref } from 'vue'
import type { subListResult, subListItem } from '@/api/types'

// 是在加载中
const loading = ref(false)
// 是否还有数据
const finished = ref(false)
// 存储数据列表
const sublist: Ref<subListItem[]> = ref([]) as Ref<subListItem[]>
// 分页查询详情
const limit = reactive({ page: 1, pageSize: 20 })
const point = async () => {
  // 让组件处于加载中
  loading.value = true
  const subgood = (await getSubCategoryGoodsAPI({
    page: limit.page,
    pageSize: limit.pageSize,
  })) as subListResult
  if (subgood.items.length) {
    sublist.value.push(...subgood.items)
    limit.page++
    loading.value = false
  }
}

// 触发排序
const sort = async (sortinfo: {
  sortField: string
  InStockFlag: boolean
  ExGratiaFlag: boolean
  sortMethod: string
}) => {
  const subgood = (await getSubCategoryGoodsAPI({
    sortField: sortinfo.sortField,
    sortMethod: sortinfo.sortMethod,
    inventory: sortinfo.InStockFlag,
    onlyDiscount: sortinfo.ExGratiaFlag,
    page: limit.page,
    pageSize: limit.pageSize,
  })) as subListResult
  sublist.value.unshift(...subgood.items)
}
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
