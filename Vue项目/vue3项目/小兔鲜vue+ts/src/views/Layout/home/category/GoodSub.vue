<template>
  <!-- 面包屑 -->
  <categoryBreadVue :categorygoods="categorygoods" />
  <!-- 过滤区 -->
  <Suspense>
    <template #default>
      <categorySubFilterVue />
    </template>
    <template #fallback>
      <div>
        <Globalskeleton class="item" width="1000px" height="40px" />
        <Globalskeleton class="item" width="1000px" height="40px" />
        <Globalskeleton class="item" width="1000px" height="40px" />
        <Globalskeleton class="item" width="1000px" height="40px" />
        <Globalskeleton class="item" width="1000px" height="40px" />
      </div>
    </template>
  </Suspense>
  <!-- 结果区域 -->
  <categorySubListVue />
</template>

<script setup lang="ts">
import categoryBreadVue from '@/components/home/category/category-bread.vue'
import useStore from '@/stores'
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import categorySubListVue from '@/components/home/category/category-sub-list.vue'

// 筛选区组件
const categorySubFilterVue = defineAsyncComponent(() => import('@/components/home/category/category-sub-filter.vue'))
const route = useRoute()
const { category } = useStore()

// 面包屑的信息
const categorygoods = computed(() => {
  let obj: any = {}
  category.categoryList.forEach((item) => {
    item.children &&
      item.children.forEach((sub) => {
        if (sub.id === route.params.id) {
          obj = { id: item.id, name: item.name }
          obj.sub = { id: sub.id, name: sub.name }
        }
      })
  })
  return obj
})
</script>

<style scoped lang="less">
.xtx-skeleton {
  padding: 10px 0;
}
</style>
