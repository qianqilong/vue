<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <homeCategoryVue />
        <!-- 轮播图 -->
        <HomeBanner />
        <!-- 异步组件-->
        <Suspense>
          <template #default>
            <div>
              <HomeNewVue />
              <HomeHotVue />
              <HomeBrand />
              <HomeProduct />
              <HomeSpecial />
            </div>
          </template>
          <template #fallback>
            <div>
              <HomeLoading />
              <HomeLoading />
              <HomeLoading />
            </div>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Home">
// 左侧分类
import homeCategoryVue from '@/components/home/home-category.vue'
// 轮播图模块
import HomeBanner from '@/components/home/home-banner.vue'
// 骨架屏模块
import HomeLoading from '@/components/home/components/home-loading.vue'
// 导入异步组件函数
import { defineAsyncComponent } from 'vue'

// 新鲜好物模块
const HomeNewVue = defineAsyncComponent(() => import('@/components/home/home-new.vue'))
// 人气推荐模块
const HomeHotVue = defineAsyncComponent(() => import('@/components/home/home-hot.vue'))
// 品牌模块
const HomeBrand = defineAsyncComponent(() => import('@/components/home/home-brand.vue'))
// 商品模块
const HomeProduct = defineAsyncComponent(() => import('@/components/home/home-product.vue'))
// 最新专题模块
const HomeSpecial = defineAsyncComponent(() => import('@/components/home/home-special.vue'))
</script>

<style scoped lang="less"></style>
