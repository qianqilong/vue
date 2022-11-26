<template>
  <div class="ref-goods" v-for="item in oneList" :key="item.id">
    <div class="head">
      <h3>- {{ item.name }} -</h3>
      <p class="tag">温暖柔软，品质之选</p>
      <Globalmove />
    </div>
    <div class="body">
      <CategoryItem v-for="sub in item.goods" :key="sub.id" :good="sub" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryItem from './components/category-item.vue'
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'
import { getTopCategoryAPI } from '@/api'
import type { cateResult } from '@/api/types'

const route = useRoute()
const oneList = ref(((await getTopCategoryAPI(+route.params.id)) as cateResult).children)

watch(
  () => route.params.id,
  async (newVal) => {
    if (!route.path.includes('category') || route.path.includes('sub')) return
    oneList.value = ((await getTopCategoryAPI(+newVal)) as cateResult).children
  },
)
</script>

<style scoped lang="less">
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    h3 {
      font-size: 28px;
      color: #666;
      font-weight: normal;
      text-align: center;
      line-height: 100px;
    }
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
