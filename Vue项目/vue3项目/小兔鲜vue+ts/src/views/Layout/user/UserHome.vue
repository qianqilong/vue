<template>
  <div class="member-home" v-if="collect">
    <!-- 概述 -->
    <UseOverview />
    <!-- 收藏 -->
    <UserPannel title="我的收藏">
      <categoryItemVue v-for="item in collect.items" :key="item.id" :good="item" />
    </UserPannel>
    <!-- 我的足迹 -->
    <UserPannel title="我的足迹">
      <categoryItemVue v-for="item in collect.items" :key="item.id" :good="item" />
    </UserPannel>
    <!-- 才你喜欢 -->
    <Suspense>
      <template #default>
        <GoodRelevant />
      </template>
      <template #fallback> 加载中。。。。。。 </template>
    </Suspense>
  </div>
</template>
<script lang="ts" setup>
import UseOverview from '@/components/user/user-overview.vue'
import UserPannel from '@/components/user/user-panel.vue'
import categoryItemVue from '@/components/home/category/components/category-item.vue'
import { getCollectAPI } from '@/api'
const GoodRelevant = defineAsyncComponent(() => import('@/components/home/goodDetail/goods-relevant.vue'))

// 我的收藏
const collect = ref()
onMounted(async () => {
  const data: any = await getCollectAPI({ page: 1, pageSize: 4 })
  collect.value = data.result
})
</script>
<style scoped lang="less"></style>
